import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import countriesReducer from './countries/index';
import passengerDataReducer from './passenger';

const rootReducer = combineReducers({
    countries: countriesReducer,
    passengerData: passengerDataReducer
});
export default createStore(rootReducer, applyMiddleware(thunk));