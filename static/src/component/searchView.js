/**
 * Created by Administrator on 2018/4/25.
 */
import React from 'react';
import Component from '../lib/component';
import {render} from 'react-dom';
import {HashRouter,NavLink,Route,Switch,withRouter,Redirect} from 'react-router-dom';
import RouterSwitch from '../component/routerSwitch';
import SearchComponent from '../component/searchComponent';
import Loading from '../component/loading';
import Paging from "../component/paging";
export default class View extends Component{
    render(){
        let {searchData,btnData,data,match,location} = this.props;
        let basePath = match.url;
        let nowPath = location.pathname;
        let viewTpes = [
            {
                text:'图片',
                path:'/image',
                component:ImgTextView,
                query:{
                    data
                }
            },
            {
                text:'详情',
                path:'/detail',
                component:D
            }
        ];
        return <div className="search-view-container">
            <div className="sv-header">
                <SearchForm data={searchData}/>
                <SearchBtnBox data={btnData} />
            </div>
            <div className="sv-content">
                <div className="sv-tool-box">
                    <div className="view-type-box">
                        {
                            viewTpes.map(({path,text},i) => {
                                let toPath = basePath + path;
                                return <NavLink key={i} to={{
                                    pathname:toPath,
                                    query:{
                                        data
                                    }
                                }}>
                                    <input type="radio"  checked={nowPath === toPath} onChange={() => {}}/>
                                    <span>{text}</span>
                                </NavLink>;
                            })
                        }
                    </div>
                </div>
                <div className="story-content">
                    <RouterSwitch basename={basePath} data={viewTpes}/>
                    <Loading show={false}/>
                </div>
            </div>
            <Paging/>
        </div>
    }
    search(){
        let {searchData} = this.props;

    }
}

class ImgTextView extends Component{
    render(){
        let {location = {}} = this.props;
        let {data = []} = location.query || {};
        return <ul className="img-text-list">
            {
                data.map((item,i) => {
                    return <ImgTextItem key={i} data={item}/>
                })
            }
        </ul>
    }
}

class ImgTextItem extends Component{
    render(){
        let {data} = this.props;
        let {id,title,imgSrc = 'img/case/case_1.jpg',imgCount = 0,videoCount = 0,personCount = 0,vehicleCount = 0,type,faTime,lrTime} = data;
        return <li>
            <div className="img-box img-box-center">
                <img src={imgSrc}/>
            </div>
            <div className="flex-box">
                <div className="line-text">{id}</div>
                <span className="hand-text">复制</span>
            </div>
            <div className="line-text">{title}</div>
            <div className="line-text">案件类别：{type}</div>
            <div className="line-text">发案时间：{faTime}</div>
            <div className="line-text">录入时间：{lrTime}</div>
            <div className="line-text">图片（{imgCount}），视频（{videoCount}），人（{personCount}），车（{vehicleCount}）</div>
            <div className="flex-box">
                <div className="line-text"/>
                <span className="hand-text">修改</span>
                <span className="hand-text">删除</span>
            </div>
        </li>
    }
}


class SearchForm extends Component{
    render(){
        let {data} = this.props;
        return <div className="search-form">
            {
                data.map((item,i) => {
                    return <div key={i} className="search-form-line">
                        {
                            item.map((item,i) => {
                                return <SearchComponent key={i} data={item} />
                            })
                        }
                    </div>
                })
            }
        </div>
    }
}
class SearchBtnBox extends Component{
    render(){
        let {data} = this.props;
        return <div className="sv-btn-box">
            {
                data.map(({iconCls,text},i) => {
                    return <a className="w-btn" key={i}>
                        <i className={`iconfont ${iconCls}`}/>
                        <span>{text}</span>
                    </a>
                })
            }
        </div>;
    }
}

class D extends Component{
    render(){
        return <div></div>
    }
}