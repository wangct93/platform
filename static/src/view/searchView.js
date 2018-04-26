/**
 * Created by Administrator on 2018/4/25.
 */
import React from 'react';
import Component from '../lib/component';
import {Provider,connect} from 'react-redux';
import View from '../component/searchView';

export const ClyView = connect(state => state.searchViewData.cly)(View);