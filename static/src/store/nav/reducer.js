/**
 * Created by Administrator on 2018/3/7.
 */
import Home from '../../view/home';
import Platform from '../../view/platform';
let defaultState = {
    list:[
        {
            title:'首页',
            path:'/home',
            component:Home
        },
        {
            title:'我的平台',
            iconCls:'icon-shu1',
            path:'/platform',
            component:Platform
        }
    ]
};

export let navData = (state = defaultState,action = {}) => {
    state = wt.clone(state);
    wt.execFunc(reducer[action.type],state,action);
    return state;
};

const reducer = {

};