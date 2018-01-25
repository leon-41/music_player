import React, { Component } from 'react';
import './progress.less';

export default class Progress extends Component{

    getDefaultProps(){
        return {
            barColor : '#2f9842'
        }
    }

    changeProcess(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        console.log(progress);
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    render(){
        return (
            <div className='components-progress' ref='progressBar' onClick={this.changeProcess}>
                <div className='progress'
                     style={{width:`${this.props.progress}%`, background:this.props.barColor}}
                ></div>
            </div>
        );
    }
}