import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store'

const container = document.getElementById("root");
render(
    <Provider store={store}>
        <App />
    </Provider>,
container);

