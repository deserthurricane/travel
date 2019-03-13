import { parseURL } from './parseURL';
import { escapeInjectionOBJ } from './escapeInjection';
import $ from 'jquery';

import cookie from 'react-cookies';

import { SAVE_UTM_PARAMS } from './../options';


//	Сохранение меток в куки
export function setUTM() {
	let search = parseURL()['params'];
	search = escapeInjectionOBJ( search );


	let svyaznoy_referer = true;
	if ( document.referrer && document.referrer.trim() ) 
		svyaznoy_referer = ( document.referrer.indexOf('svyaznoy.travel')+1 ) ? true : false;

		
	for (let i = 0; i < SAVE_UTM_PARAMS.length; i++) {
		let utm = SAVE_UTM_PARAMS[i];

		if ( search[utm] && search[utm].trim() && !svyaznoy_referer )
			cookie.save(utm, search[utm].trim(), { maxAge : (60*60*24*14) /*, path: '/', domain: '.svyaznoy.travel'*/});
	}
}







export function getUTMParams() {
	let utm_params = {};
	
	for (let i = 0; i < SAVE_UTM_PARAMS.length; i++) {
		let utm 	= SAVE_UTM_PARAMS[i];
		let cook 	= cookie.load(utm) || false;

		if ( cook !== false )
			utm_params[utm]=cook;
	}

	return utm_params;
}




//	Сохранение меток в куки
export function getUTMUrlString() {
	let utm_params = getUTMParams();

	return $.param(utm_params);
}
