/**
 * Created by Administrator on 2018/3/7.
 */
import {dispatch} from '../store';
let defaultState = {
    data:[],
    menuList:[
        {
            iconCls:'menu-ajgl',
            text:'案件管理'
        },
        {
            iconCls:'menu-cbgl',
            text:'串并管理'
        },
        {
            iconCls:'menu-ajxc',
            text:'案件协查'
        },
        {
            iconCls:'menu-shgl',
            text:'审核管理'
        },
        {
            iconCls:'menu-jxkh',
            text:'绩效考核'
        },
        {
            iconCls:'menu-rxbz',
            text:'人像比中'
        },
        {
            iconCls:'menu-mbxyrk',
            text:'目标嫌疑库'
        },
        {
            iconCls:'menu-wdsc',
            text:'我的收藏'
        }
    ],
    noticeList:[
        {
            id:1,
            content: '测试1',
            time: "2017-03-11 10:36:15"
        },
        {
            id:2,
            content: '测试2',
            time: "2017-03-11 10:36:15"
        },
        {
            id:3,
            content: '测试3',
            time: "2017-03-11 10:36:15"
        },
        {
            id:4,
            content: '测试4',
            time: "2017-03-11 10:36:15"
        }
    ],
    echartsData:{
        saspk:[
            {
                name:'杭州市',
                value:62
            },
            {
                name:'宁波市',
                value:1
            },
            {
                name:'温州市',
                value:5
            },
            {
                name:'嘉兴市',
                value:6
            },
            {
                name:'湖州市',
                value:4
            },
            {
                name:'绍兴市',
                value:2
            },
            {
                name:'金华市',
                value:10
            },
            {
                name:'衢州市',
                value:2
            },
            {
                name:'舟山市',
                value:1
            },
            {
                name:'台州市',
                value:1
            },
            {
                name:'丽水市',
                value:3
            }
        ],
        cb:[
            {
                name:'杭州市',
                value:16
            },
            {
                name:'宁波市',
                value:0
            },
            {
                name:'温州市',
                value:1
            },
            {
                name:'嘉兴市',
                value:0
            },
            {
                name:'湖州市',
                value:4
            },
            {
                name:'绍兴市',
                value:0
            },
            {
                name:'金华市',
                value:0
            },
            {
                name:'衢州市',
                value:0
            },
            {
                name:'舟山市',
                value:0
            },
            {
                name:'台州市',
                value:0
            },
            {
                name:'丽水市',
                value:0
            }
        ]
    },
    caseData:[
        {
            id:1,
            imgSrc:'img/case/case_1.jpg',
            title:'案件发生测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:2,
            imgSrc:'img/case/case_1.jpg',
            title:'案件2测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:3,
            imgSrc:'img/case/case_1.jpg',
            title:'鳌江测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:4,
            imgSrc:'img/case/case_2.jpg',
            title:'测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:5,
            imgSrc:'img/case/case_2.jpg',
            title:'案件发生测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:6,
            imgSrc:'img/case/case_1.jpg',
            title:'案件2测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:7,
            imgSrc:'img/case/case_1.jpg',
            title:'鳌江测试案件20180411',
            time:'2018-04-11 16:14:44'
        },
        {
            id:8,
            imgSrc:'img/case/case_1.jpg',
            title:'测试案件20180411',
            time:'2018-04-11 16:14:44'
        }
    ],
    platformData:[
        {
            text:'杭州',
            value:62
        },
        {
            text:'宁波',
            value:1
        },
        {
            text:'温州',
            value:5
        },
        {
            text:'嘉兴',
            value:6
        },
        {
            text:'湖州',
            value:4
        },
        {
            text:'绍兴',
            value:2
        },
        {
            text:'金华',
            value:10
        },
        {
            text:'衢州',
            value:2
        },
        {
            text:'舟山',
            value:1
        },
        {
            text:'台州',
            value:1
        },
        {
            text:'丽水',
            value:3
        }
    ],
    linkData:[
        {
            text:'新浪',
            value:62
        },
        {
            text:'百度',
            value:1
        }
    ]
};

export let homeData = (state = defaultState,action = {}) => {
    wt.execFunc(reducer[action.type],state,action);
    return wt.extend(true,{},state);
};

let reducer = {
    changeHomeNav(state,action){
        let {menuList} = state;
        let {index} = action;
        menuList.forEach((item,i) => {
            item.selected = i === index;
        });
        requestData({
            type:menuList[index].type
        });
        state.isLoading = true;
    },
    requestHomeDataEnd(state,action){
        state.isLoading = false;
        state.data = action.data;
    }
};


const requestData = (params) => {
    $.ajax({
        url:'/getHomeViewList',
        data:params,
        success:(data) => {
            dispatch({
                type:'requestHomeDataEnd',
                data:data
            });
        }
    });
};