/**
 * Created by Administrator on 2018/3/27.
 */
import React from 'react';
import {Provider,connect} from 'react-redux';
import {HashRouter} from 'react-router-dom';


import RouterSwitch from '../component/routerSwitch';
import Header from '../view/header';


export default connect(state => state.navData)(({list}) => {
    return <HashRouter>
        <React.Fragment>
            <Header data={list}/>
            <div className="body">
                <RouterSwitch data={list}/>
            </div>
        </React.Fragment>
    </HashRouter>
})