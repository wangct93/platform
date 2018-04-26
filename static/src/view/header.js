/**
 * Created by Administrator on 2018/3/27.
 */
import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

export default ({data}) => {
    return <div className="header">
        <nav className="nav-box">
            {
                data.map(({path,title,iconCls},i) => {
                    return <NavLink className={`${iconCls ? 'btn-icon' : ''}`} key={i} to={path}>
                        <i className={`iconfont ${iconCls}`}/>
                        <span>{title}</span>
                    </NavLink>
                })
            }
        </nav>
    </div>
};