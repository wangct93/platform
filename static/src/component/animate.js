/**
 * Created by Administrator on 2018/4/23.
 */
import React from 'react';
import Component from '../lib/component';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';

export default class animate extends Component{
    render(){
        let {oldProps,props} = this;
        let {data} = props;
        let {animateData} = this.state || {};
        let Component = props.component;
        if(oldProps !== props){
            this.oldProps = props;
            this.start();
        }
        return <Component data={data} animateData={animateData}/>
    }
    start(){
        clearInterval(this.timer);
        let {to = {},from = {},interval = 300,success} = this.props;
        let speedData = {};
        let nowData = {};
        let count = 0;
        let maxCount = Math.ceil(interval / 30);
        for(let type in from){
            if(from.hasOwnProperty(type)){
                let value = from[type];
                if(value !== undefined){
                    if(to[type] === undefined){
                        to[type] = value;
                    }
                    nowData[type] = value;
                    speedData[type] = (to[type].toString().toNum() - value.toString().toNum()) / maxCount;
                }
            }
        }
        if(!wt.isEmpty(nowData)){
            let timer = setInterval(() => {
                count++;
                if(count >= maxCount){
                    clearInterval(timer);
                    nowData = to;
                    wt.execFunc(success,to);
                }else{
                    for(let type in nowData){
                        if(nowData.hasOwnProperty(type)){
                            nowData[type] += speedData[type];
                        }
                    }
                }
                this.updateView(nowData);
            },30);
            this.timer = timer;
        }
    }
    updateView(data){
        this.setState({
            animateData:wt.clone(data)
        });
    }
}

