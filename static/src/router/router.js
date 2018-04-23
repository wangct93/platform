/**
 * Created by Administrator on 2018/3/27.
 */
import React from 'react';
import Component from '../lib/component';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';

import {HashRouter,Switch,Route,Link,withRouter,Redirect} from 'react-router-dom';

import Header from '../view/header';
import Home from '../view/home';
import Platform from '../view/platform';
import Blog from '../view/blog';
import Works from '../view/works';
export default class Router extends Component{
    render(){
        return <HashRouter>
            <React.Fragment>
                <Header />
                <div className="body">
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/platform" component={Platform}/>
                        <Redirect to="/home"/>
                    </Switch>
                </div>
            </React.Fragment>
        </HashRouter>
    }
}