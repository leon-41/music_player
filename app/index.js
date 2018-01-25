import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

require('../static/css/reset.css');
require('../static/css/common.css');

render(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('root')
);


// 当需要热更新的代码出现的时候，把整个app重新加载一遍
if (module.hot) {

    module.hot.accept('./app.jsx', () => {

        //在app.jsx中使用的export default 这种方式， 在require这种老的加载方式是不会去自动加载default的
        const NewApp = require('./app.jsx').default;
        render(
            <AppContainer>
                <NewApp />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}