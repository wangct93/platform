/**
 * Created by Administrator on 2018/3/19.
 */
import React from 'react';
import Component from '../lib/component';
import {connect} from 'react-redux';

import {HashRouter,NavLink,Switch,Route,Redirect,withRouter} from 'react-router-dom';

import * as actionObj from '../store/home/action';
import echarts from 'echarts';

const NavBox = ({data}) => {
    return <div className="home-nav-box mgb25">
        <nav className="home-nav">
            {
                data.map(({iconCls,text,path},i) => {
                    return <NavLink key={i} to={path} className={`nav-item ${iconCls}`}>{text}</NavLink>
                })
            }
        </nav>
        <div className="home-nav-content home-box">
            <Switch>
                {
                    data.map(({path,component},i) => {
                        return <Route path={path} key={i} component={component}/>
                    })
                }
                <Redirect to={data[0].path} />
            </Switch>
        </div>
    </div>;
};

const getChartOption = (title,xData,seriesData) => {
    return {
        color:["#6FD2F6"],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : xData,
                axisLabel:{
                    rotate :0,
                    textStyle:{
                        color:'#fff'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#888'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel:{
                    textStyle:{
                        color:'#fff'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#888'
                    }
                },
                splitLine:{
                    lineStyle:{
                        color:'#888'
                    }
                }
            }
        ],
        series : [
            {
                name:title,
                type:'bar',
                barWidth : 20,
                data:seriesData
            }
        ]
    };
};


class SaspkEchartsComponent extends Component{
    render(){
        return <div className="fit" ref="box"/>
    }
    componentDidMount(){
        let chart = echarts.init(this.refs.box);
        let {data = []} = this.props;
        let xData = [];
        let seriesData = [];
        data.forEach(({name,value}) => {
            xData.push(name);
            seriesData.push(value);
        });
        let option = getChartOption('案件',xData,seriesData);
        chart.setOption(option);
    }
}
class CbEchartsComponent extends Component{
    render(){
        return <div className="fit" ref="box"/>
    }
    componentDidMount(){
        let chart = echarts.init(this.refs.box);
        let {data = []} = this.props;
        let xData = [];
        let seriesData = [];
        data.forEach(({name,value}) => {
            xData.push(name);
            seriesData.push(value);
        });
        let option = getChartOption('串并案',xData,seriesData);
        chart.setOption(option);
    }
}

const SaspkEcharts = connect(state => ({
    data:state.homeData.echartsData.saspk
}))(SaspkEchartsComponent);

const CbEcharts = connect(state => ({
    data:state.homeData.echartsData.cb
}))(CbEchartsComponent);



const Box = ({data}) => {
    let {iconCls,list = []} = data;
    return <div className="home-view-box">
        <div className="home-nav">
            <a className={`nav-item ${iconCls}`}/>
            <div className="home-more-box">
                <a className="home-more-text">更多</a>
            </div>
        </div>
        <div className="home-box">
            <ul className="home-list">
                {
                    list.map((item,i) => {
                        return <Item key={i} data={item} />
                    })
                }
            </ul>
        </div>
    </div>
};

class Item extends Component{
    render(){
        let {imgSrc,title,time} = this.props.data || {};
        return <li>
            <div className="img-box">
                <img src={imgSrc} />
            </div>
            <p><span title={title} className="hand-text">{title}</span></p>
            <p className="time">{time}</p>
        </li>
    }
}

const getNavData = () => {
    return [
        {
            iconCls:'nav-item-qssak',
            path:'/saspk',
            component:SaspkEcharts
        },
        {
            iconCls:'nav-item-ca',
            path:'/cb',
            component:CbEcharts
        }
    ]
};

class Home extends Component{
    render(){
        let {menuList,caseData,match} = this.props;
        return <div className="body-content home-container">
            <div className="home-bg">
                <img src="img/home/home_bg.png" />
            </div>
            <div className="home-content">
                <ul className="menu-list home-box mgb25">
                    {
                        menuList.map(({iconCls,text,id},i) => {
                            return <li key={i}>
                                <div className={`menu-item ${iconCls}`}>{text}</div>
                            </li>
                        })
                    }
                </ul>
                <div className="home-main">
                    <div className="home-left">
                        <HashRouter basename={match.url}>
                            <NavBox data={getNavData()}/>
                        </HashRouter>
                        <Box data={{
                            iconCls:'nav-item-zxaj',
                            list:caseData
                        }} />
                    </div>
                    <div className="home-right">
                        <UserBox />
                        <Box2 data={{
                            title:'通知公告',
                            Content:NoticeList
                        }} />
                        <Box2 data={{
                            title:'市级平台',
                            Content:PlatformList
                        }} />
                        <Box2 data={{
                            title:'友情链接',
                            Content:LinkList
                        }} />
                    </div>
                </div>
            </div>
        </div>
    }
}

class UserBox extends Component{
    render(){
        return <div className="user-box home-box">
            <div className="img-box">
                <img src="img/home/user_logo.png" />
            </div>
            <div className="user-content">
                <p>管理员，欢迎您！</p>
                <p>
                    <span className="hand-text">信息修改</span>
                    <span className="hand-text">退出</span>
                </p>
                <p>
                    <span className="hand-text">进入我的平台</span>
                </p>
                {/*<div className="user-btn-box">*/}
                    {/*<a className="login-btn"/>*/}
                {/*</div>*/}
            </div>
        </div>
    }
}

class Box2 extends Component{
    render(){
        let {title = '',Content = ''} = this.props.data || {};
        return <div className="home-box home-view-box2">
            <div className="home-header">
                <span>{title}</span>
                <span className="home-more-box">
                    <a className="home-more-text">更多</a>
                </span>
            </div>
            {
                Content && <Content />
            }
        </div>
    }
}

const NoticeList = connect(state => state.homeData)(({noticeList}) => {
    return <ul className="notice-list">
        {
            noticeList.map((item,i) => {
                return <NoticeItem data={item} key={i} />
            })
        }
    </ul>
});

class NoticeItem extends Component{
    render(){
        let {content = '',time = ''} = this.props.data || {};
        return <li>
            <span className="notice-title">
                <span className="hand-text">{content}</span>
            </span>
            <span className="notice-time">{new Date(time).toFormatString('MM-DD')}</span>
        </li>
    }
}

const PlatformList = connect(state => ({
    data:state.homeData.platformData
}))(({data = []}) => {
    return <ul className="platform-list">
        {
            data.map((item,i) => {
                return <PlatformItem key={i} data={item} />
            })
        }
    </ul>
});

class PlatformItem extends Component{
    render(){
        let {text = ''} = this.props.data || {};
        return <li>
            <span className="hand-text">{text}</span>
        </li>
    }
}

const LinkList = connect(state => ({
    data:state.homeData.linkData
}))(({data = []}) => {
    return <ul className="link-list">
        {
            data.map((item,i) => {
                return <LinkItem key={i} data={item} />
            })
        }
    </ul>
});

class LinkItem extends Component{
    render(){
        let {text = ''} = this.props.data || {};
        return <li>
            <span className="hand-text">{text}</span>
        </li>
    }
}

export default connect((state) => state.homeData,actionObj)(Home);