import React, { Component }from 'react';
import './player.less';
import Progress from '../component/progress/progress.jsx';

import { Link } from 'react-router-dom';

let duration = null;

import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';

@inject((stores) => {
    return {
        appState: stores.appState,
        currentMusitItem: stores.appState.currentMusitItem
    }
}) @observer
export default class Player extends Component{

    constructor(props){
        super(props);
        this.state = {
            progress : 0,
            volume : 0,
            isPlay : true,
            leftTime : '',
            repeatType : 'cycle',
        };
        this.formatTime = this.formatTime.bind(this);
        this.changeProgressHandler = this.changeProgressHandler.bind(this);
        this.changeVolumeHandler = this.changeVolumeHandler.bind(this);
        this.play = this.play.bind(this);
        this.playMusic = this.playMusic.bind(this);
        this.playNext = this.playNext.bind(this);
        this.changeRepeat = this.changeRepeat.bind(this);
    }

    formatTime(time){
        time = Math.floor(time);
        let miniutes = Math.floor( time / 60 );
        let seconds = Math.floor( time % 60 );
        seconds = seconds < 10 ? `0${seconds}`: seconds;
        return `${miniutes}:${seconds}`;
    }


    componentDidMount() {

        $('#player').jPlayer({
            supplied : 'mp3',
            wmode : 'window'
        });

        this.playMusic(this.props.currentMusitItem);

        $('#player').bind($.jPlayer.event.ended, (e)=>{
            this.playNext();
        });

        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                volume : e.jPlayer.options.volume * 100,
                progress : e.jPlayer.status.currentPercentAbsolute,
                leftTime : this.formatTime( duration*(1-e.jPlayer.status.currentPercentAbsolute/100) )
            })
        });
    }

    play() {
        if (this.state.isPlay) {
            $("#player").jPlayer("pause");
        } else {
            $("#player").jPlayer("play");
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }


    playNext(type){
        let index = this.props.appState.currentIndex;

        let newIndex = null;
        let musicListLength = this.props.appState.musicList.length;

        let palyMode = this.state.repeatType;
        switch (palyMode){
            case 'once':
                newIndex = index;
                break;
            case 'random':
                newIndex = Math.floor(Math.random()*musicListLength);
                break;
            default:
                if(type === 'next'){
                    newIndex = (index + 1) % musicListLength;
                }else if(type === 'prev'){
                    newIndex = (index - 1 + musicListLength) % musicListLength;
                }
                break;
        }

        this.props.appState.changeCurrentIndex(newIndex);
        this.playMusic(this.props.appState.musicList[newIndex]);
    }

    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3 : musicItem.file
        }).jPlayer('play');

        this.props.appState.changeCurrentMusicItem(musicItem);
    }

    changeRepeat() {
        let repeatType = ['once','random','cycle'];
        let index = repeatType.indexOf(this.state.repeatType);

        let newIndex = (index+1) % 3;

        this.setState({
            repeatType: repeatType[newIndex]
        })
    }

    changeProgressHandler(progress){
        $('#player').jPlayer(this.state.isPlay?'play':'pause',duration * progress);
    }

    changeVolumeHandler(progress) {
        $("#player").jPlayer("volume", progress);
    }

    componentWillUnmount(){
        $('#player').unbind($.jPlayer.event.timeupdate);
        $('#player').unbind($.jPlayer.event.ended);
    }

    render() {
        return (
            <div className='player-page'>
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusitItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusitItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">-{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor='#aaa'
                                    >
                                    </Progress>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.changeProgressHandler}
                            >
                            </Progress>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playNext.bind(this,'prev')}></i>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
                                <i className="icon next ml20" onClick={this.playNext.bind(this,'next')}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.state.repeatType}`} onClick={this.changeRepeat}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <img src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title}/>
                    </div>
                </div>
            </div>
        );
    }
}

Player.wrappedComponent.propTypes = {
    appState: PropTypes.object.isRequired,
    currentMusitItem: PropTypes.object.isRequired,
}