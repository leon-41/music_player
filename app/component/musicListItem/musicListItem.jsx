import React, { Component }from 'react';
import './musicListItem.less';
import Pubsub from 'pubsub-js';

import PropTypes from 'prop-types';
import {
    inject,
    observer,
} from 'mobx-react';

@inject((stores) => {
    return {
        appState: stores.appState,
    }
}) @observer
export default class MusicListItem extends Component{

    playMusic(musicItem){
        Pubsub.publish('PLAY_MUSIC',musicItem);
    }

    deleteMusic(musicItem,e){
        e.stopPropagation();
        this.props.appState.deleteMusicItem(musicItem.id);
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

MusicListItem.wrappedComponent.propTypes = {
    appState: PropTypes.object.isRequired,
}