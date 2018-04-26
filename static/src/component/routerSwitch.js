/**
 * Created by Administrator on 2018/4/25.
 */
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';

export default ({data = [],basename = ''}) => {
    let redirectItem = data[0];
    return <Switch>
        {
            data.map(({path,component,exact},i) => {
                // return <Route exact={exact} key={i} path={basename + path} component={props => {
                //     return component ? React.createElement(component,wt.extend({
                //         data,
                //         params
                //     },props)) : ''
                // }} />
                return <Route exact={exact} key={i} path={basename + path} component={component} />
            })
        }
        {
            redirectItem ? <Redirect to={{
                pathname:basename + redirectItem.path,
                query:redirectItem.query
            }}/> : ''
        }
    </Switch>
}