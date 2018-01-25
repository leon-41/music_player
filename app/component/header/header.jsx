import React, { Component } from 'react';
import './header.less';


export default class Header extends Component{
    render() {
        return (
            <div className='components-header row'>
                <img src={require('../../..//static/images/logo.png')} alt="" width="40" className="-col-auto"/>
                <h1 className="caption">React Music Player</h1>
            </div>
        )
    }
}