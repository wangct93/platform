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
        let {Component,data} = props;
        let {option} = this.state || {};
        if(oldProps !== props){
            this.oldProps = props;
            this.start();
        }
        return <Component data={data} option={option}/>
    }
    start(){
        clearInterval(this.timer);
        let {option = {},interval = 300} = this.props;
        let speedData = {};
        let nowData = {};
        let count = 0;
        let maxCount = Math.ceil(interval / 30);
        for(let type in option){
            if(option.hasOwnProperty(type)){
                let ary = option[type];
                if(!wt.isArray(ary)){
                    ary = [ary,ary];
                }
                nowData[type] = ary[0];
                speedData[type] = (ary[1].toString().toNum() - ary[0].toString().toNum()) / maxCount;
            }
        }
        let timer = setInterval(() => {
            count++;
            if(count >= maxCount){
                clearInterval(timer);
                for(let type in option){
                    if(option.hasOwnProperty(type)){
                        let ary = option[type];
                        if(!wt.isArray(ary)){
                            ary = [ary,ary];
                        }
                        nowData[type] = ary[1];
                    }
                }
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
    updateView(option){
        this.setState({
            option:wt.clone(option)
        });
    }
}

