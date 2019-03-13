// import $ from 'jquery';
import moment from 'moment';

import cookie 	        from 'react-cookies';

import { getFromCache } from './../helpers/cache';
import { is_online, is_catalog } 	from './../helpers/is';

import { SEARCH_CHANGE, SEARCH, SEARCH_STORAGE } from './../constants/Search';
import { MOMENT_FORMATS } from './../options';






let initialState = {...SEARCH};



if ( is_online() )
	initialState = {...initialState, ...getFromCache(SEARCH_STORAGE, {})};


if ( is_catalog() )
	initialState['from']	=	cookie.load('svz_catalogCity')  || '';





//	если это сео страницы, и есть данные для
//	подстановки в поиск, то подставлю их...
if ( window.seo_from && window.seo_from.trim() ) 	initialState['from'] 	= window.seo_from.trim();
if ( window.seo_to 	 && window.seo_to.trim() ) 		initialState['to'] 		= window.seo_to.trim();
if ( window.seo_date && window.seo_date.trim() ) 	initialState['date'] 	= window.seo_date.trim();





//	если из памяти зашгружается дата из прошлого,
// то сделаю ее текущей
if ( moment(initialState['date'], MOMENT_FORMATS['DATE_FORMAT']).diff(moment(), 'days') < 0)
	initialState['date'] = moment().format(MOMENT_FORMATS['DATE_FORMAT']);






export default function search(state = initialState, action) {

	switch (action.type) {

	case SEARCH_CHANGE:
			return {...state, ...action['payload']}; // eslint-disable-next-line
		break
		default:
			return state;

	}

}
