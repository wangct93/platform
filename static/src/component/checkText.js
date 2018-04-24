/**
 * Created by Administrator on 2018/4/24.
 */
import React from 'react';
import Component from '../lib/component';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';


export default class CheckText extends Component{
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
        let {multiple,required} = this.props;
        let {activeIndexList = []} = this.state || {};
        activeIndexList = wt.clone(activeIndexList);
        let itemIndex = activeIndexList.indexOf(index);
        if(itemIndex === -1){
            if(multiple){
                activeIndexList.push(index);
            }else{
                activeIndexList = [index];
            }
        }else{
            if(activeIndexList.length !== 1 || !required){
                activeIndexList.splice(itemIndex,1);
            }
        }
        this.setState({
            activeIndexList
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