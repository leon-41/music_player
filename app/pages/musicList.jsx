import React, { Component }from 'react';
import MusicListItem from '../component/musicListItem/musicListItem.jsx';



export default class MusicList extends Component{
    render(){
        let listEle = null;
        listEle = this.props.musiclist.map((item)=>{
            return <MusicListItem
                focus={item === this.props.currentMusitItem}
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
