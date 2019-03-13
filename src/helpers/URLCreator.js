import $ from 'jquery';

import { RULES } from './../constants/Router';
import { escapeInjectionOBJ } from './../helpers/escapeInjection';
// import { getUTMUrlString, getUTMParams } from './../helpers/setUTM';








//	ссылка на страницу поиска поездов
/**
 * @return {string}
 */
export function trainsURL(params) {

	params = escapeInjectionOBJ(params);

	let urlParams = {
		from: params['from'],
		to	: params['to'],
		date: params['date']
	};

	// urlParams = {...urlParams, ...getUTMParams()};

	
	if ( params['backDate'] && params['backDate'].trim() )
		urlParams['backDate'] = params['backDate'];


	return RULES.trains + '?' + $.param(urlParams);
}








//	ссылка на страницу конкретного поезда
/**
 * @return {string}
 */
export function coupesURL(trainParams = false, carType = false, back_trainParams = false, back_carType = false ) {

	if ( !trainParams )
		return '';

	var params = {
		train 				:	trainParams.trainNumApi,
		from 				:	trainParams.from,
		to 					:	trainParams.to,
		fromCode 			:	trainParams.fromCode,
		toCode 				:	trainParams.toCode,
		provider			:	trainParams.provider,
		isoDateFrom			:	trainParams.isoDateFrom.format('YYYY-MM-DD HH:mm:ss'),
		carType 			:	( carType ) ? carType : 'all',
	};

	if ( trainParams.selectedPlaces && trainParams.selectedPlaces.length )
		params.places = trainParams.selectedPlaces.join(',');

	if ( trainParams.number )
		params.number = trainParams.number;


	//	если выбран обратный поезд, то добавляю его данные в урл
	if ( back_trainParams ) {
		params.backTrain		=	back_trainParams.trainNumApi;
		params.backFrom			=	back_trainParams.from;
		params.backTo			=	back_trainParams.to;
		params.backFromCode		=	back_trainParams.fromCode;
		params.backToCode		=	back_trainParams.toCode;
		params.backIsoDateFrom	=	back_trainParams.isoDateFrom.format('YYYY-MM-DD HH:mm:ss');
		params.backCarType		=	( back_carType ) ? back_carType : 'all';
		
		if ( back_trainParams.selectedPlaces && back_trainParams.selectedPlaces.length )
			params.backPlaces = back_trainParams.selectedPlaces.join(',');

		if ( back_trainParams.number )
			params.backNumber = back_trainParams.number;
	}

	// params = {...params, ...getUTMParams()};

	return RULES.coupes + '?' + $.param(params);
}





//	ссылка на страницу даннных пассажиров...
/**
 * @return {string}
 */
export function passengersURL(coupe, coupe_back, order) {

	let params = {
		train		:	coupe.trainNumApi,
		from		:	coupe.PassengerDepartureStation.name,
		to			:	coupe.PassengerArrivalStation.name,
		fromCode	:	coupe.PassengerDepartureStation.code,
		toCode		:	coupe.PassengerArrivalStation.code,
		isoDateFrom	:	coupe.isoDateFrom.format('YYYY-MM-DD HH:mm:ss'),
		places		:	coupe.selectedPlaces.join(','),
		number		:	coupe.number,
		provider	:	coupe.provider,
		peoples		:	order.count_adult + ':' + order.count_child + ':' + order.count_baby,
	};

	
	if ( coupe_back ) {
		params.backTrain		=	coupe_back.trainNumApi;
		params.backFrom			=	coupe_back.PassengerDepartureStation.name;
		params.backTo			=	coupe_back.PassengerArrivalStation.name;
		params.backFromCode		=	coupe_back.PassengerDepartureStation.code;
		params.backToCode		=	coupe_back.PassengerArrivalStation.code;
		params.backIsoDateFrom	=	coupe_back.isoDateFrom.format('YYYY-MM-DD HH:mm:ss');
		params.backPlaces		=	coupe_back.selectedPlaces.join(',');
		params.backNumber		=	coupe_back.number;
	}

	// params = {...params, ...getUTMParams()};

	let url = RULES.pass + '?' + $.param( params );

	return url;
}







//	ссылка на маршрут следования
/**
 * @return {string}
 */
export function marshrutURL(trainParams, web_root = true) {
	//	сделаю на всякий случай
	const trainNum 	= trainParams.trainNumApi || trainParams.trainNum || trainParams.trainNumViewed,
			date 	= trainParams.isoDateFrom.format('YYYY-MM-DD');


	// encodeURIComponent
	let url	= 'train-marshrut/'+trainParams.provider+'/'+date+'/'+trainParams.from+'/'+trainParams.fromCode+'/'+trainNum;

	if ( web_root )
		url = window.WEB_ROOT + url;

	return url;
}











//	ссылка на страницу брони
/**
 * @return {string}
 */
export function bookURL(order, web_root = false) {

	let url = '/book/' + order.idOrder + '/' + order.hash;

	// if ( web_root )
	// 	url = window.WEB_ROOT + url;

	// return url + '?' + getUTMUrlString();
	return url;
}






export function getPayFrameURL(order, web_root = false) {

	let url = 'get-pay-frame/' + order.idOrder + '/' + order.hash;

	if ( web_root )
		url = window.WEB_ROOT + url;

	return url;
}
