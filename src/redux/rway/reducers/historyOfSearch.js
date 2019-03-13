// import $ from 'jquery';
import moment from 'moment';
// import update from "immutability-helper"

import { getFromCache, saveToCache } from './../helpers/cache';

import { HISTORY_OF_SERACH, HISTORY_OF_SERACH_ADD, HISTORY_OF_SERACH_DEL } from './../constants/historyOfSearch';

import { MOMENT_FORMATS } from './../options';

const initialState = [...getFromCache(HISTORY_OF_SERACH, [])];

//	теперь нужно отфильтровать прошлые поиски...
let NEW_initialState = [];
for (let i = 0; i < initialState.length; i++)
	if (moment(initialState[i]['date'], MOMENT_FORMATS['DATE_FORMAT']).diff(moment(), 'days') >= 0)
		//	фильтрую прошедншие даты
		NEW_initialState.push(initialState[i]);

export default function historyOfSearch(state = NEW_initialState, action) {

	switch (action.type) {

	case HISTORY_OF_SERACH_ADD:
		let newHistory = [ ...[ action.payload ], ...state.filter(h => h.hash !== action.payload.hash).slice(0, 5) ];

		// let newHistory = $.extend(true, [], state)

		// if (!_.where(newHistory, {hash: action.payload.hash}).length)
		//     newHistory.unshift(action.payload);
		//
		// if (newHistory.length > 6)
		//     newHistory.shift(); //	Удалю первый элемент

		saveToCache(HISTORY_OF_SERACH, newHistory);

		return newHistory; // eslint-disable-next-line
			break // eslint-disable-next-line

	case HISTORY_OF_SERACH_DEL:
		let newFilteredHistory = state.filter(h => h.hash !== action.payload.hash);

		saveToCache(HISTORY_OF_SERACH, newFilteredHistory);

		return newFilteredHistory; // eslint-disable-next-line
			break // eslint-disable-next-line
		default:
		return state;

	}

}
