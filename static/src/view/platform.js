/**
 * Created by Administrator on 2018/4/23.
 */
import React from 'react';
import Component from '../lib/component';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';


import Animate from '../component/animate';

class Platform extends Component{
    render(){
        return <div className="body-content platform-container">
            <SideNavBox data={this.props.sideNavData}/>
        </div>
    }
}

class Test extends Component{
    render(){
        return <div>

        </div>
    }
}

class SideNavBox extends Component{
    render(){
        let {click,maxHeight} = this;
        let {data} = this.props;
        let {index,oldIndex} = this.state || {};
        return <div className="side-nav-box">
            <div className="side-nav-header">
                <i className="iconfont iconfont-menu"/>
            </div>
            <div className="side-nav-body" ref="body">
                <ul className="nav-list" ref="list">
                    {
                        data.map((item,i) => {
                            let height = i === index ? [0,maxHeight] : i === oldIndex ? [maxHeight,0] : [0,0];
                            return <SideNavItem height={height} click={click.bind(this,i)} key={i} data={item}/>
                        })
                    }
                </ul>
            </div>
        </div>
    }
    click(nowIndex){
        let {index} = this.state || {};
        if(nowIndex === index){
            nowIndex = undefined;
        }
        this.setState({
            index:nowIndex,
            oldIndex:index
        });
    }
    componentDidMount(){
        let {body,list} = this.refs;
        this.maxHeight = body.offsetHeight - list.offsetHeight;
    }
}

class SideNavItem extends Component{
    render(){
        let {data = {},click,height = [0,0]} = this.props;
        let {text = '',children = [],iconCls} = data;
        return <li>
            <div className="nav-header" onClick={click}>
                <i className={iconCls ? `iconfont ${iconCls}` : 'triangle'}/>
                <span>{text}</span>
            </div>
            {
                children.length ? <Animate data={children} Component={SideNavPanel} option={{
                    height
                }}/> : ''
            }
        </li>
    }
}
const SideNavPanel = ({data,option}) => {
    console.log(option);
    let {height} = option || {};
    return <div className="nav-content" style={{
        height:height + 'px'
    }}>
        <ul className="nav-list">
            {
                data.map((item,i) => {
                    return <SideNavItem key={i} data={item}/>
                })
            }
        </ul>
    </div>
};


export default connect(state => state.platformData)(Platform);