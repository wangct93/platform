/**
 * Created by Administrator on 2018/3/7.
 */
let defaultState = {
    list:[
        {
            title:'首页',
            path:'/home'
        },
        {
            title:'我的平台',
            iconCls:'icon-shu1',
            path:'/platform'
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