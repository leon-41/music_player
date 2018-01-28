import React, { Component }from 'react';

import MusicListItem from '../component/musicListItem/musicListItem.jsx';

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
export default class MusicList extends Component{
    render(){
        let MUSIC_LIST = this.props.appState.musicList;
        let listEle = null;
        listEle = MUSIC_LIST.map((item)=>{
            return <MusicListItem
                focus={false}
                key={item.id}
                musicItem={item}
            >
                {item.title}
            </MusicListItem>
        });

        return (
            <ul>
                {listEle}
            </ul>
        )
    }
}

MusicList.wrappedComponent.propTypes = {
    appState: PropTypes.object.isRequired,
}
