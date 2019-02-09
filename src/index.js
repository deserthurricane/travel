import React from 'react';
import { Provider } from 'react-redux';
import store from './ducks/index';
import App from './App';

export default function RootComponent() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}