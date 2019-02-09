import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countriesReducer from './countries/index';

const rootReducer = combineReducers({
    countries: countriesReducer
});
export default createStore(rootReducer, applyMiddleware(thunk));