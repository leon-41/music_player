import React, { Component } from 'react';

import { Link, Route, Switch, Redirect } from 'react-router-dom';
import Pubsub from 'pubsub-js';

import { MUSIC_LIST } from './store/musicList';

import Header from './component/header/header.jsx';
import Player from './pages/player.jsx';

import MusicList from './pages/musicList.jsx';




// react的组件就是去写一个class  这个class继承自react.component这个class
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            musiclist : MUSIC_LIST,
            currentMusitItem : MUSIC_LIST[0]
        };
    }

    playMusic(musicItem){
        $('#player').jPlayer('setMedia',{
            mp3 : musicItem.file
        }).jPlayer('play');

        this.setState({
            currentMusitItem : musicItem
        })
    }

    playNext(type = 'next'){
        let index = this.findMusicIndex(this.state.currentMusitItem);
        let newIndex = null;
        let musicListLength = this.state.musiclist.length;

        if(type === 'next'){
            newIndex = (index + 1) % musicListLength;
        }else if(type === 'prev'){
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }

        this.playMusic(this.state.musiclist[newIndex]);
    }

    findMusicIndex(musicItem){
        return this.state.musiclist.indexOf(musicItem);
    }

    componentDidMount() {
        $('#player').jPlayer({
            supplied : 'mp3',
            wmode : 'window'
        });

        this.playMusic(this.state.currentMusitItem);

        $('#player').bind($.jPlayer.event.ended, (e)=>{
            this.playNext();
        });

        Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
            this.setState({
                musiclist : this.state.musiclist.filter(item=>{
                    return item !== musicItem;
                })
            })
        });

        Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
            this.playMusic(musicItem);
        });

        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
        Pubsub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });

    }

    componentWillUnmount(){
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('PLAY_PREV');
        $('#player').unbind($.jPlayer.event.ended);

    }

    render() {
        console.log(this);
        return (
            <div>
                <div>
                    <Header />
                    <Player currentMusitItem={this.state.currentMusitItem}/>
                </div>
            </div>
        )

    }
}
export default class Root extends Component{
    render(){
        return (
            <Route path="/list" component={MusicList} ></Route>
        )
    }
}

