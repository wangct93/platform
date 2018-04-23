/**
 * Created by Administrator on 2018/3/7.
 */
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';

import Router from './router/router';
import DialogList from './view/dialogList';

const Container = props => {
    return <React.Fragment>
        <Router/>
        <DialogList/>
    </React.Fragment>
};

render(<Provider store={store}>
    <Container/>
</Provider>,$('#container')[0]);