import { combineReducers } from 'redux';
import search from './search';
import order from './order';
import trains from './trains';
import coupes from './coupes';
import services from './services';
import historyOfSearch from './historyOfSearch';
import step from './step';
import searchFieldsFocus from './searchFieldsFocus';
import payMethods from './payMethods';
import passengers from './passengers';
import book from './book';
import status from './status';
import Slider from './Slider';






export default combineReducers({
	search,
	order,
	trains,
	coupes,
	services,
	historyOfSearch,
	step,
	searchFieldsFocus,
	payMethods,
	passengers,
	book,
	status,
	Slider,
});
