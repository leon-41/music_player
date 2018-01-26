import React, {Component} from 'react'
import {
    Route,
    Redirect,
    withRouter,
} from 'react-router-dom'
import MusicList from "../pages/musicList";
import {hashHistory} from "react-router";
import Player from "../pages/player";



export default () =>{

    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}/>
                    <Route path="/list" component={MusicList} ></Route>
                </Route>
            </Router>
        )
    }
}