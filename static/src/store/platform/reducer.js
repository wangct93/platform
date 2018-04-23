/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    sideNavData:[
        {
            text:'案事件库',
            children:[
                {
                    iconCls:'sd',
                    text:'我的案事件'
                },
                {
                    iconCls:'sd',
                    text:'案事件列表'
                },
                {
                    iconCls:'sd',
                    text:'新建案事件'
                },
                {
                    iconCls:'sd',
                    text:'案事件回收站'
                }
            ]
        },
        {
            text:'串并案库',
            children:[
                {
                    iconCls:'sd',
                    text:'我的串并案'
                },
                {
                    iconCls:'sd',
                    text:'串并案列表'
                },
                {
                    iconCls:'sd',
                    text:'其他技术串并案'
                }
            ]
        }
    ]
};

export let platformData = (state = defaultState,action = {}) => {
    wt.execFunc(reducer[action.type],state,action);
    return wt.extend(true,{},state);
};

let reducer = {

};