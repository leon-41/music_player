import React, { Component }from 'react';
import './musicListTtem.less';
import Pubsub from 'pubsub-js'


export default class MusicListItem extends Component{

    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC',musicItem);
    }

    deleteMusic(musicItem,e){
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC',musicItem);
    }

    render(){
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this,musicItem)} className={`row components-listitem${this.props.focus ? ' focus' : ''}`} >
                <p><span className="bold">{musicItem.title}</span>  -  {musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this,musicItem)} className="-col-auto delete"></p>
            </li>
        )
    }
}