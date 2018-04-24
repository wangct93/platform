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
                    iconCls:'icon-shu1',
                    text:'我的案事件',
                    path:'/wdasj'
                },
                {
                    iconCls:'icon-shu1',
                    text:'案事件列表',
                    path:'/asjlb'
                },
                {
                    iconCls:'icon-shu1',
                    text:'新建案事件',
                    path:'/xjasj'
                },
                {
                    iconCls:'icon-shu1',
                    text:'案事件回收站',
                    path:'/wdhsz'
                }
            ]
        },
        {
            text:'串并案库',
            children:[
                {
                    iconCls:'icon-shu1',
                    text:'我的串并案',
                    path:'/wdcba'
                },
                {
                    iconCls:'icon-shu1',
                    text:'串并案列表',
                    path:'/cbalb'
                },
                {
                    iconCls:'icon-shu1',
                    text:'其他技术串并案',
                    path:'/qtjscba'
                }
            ]
        }
    ],
    navData:[
        {
            text:'采录员',
            iconCls:'icon-shu1',
            path:'/cly'
        },
        {
            text:'审核员',
            iconCls:'icon-shu1',
            path:'/shy'
        },
        {
            text:'研判员',
            iconCls:'icon-shu1',
            path:'/ypy'
        }
    ]
};

export let platformData = (state = defaultState,action = {}) => {
    wt.execFunc(reducer[action.type],state,action);
    return wt.extend(true,{},state);
};

let reducer = {

};