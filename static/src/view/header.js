/**
 * Created by Administrator on 2018/3/27.
 */
import React from 'react';
import {render} from 'react-dom';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const Header = ({match,list}) => {
    return <div className="header">
        <nav className="nav-box">
            {
                list.map(({path,title,iconCls},i) => {
                    return <NavLink key={i} to={path}>
                            {
                                iconCls && <i className={`iconfont ${iconCls}`}/>
                            }
                            <span>{title}</span>
                    </NavLink>
                })
            }
        </nav>
    </div>
};

export default connect(state => state.navData)(withRouter(Header));