import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
    inject,
    observer,
} from 'mobx-react'

import Header from './component/header/header.jsx';
import Player from './pages/player.jsx';

@inject((stores) => {
    return {
        appState: stores.appState,
    }
}) @observer
export default class App extends Component{

    render() {
        return (
            <div>
                <div>
                    <Header />
                    <Player/>
                </div>
            </div>
        )

    }
}

App.wrappedComponent.propTypes = {
    appState: PropTypes.object.isRequired,
}
