import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Root from './root.jsx';

require('../static/css/reset.css');
require('../static/css/common.css');

import appState from './store/app-state.js';

const root = document.getElementById('root');
const render = (Component) => {
    ReactDOM.hydrate(
        <AppContainer>
            <Provider appState={appState}>
                <BrowserRouter>
                    <Component />
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        root,
    )
};
render(Root);


// 当需要热更新的代码出现的时候，把整个app重新加载一遍
if (module.hot) {

    module.hot.accept('./root.jsx', () => {

        //在app.jsx中使用的export default 这种方式， 在require这种老的加载方式是不会去自动加载default的
        const NewApp = require('./root.jsx').default;
        render(NewApp);
    });
}