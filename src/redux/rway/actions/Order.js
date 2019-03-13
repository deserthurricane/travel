import { SAVE_ORDER, BOOK_ORDER, CANCEL_ORDER, PAY_TICKET, GET_CAB_LINK } 	from './../constants/Order';
import { PAY_METHODS_UPDATE }		from './../constants/payMethods';
import { URL } 			from './../options';
import SYNC 			from '../helpers/sync';
import { getCurrentCoupe }	from './../selectors/Coupes';
import cookie 			from 'react-cookies';
import _ 				from 'underscore';
import { getCoupeGender } from './../helpers/Order';



export function saveOrder(params) {
	return (dispatch, getState) => {

		dispatch({
			type: SAVE_ORDER,
			payload: params
		});

	};
}




export function saveOrderToCookie() {
	return (dispatch, getState) => {

		let order = getState()['order'];

		let toCookie = {
			e_mail		:	order['e_mail'],
			phoneCode	:	order['phoneCode'],
			phone		:	order['phone'],
			sclub		:	order['sclub'],
		};

		cookie.save(SAVE_ORDER, toCookie, { path: '/', maxAge: (60*60*24*90) /*domain: '.svyaznoy.travel'*/});
	};
}







export function book() {
	return (dispatch, getState) => {



		let state 		= getState(),
			order_json	= {...state['order']},
			pass		= [...state['passengers']],
			services	= [...state['services']['list']],
			payMethods	= {...state['payMethods']},
			coupesInfo	= {...state['coupes']['info']},
			coupe		= getCurrentCoupe(state, {direction: 'to'}),
			coupe_back	= getCurrentCoupe(state, {direction: 'back'});


		//	Сервисы: *****
		for (let i = 0; i < services.length; i++)
			services[i] = _.omit(services[i], ['title','title_short','descr','url']);



		
		order_json['payment_variant'] 	= payMethods['current'];
		order_json['directionGroup']	= coupesInfo['directionGroup'];





		//	Пассажиры
		for (let i = 0; i < pass.length; i++) {
			pass[i] = _.omit(pass[i], ['AgeCategory_str']);

			pass[i]['FamilyName'] 	= pass[i]['FamilyName'].trim();
			pass[i]['Name'] 		= pass[i]['Name'].trim();
			pass[i]['Patronymic'] 	= pass[i]['Patronymic'].trim();
			pass[i]['DocType'] 		= pass[i]['DocType'].trim();
		}





		let coupe_send = {
			'er'			:	coupe['er'],
			'number'		:	coupe['number'],
			'type'			:	coupe['type'],
			'serviceClass'	:	coupe['serviceClass'],
			'train'			:	coupe['trainNumApi'],
			'from'			:	coupe['PassengerDepartureStation']['name'],
			'to'			:	coupe['PassengerArrivalStation']['name'],
			'fromCode'		:	coupe['PassengerDepartureStation']['code'],
			'toCode'		:	coupe['PassengerArrivalStation']['code'],
			'isoDateFrom'	:	coupe['isoDateFrom'].format('YYYY-MM-DD HH:mm:ss'),
			'places'		:	coupe['selectedPlaces'].join(','),
			'bl'			:	coupe['bl'] || null,
			'Gender'		:	getCoupeGender(coupe),
		};


		let coupe_back_send = {};
		if ( coupe_back )
			coupe_back_send = {
				'er'			:	coupe_back['er'],
				'number'		:	coupe_back['number'],
				'type'			:	coupe_back['type'],
				'serviceClass'	:	coupe_back['serviceClass'],
				'train'			:	coupe_back['trainNumApi'],
				'from'			:	coupe_back['PassengerDepartureStation']['name'],
				'to'			:	coupe_back['PassengerArrivalStation']['name'],
				'fromCode'		:	coupe_back['PassengerDepartureStation']['code'],
				'toCode'		:	coupe_back['PassengerArrivalStation']['code'],
				'isoDateFrom'	:	coupe_back['isoDateFrom'].format('YYYY-MM-DD HH:mm:ss'),
				'places'		:	coupe_back['selectedPlaces'].join(','),
				'bl'			:	coupe_back['bl'] || null,
				'Gender'		:	getCoupeGender(coupe_back),
			};





		return SYNC.fetch(
			{
				url: URL['BookTicket'],
				type: 'POST',
				dataType: 'json',
				data: {
					order			:	order_json,
					coupe			:	coupe_send,
					coupe_back		:	coupe_back_send,
					pass			:	pass,
					services		:	services,
					brand			:	window.brand,
					source			:	window.source,
				}
			},
			BOOK_ORDER,
			true
		)

	};
}








export function cancel() {
	return (dispatch, getState) => {

		let state 		= getState();
		let idOrder 	= state['order']['idOrder']	||	false;
		let hash 		= state['order']['hash']	||	false;

		if ( !idOrder || !hash )
			return null;

		return SYNC.fetch(
			{
				url: URL['cancelTicket'],
				type: 'POST',
				dataType: 'json',
				data: {
					loadId		:	idOrder,
					hash		:	hash,
					brand		:	window.brand,
				}
			},
			CANCEL_ORDER,
			true
		)

	};
}





export function savePayMethod( newPayMethod ) {
	return (dispatch, getState) => {

		if ( !newPayMethod.trim() )
			return null;

		dispatch({
			type: PAY_METHODS_UPDATE,
			payload: {
				current: newPayMethod.trim(),
			}
		});

	};
}








export function getPayTicket() {
	return (dispatch, getState) => {

		let state 		= getState();
		let idOrder 	= state['order']['idOrder']	||	false;
		let hash 		= state['order']['hash']	||	false;

		if ( !idOrder || !hash )
			return null;

		return SYNC.fetch(
			{
				url: URL['payTicket'],
				type: 'POST',
				dataType: 'json',
				data: {
					loadId		:	idOrder,
					hash		:	hash,
					brand		:	window.brand,
					source		:	window.source,
				}
			},
			PAY_TICKET,
			true
		)

	};
}






export function getCabinetLink( params ) {
	return (dispatch, getState) => {

		params['brand'] 	= window.brand;
		params['source'] 	= window.source;

		return SYNC.fetch(
			{
				url: URL['getCabinetLink'],
				type: 'POST',
				dataType: 'json',
				data: params
			},
			GET_CAB_LINK,
			true
		)

	};
}


