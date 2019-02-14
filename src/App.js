import React from 'react';
import { Provider } from 'react-redux';
import store from './ducks/index';
import AppWrapper from './AppWrapper';

export default function App() {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
}