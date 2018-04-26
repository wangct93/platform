/**
 * Created by Administrator on 2018/4/23.
 */
import React from 'react';
import Component from '../lib/component';
import { connect} from 'react-redux';
import {NavLink,HashRouter} from 'react-router-dom';

import SideNav from '../component/sideNav';
import RouterSwitch from '../component/routerSwitch';


class Platform extends Component{
    render(){
        let {sideNavData,match,navData} = this.props;
        let routerData = navData.concat(sideNavData.reduce((prev,next) => prev.concat(next.children),[]));
        return <div className="body-content platform-container">
            <SideNav data={sideNavData}/>
            <div className="flex-fit">
                <div className="platform-header">
                    <div className="alarm-box">

                    </div>
                    <nav className="nav-list">
                        {
                            navData.map(({path,text,iconCls},i) => {
                                return <NavLink key={i} className={`btn-icon`} to={match.url + path}>
                                    <i className={`iconfont ${iconCls}`}/>
                                    <span>{text}</span>
                                </NavLink>
                            })
                        }
                    </nav>
                </div>
                <div className="flex-fit">
                    <RouterSwitch basename={match.url} data={routerData}/>
                </div>
            </div>
        </div>
    }
}

export default connect(state => state.platformData)(Platform);