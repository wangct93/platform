/**
 * Created by Administrator on 2018/4/23.
 */
import React from 'react';
import Component from '../lib/component';
import { connect} from 'react-redux';
import SideNav from '../component/sideNav';
import {HashRouter,NavLink,Route,Switch,withRouter,Redirect} from 'react-router-dom';

import CheckText from '../component/checkText';

class Platform extends Component{
    render(){
        let {sideNavData,match,navData} = this.props;
        return <div className="body-content platform-container">
            <HashRouter basename={match.url}>
                <React.Fragment>
                    <SideNav data={sideNavData}/>
                    <div className="flex-fit">
                        <div className="platform-header">
                            <div className="alarm-box">

                            </div>
                            <nav className="nav-list">
                                {
                                    navData.map(({path,text,iconCls},i) => {
                                        return <NavLink key={i} className={`btn-icon`} to={path}>
                                            <i className={`iconfont ${iconCls}`}/>
                                            <span>{text}</span>
                                        </NavLink>
                                    })
                                }
                            </nav>
                        </div>
                        <div className="flex-fit">
                            <Switch>
                                <Route path="/cly" component={ClyView}/>
                                <Route path="/shy" component={ShyView}/>
                                <Route path="/ypy" component={YpyView}/>
                                <Route path="/wdasj" component={WdasjView}/>
                                <Redirect to="/cly" />
                            </Switch>
                        </div>
                    </div>
                    <WdasjView/>
                </React.Fragment>
            </HashRouter>
        </div>
    }
}



class Box extends Component{
    constructor(){
        super();
        this.state = {
            searchData:[
                [
                    {
                        name:'关键词',
                        component:'input',
                        width:300
                    },
                    {
                        name:'词组关系',
                        component:CheckText,
                        data:[
                            {
                                text:'与'
                            },
                            {
                                text:'或'
                            }
                        ],
                        width:300
                    }
                ]
            ]
        }
    }
    render(){
        let {searchData} = this.state;
        return <div className="search-view-container">
            <div className="sv-header">
                <div className="sv-form">
                    {
                        searchData.map((item,i) => {
                            return <div key={i} className="svf-line">
                                    {
                                        item.map((item,i) => {
                                            let {component,name,width,cls = ''} = item;
                                            return <React.Fragment key={i}>
                                                {
                                                    name && <div className="sv-name">{name}：</div>
                                                }
                                                <div className={`sv-value ${cls}`} style={{
                                                    width:width.toString().toCssValue()
                                                }}>
                                                    {
                                                        React.createElement(component,item)
                                                    }
                                                </div>
                                            </React.Fragment>
                                        })
                                    }
                            </div>
                        })
                    }
                </div>
                <div className="sv-btn-box">
                    <a className="w-btn">
                        <i className="iconfont icon-search"/>
                    </a>
                </div>
            </div>
        </div>
    }
}



class ClyView extends Component{
    render(){
        return <div className="fit">
            <Box />
        </div>
    }
}
class ShyView extends Component{
    render(){
        return <div>
s
        </div>
    }
}
class YpyView extends Component{
    render(){
        return <div>
y

        </div>
    }
}
class WdasjView extends Component{
    render(){
        return <div>
wd
        </div>
    }
}


export default connect(state => state.platformData)(Platform);