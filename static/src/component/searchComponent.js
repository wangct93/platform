/**
 * Created by Administrator on 2018/4/25.
 */
import React from 'react';
import Component from '../lib/component';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';

import Combobox from './combobox';

export default class SearchComponent extends Component{
    render(){
        let {data} = this.props;
        let {name = '',cls = '',component = 'input'} = data;
        return <div className={`search-item-box ${cls}`}>
            {
                name && <div className="si-name">{name}：</div>
            }
            <div className="si-value">
                {
                    React.createElement(component,data)
                }
            </div>
        </div>
    }
}



/**
 * 文字选择组件
 */
export class CheckText extends Component{
    render(){
        let {data} = this.props;
        let {activeIndexList = []} = this.state || {};
        return <ul className="check-text-list">
            {
                data.map(({text},i) => {
                    return <li key={i} className={activeIndexList.indexOf(i) === -1 ? '' : 'active'} onClick={this.click.bind(this,i)}>{text}</li>
                })
            }
        </ul>
    }
    click(index){
        let {multiple,required = true,onSelect,data} = this.props;
        let {activeIndexList = []} = this.state || {};
        activeIndexList = wt.clone(activeIndexList);
        let itemIndex = activeIndexList.indexOf(index);
        if(itemIndex === -1){
            if(multiple){
                activeIndexList.push(index);
            }else{
                activeIndexList = [index];
            }
            wt.execFunc(onSelect,data[index],index);
        }else{
            if(activeIndexList.length !== 1 || !required){
                activeIndexList.splice(itemIndex,1);
            }else{
                wt.execFunc(onSelect,data[index],index);
            }
        }
        this.setState({
            activeIndexList
        });
    }
    componentDidMount(){
        let {data,multiple,required = true} = this.props;
        let activeIndexList = data.map((item,i) => item.selected && i).filter(item => typeof item === 'number');
        if(!multiple){
            activeIndexList = activeIndexList.slice(-1);
        }
        if(required && activeIndexList.length === 0){
            activeIndexList = [0];
        }
        activeIndexList.forEach(item => {
            this.click(item);
        });
    }
    getData(){
        let {activeIndexList = []} = this.state || {};
        let {data} = this.props;
        return activeIndexList.map(item => {
            return data[item];
        });
    }
}

/**
 * 时间组件（用easyui组件生成，还不属于react单独组件）
 */
export class Datetimebox extends Component{
    render(){
        return <input type="text" ref="input"/>
    }
    componentDidMount(){
        let {input} = this.refs;
        let {option = {}} = this.props;
        $(input).datetimebox(wt.extend({
            width:140,
            height:26
        },option));
    }
    componentDidUpdate(){
        let {input} = this.refs;
        let {value} = this.props;
        if(value){
            $(input).datetimebox('setValue',value);
        }
    }
    getData(){
        let {input} = this.refs;
        return $(input).datetimebox('getValue');
    }
}
/**
 * 关联下拉框（两个下拉框）
 */
export class LinkCombobox extends Component{
    render(){
        let {width} = this.props;
        let {parentData = [],childData = []} = this.state;
        return <div className="combobox-link" style={{
            width
        }}>
            <Combobox ref="parent" data={parentData} width="140" height="26" onSelect={this.parentSelect.bind(this)}/>
            <Combobox data={childData} width="140" panelWidth="300" height="26" textField="name" />
        </div>
    }
    componentWillMount(){
        let {data} = this.props;
        let parentData = data.map((item,i) => ({
            text:item.name,
            value:i,
            selected:item.selected
        }));
        this.setState({
            parentData
        });
    }
    parentSelect(item,index){
        let {data} = this.props;
        let childData = data[item.value].children || [];
        this.setState({
            childData
        });
    }
}

/**
 * 时间段组件（附带可选时间段）
 */
export class DiffDateTime extends Component{
    constructor(){
        super();
        this.state = {
            checkTextData:[
                {
                    value:'d_7',
                    text:'近一周'
                },
                {
                    value:'d_15',
                    text:'近半月'
                },
                {
                    value:'m_1',
                    text:'近一月'
                },
                {
                    value:'m_3',
                    text:'近三月'
                },
                {
                    value:'m_6',
                    text:'近半年'
                },
                {
                    value:'y_1',
                    text:'近一年'
                }
            ]
        }
    }
    render(){
        let {checkTextData,stime,etime} = this.state;
        return <div className="diffdatetime-box">
            <Datetimebox ref="startTime" value={stime}/>
            <div className="sep-text">--</div>
            <Datetimebox ref="endTime" value={etime}/>
            <CheckText data={checkTextData} onSelect={this.diffTime.bind(this)}/>
        </div>
    }
    diffTime({value},i){
        let temp = value.split('_');
        let type = temp[0];
        let num = -temp[1];
        let now = new Date();
        let etime = now.toFormatString();
        let config = {
            d:'diffDays',
            m:'diffMonths',
            y:'diffYears'
        };
        let stime = now[config[type]](num).toFormatString();
        this.setState({
            stime,
            etime
        })
    }
    getData(){

    }
}