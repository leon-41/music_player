import {
    observable,
    computed,
    action,
} from 'mobx';

import { MUSIC_LIST } from './musicList.js';

class AppState {
    @observable musicList;
    @observable currentMusitItem;
    @observable currentIndex;

    constructor() {
        this.musicList = MUSIC_LIST;
        this.currentMusitItem = MUSIC_LIST[0];
        this.currentIndex = 0;
    }


    @action deleteMusicItem(id) {
        this.musicList = this.musicList.filter((item) => {
            return item.id !== id;
        })
    }

    @action changeCurrentMusicItem(item){
        this.currentMusitItem = item;
    }

    @action changeCurrentIndex(index){
        this.currentIndex = index;
    }


}



const appState = new AppState();
export default appState;