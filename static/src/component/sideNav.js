/**
 * Created by Administrator on 2018/4/24.
 */
import React,{Component} from 'react';

import {NavLink,withRouter} from 'react-router-dom';

export default class SideNavBox extends Component{
    render(){
        let {click,headClick,props} = this;
        let {data} = props;
        let {activeList = [],isCollapsed} = this.state || {};
        return <div className={`side-nav-box ${isCollapsed ? 'side-nav-box-collapsed' : ''}`}>
            <div className="side-nav-header" onClick={headClick.bind(this)}>
                <i className="iconfont icon-liebiao3"/>
            </div>
            <div className="side-nav-body" ref="body">
                <ul className="nav-list" ref="list">
                    {
                        data.map((item,i) => {
                            return <SideNavItem active={activeList.indexOf(i) !== -1} click={click.bind(this,i)} key={i} data={item}/>
                        })
                    }
                </ul>
            </div>
        </div>
    }
    click(index){
        let {activeList = []} = this.state || {};
        activeList = wt.clone(activeList);
        if(activeList.indexOf(index) === -1){
            // activeList.push(index);
            activeList = [index];
        }else{
            activeList = [];
        }
        this.setState({
            activeList
        });
    }
    headClick(){
        let {isCollapsed} = this.state || {};
        this.setState({
            isCollapsed:!isCollapsed
        });
    }
}

const SideNavItem = ({data = {},click,active}) => {
    let {text = '',children = [],iconCls,path = '/'} = data;
    let hasChild = children.length;
    let Header = hasChild ? 'div' : NavLink;
    return <li className={`${active ? 'active' : ''}`}>
        <Header to={path} className={`nav-header ${hasChild ? 'nav-header-parent' : 'nav-header-child'}`} onClick={click}>
            <i className={iconCls ? `iconfont ${iconCls}` : 'triangle'}/>
            <span>{text}</span>
        </Header>
        {
            hasChild ? <SideNavPanel active={active} data={children}/> : ''
        }
    </li>
};

const Item = withRouter(({data = {},match}) => {
    let {text = '',iconCls,path = '/'} = data;
    return <li>
        <NavLink to={match.url + path} className={`nav-header nav-header-child`}>
            <i className={`iconfont ${iconCls}`}/>
            <span>{text}</span>
        </NavLink>
    </li>
});

class SideNavPanel extends Component{
    render(){
        let {data,active} = this.props;
        let {maxHeight = 0} = this;
        return <div className="nav-content" style={{
            height:active ? maxHeight : 0
        }}>
            <ul className="nav-list" ref="list">
                {
                    data.map((item,i) => {
                        return <Item key={i} data={item}/>
                    })
                }
            </ul>
        </div>
    }
    componentDidMount(){
        this.maxHeight = this.refs.list.offsetHeight;
    }
}
