import React,{Component} from "react";
import { Route } from 'react-router-dom';

import MusicList from "./pages/musicList.jsx";
import App from './app.jsx'


export default () => [
    <Route path="/" exact component={App} key='index'></Route>,
    <Route path="/list" component={MusicList} key='list'></Route>
]