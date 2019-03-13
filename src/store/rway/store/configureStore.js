import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { redirect } from './redirectMiddleware';

import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore() {

	const applyMiddleware_ = applyMiddleware(thunk, redirect);

	let store = {};
	if ( process.env.NODE_ENV !== 'production' )
		store = createStore(rootReducer, composeWithDevTools(applyMiddleware_));
	else
		store = createStore(rootReducer, applyMiddleware_);

	return store;

}
