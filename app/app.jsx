import React, { Component } from 'react';
// import { Link } from 'react-router-dom';//eslint-disable-line


import Header from './component/header/header.jsx';


// react的组件就是去写一个class  这个class继承自react.component这个class
export default class App extends Component {

    render() {
        return (
            <div>
                <Header/>
            </div>
        )

    }
}
