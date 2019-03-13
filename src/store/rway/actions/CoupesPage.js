import { COUPES_UPDATE, COUPES_REQUEST, COUPES_CURRENT_UPDATE, COUPES_CURRENT_BACK_UPDATE } from './../constants/Coupes';
import { SAVE_ORDER } from './../constants/Order';


import { URL, TYME_TYPE, TRAINS_TYPE, COUPES_TYPE } from './../options';

import { SEARCH_SCHEMA, SEARCH, SEARCH_CHANGE } from './../constants/Search';
import { CHANGE_STEP } from './../constants/Step';
import isValid from 'srk/lib/helpers/isValid';

import { parseURL } from './../helpers/parseURL';
import { escapeInjectionOBJ } from './../helpers/escapeInjection';
import { setSearchState } from './../actions/SearchForm';

import { CHANGE_searchFieldsFocus } from './../constants/searchFieldsFocus';

// import { saveToCache } from './../helpers/cache';

import SYNC from '../helpers/sync';

import { addHistorySearch } from './../actions/historyOfSearch';

import { getSortCoupe } from './../selectors/Coupes';


import { pint, pfloat } from './../helpers/pint';
import { is_online, is_operator } from './../helpers/is';

import { getTimeInWayFormat } from './../helpers/getTimeInWayFormat';
import { getCurrentCoupe } from './../selectors/Coupes';
import moment from 'moment'
import _ from 'underscore';
// import $ from 'jquery';





export function onChangeURLParamsCoupes(store) {
	return (history, match) => {

		let urlParams = parseURL(history.location.search)['params'];

		urlParams = escapeInjectionOBJ(urlParams);



		//	сохранюсь в сейт поиска
		let STATE 					= store.getState();
		let setSearchStateParams 	= {};

		if ( !STATE.search.from && urlParams.from )	setSearchStateParams.from 		= urlParams.from;
		if ( !STATE.search.to 	&& urlParams.to )	setSearchStateParams.to 		= urlParams.to;
		if ( urlParams.isoDateFrom )				setSearchStateParams.date 		= moment(urlParams.isoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
		if ( urlParams.backIsoDateFrom )			setSearchStateParams.backDate 	= moment(urlParams.backIsoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');


		if ( _.keys(setSearchStateParams).length ) {
			setSearchState(
				setSearchStateParams
			)(store.dispatch, store.getState);
		}






		//	обновлю в памяти степ
		store.dispatch({
			type: CHANGE_STEP,
			payload: 'coupes'
		});


		store.dispatch({
			type: CHANGE_searchFieldsFocus,
			payload: false
		});



		//	сохранить фильтр вагонов
		let carType_ = ( urlParams['carType'] && (_.indexOf(_.keys(COUPES_TYPE), urlParams['carType'].toLowerCase())+1) ) ? urlParams['carType'].toLowerCase() : 'all';
		store.dispatch({
			type: COUPES_UPDATE,
			payload: {
				filter: {
					'coupe_type' 	: [ carType_ ]
				}
			}
		});


		//	валидирую и загружаю вагоны
		loadCoupes( urlParams )(store.dispatch, store.getState);
	};

}






export function loadCoupes(params) {
	return (dispatch, getState) => {



		//	валидация введенных данных....
		const STATE 	= getState();
		const validate 	= isValid(STATE.search, SEARCH_SCHEMA);

		//	это чтобы подсветить ошибку в форме поиска
		//	или удалить уже показанные ошибки
		dispatch({
			type: SEARCH_CHANGE,
			payload: {
				errors: validate.state
			}
		});



		if (!validate.valid) {
			//	это чтоб показать текст ошибки в строке поиска
			dispatch({
				type: COUPES_UPDATE,
				payload: {
					status: 'error',
					msg: _.find(validate.state, (val_, var_) => val_ !== null),
					list: []
				}
			});
			return null;
		}








		//	такая типо валидация....
		//	в данный момент через функцию escapeInjectionOBJ все обтримленно и экранированно
		if (
			!params['provider'] 	||
			!params['isoDateFrom']  ||
			!params['fromCode'] 	||
			!params['toCode'] 		||
			!params['train']
		) {

			dispatch({
				type: COUPES_UPDATE,
				payload: {
					status: 'error',
					msg: 'Недостаточно параметров запроса.',
					list: []
				}
			});

			return;
		}





		
		
		const search_and_history_params = _.pick(params, _.keys(SEARCH));
		if ( is_online() ) {
			// saveToCache(SEARCH_STORAGE, search_and_history_params);				//	сохраню поиск для последующего заполнения полей в форме поиска...
			addHistorySearch(search_and_history_params)(dispatch, getState);	//	сохраню в историю поиска данный поиск
		}



		
		
		

		//	заполню ордер нужными даными...
		dispatch({
			type: SAVE_ORDER,
			payload: {
				provider : params['provider'] || '',
			}
		});
		

		

		dispatch({
			type: COUPES_UPDATE,
			payload: {
				status			: 'loading',
				msg				: 'Загрузка вагонов...',
				list			: [],
				list_back		: [],
			}
		});





		return SYNC.fetch(
			{
				url: URL['getCoupes'],
				type: 'POST',
				dataType: 'json',
				data: {
					provider		:	params['provider'],
					date			: 	moment(params.isoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
					from			: 	params['from'],
					fromCode		: 	params['fromCode'],
					to				: 	params['to'],
					toCode			: 	params['toCode'],
					time			: 	moment(params.isoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('HH:mm'),
					train			: 	params['train'],

					//	для направления обратно
					backDate		: 	( params.backIsoDateFrom ? moment(params.backIsoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') : '' ),
					backFrom_time	: 	( params.backIsoDateFrom ? moment(params.backIsoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('HH:mm') : '' ),
					backTrain		: 	( params.backTrain 		? params.backTrain 		: '' ),
					backFrom		:	( params.backFrom		? params.backFrom		: '' ),
					backFromCode	:	( params.backFromCode	? params.backFromCode	: '' ),
					backTo			:	( params.backTo			? params.backTo			: '' ),
					backToCode		:	( params.backToCode		? params.backToCode		: '' ),
					
					source			:	window.source,
					brand			:	window.brand,
				}
			},
			COUPES_REQUEST,
			true
		).then(
			getCoupes => {
				//	SUCCESS







				if ( !getCoupes || getCoupes.error || !getCoupes.to.carriages || !getCoupes.to.carriages.length ) {

					dispatch({
						type: COUPES_UPDATE,
						payload: {
							status: 'error',
							msg: getCoupes.msg || 'Извините, ничего не найдено.',
							list: []
						}
					});

				} else {








					//	отформатирую вагоны туда
					let formatterTrains = [];
					_.each(getCoupes.to.carriages, (coupe, index) => {
						let coupe_objekt = coupesConstruct(coupe, STATE, index);
						coupe_objekt.direction = 'to';
						formatterTrains.push(coupe_objekt);
					});


					// теперь обратно
					let formatterTrains_back = [];
					if ( getCoupes.back && getCoupes.back.carriages && getCoupes.back.carriages.length ) {
						_.each(getCoupes.back.carriages, (coupe, index) => {
							let coupe_objekt = coupesConstruct(coupe, STATE, index);
							coupe_objekt.direction = 'back';
							formatterTrains_back.push(coupe_objekt);
						});
					}

					


					dispatch({
						type: COUPES_UPDATE,
						payload: {
							status		: 'success',
							msg			: '',
							list		: formatterTrains,
							list_back	: formatterTrains_back,
							info		: ( getCoupes.to.info )  	? getCoupes.to.info 	: {},
							info_back	: ( getCoupes.back.info )	? getCoupes.back.info 	: {},
						}
					});

					

					//	Если в памяти сохранен номер поезда и есть выбранные места,
					//	то сразу определю к какому вагону они относятся,
					//	и поставлю соответсвующий номер - current
					let state 			= getState();	//	обновлю переменную со стейтом
					let order 			= state['order'];
					let current 		= state['coupes']['current'];
					let current_back 	= state['coupes']['current_back'];

					let number 		= params.number 	|| false;
					let backNumber 	= params.backNumber || false;

					let places 		= ( params.places )		? params.places.split(',') 		: false;
					let backPlaces 	= ( params.backPlaces ) ? params.backPlaces.split(',') 	: false;





					//	если блудить по шагам, то куррент уже может буть выбран...
					if ( current === null ) {
						if ( state['step'] === 'passengers' && number && places.length )
							current = findCoupeIdByTrainNumber(formatterTrains, number, places);
						else
							current = getSortCoupe( state, {direction: 'to'} )[0]['id'];	//	найду просто первый по порядку...

						if ( current === null ) {
							dispatch({
								type: COUPES_UPDATE,
								payload: {
									status: 'error',
									msg: 'Извините, место(а) ' + places.join(', ') + ' уже занято.',
								}
							});
							return null;
						}


						//	если все хорошо, то сохраню нужный номер купе...
						dispatch({
							type: COUPES_UPDATE,
							payload: { current }
						});

						
					}
                    
					if ( current !== null && places && places.length && placesIsset(current, places, 'to', getState()) )
						updateIdCoupe(current, {selectedPlaces: places}, 'to')(dispatch, getState);





					
					//	если блудить по шагам, то куррент уже может буть выбран...
					if ( formatterTrains_back.length && current_back === null ) {
						if ( state['step'] === 'passengers' && backNumber && backPlaces.length )
							current_back = findCoupeIdByTrainNumber(formatterTrains_back, backNumber, backPlaces);
						else
							current_back = getSortCoupe( state, {direction: 'back'} )[0]['id'];	//	найду просто первый по порядку...

						if ( current_back === null ) {
							dispatch({
								type: COUPES_UPDATE,
								payload: {
									status: 'error',
									msg: 'Извините, место(а) в обратном поезде ' + order['places'].join(', ') + ' уже занято.',
								}
							});
							return null;
						}

						//	если все хорошо, то сохраню нужный номер купе...
						dispatch({
							type: COUPES_UPDATE,
							payload: { current_back }
						});
						
					}

					if ( current_back !== null && backPlaces && backPlaces.length && placesIsset(current_back, backPlaces, 'back', getState()) )
						updateIdCoupe(current_back, {selectedPlaces: backPlaces}, 'back')(dispatch, getState);






				}

			},
			response => {

				//	ERROR
				if (response.readyState !== 0) {
					//	not abort
					dispatch({
						type: COUPES_UPDATE,
						payload: {
							status: 'error',
							msg: response.msg || 'Не удалось выполнить поиск. Попробуйте повторить позже.',
							list: []
						}
					});
				}

			}
		);

	};

}













//	тут я должен перебрать все вагоны, и найти нужный по номеру и свободным местам...
function findCoupeIdByTrainNumber(formatterTrains, number, places) {
	let current 			=	null,
		search_by_number 	=	_.where(formatterTrains, {number: number});

	places 	=	places.map( (n) => pint(n) );

	_.each(search_by_number, (car, ind) => {
		let car_places 		=	car['places'].map( (n) => pint(n) );
		let intersection 	=	_.intersection(car_places, places);

		if ( current === null && intersection.length === places.length )
			current = car['id'];
	});

	return current;
}









//	смена текущего купе
//	при его смене открывается схема вагона
export function setCurrentCoupe(index, trigger = true, direction) {
	return (dispatch, getState) => {

		if ( direction === 'to' ) {
			if ( trigger && getState()['coupes']['current'] === index )
				index = null;
		}
		else 
		{
			if ( trigger && getState()['coupes']['current_back'] === index )
				index = null;
		}

		dispatch({
			type: COUPES_UPDATE,
			payload: ( ( direction === 'to' ) ? { current: index } : { current_back: index } )
		});

	};
}









//	смена текущего купе
//	при его смене открывается схема вагона
export function updateIdCoupe(id_, nextData, type_ = 'to') {
	return (dispatch, getState) => {
		
		let index 	= 0;
		let coupes 	= getState()['coupes'];
		if ( type_ === 'to' ) 
			index 	= _.findIndex(coupes['list'], {id: id_});
		else
			index 	= _.findIndex(coupes['list_back'], {id: id_});

		if ( index === -1 )
			return null;

		dispatch({
			type	: ( (type_ === 'to') ? COUPES_CURRENT_UPDATE : COUPES_CURRENT_BACK_UPDATE ),
			payload	: {
				update: nextData,
				index: index,
			}
		});
	};
}




export function updateOrder(param, val) {
	return (dispatch, getState) => {

		let new_values = {};
		new_values[param] = val;

		dispatch({
			type: SAVE_ORDER,
			payload: new_values
		});
	};
}













//	проверка, есть ли возможность оплатить рапидой
function ifPossibleRapida(order, coupe) {

	//	на точках возможна ТОЛЬко рапида
	if ( is_operator() )
		return true;

	//	тут вроде сказали что можно смотреть на параметр coupe['reservation']
	if ( coupe['reservation'] === true || pint(coupe['reservation']) === 1 )
		return true;

	return false;
}








const coupesConstruct = function( coupe, STATE, index ) {

	let coupe_objekt	= 	{...coupe},
		timeInWay 		= 	moment.duration({hours: coupe['timeInWay'].split(':')[0], minutes: coupe['timeInWay'].split(':')[1]}),    //  "09:56" -   // Время в пути от станции отправления до станции прибытия пассажира
		places 			=	_.sortBy(coupe['places'], (n) => pint(n)),		//  Отсортирую места....
		placesObj 		=	{},
		placesObjClear 	=	{},
		placesArrClear 	=	[];
	
	
	_.each(places, (val, key) => {
		placesArrClear.push((val+'').replace(/[^\d]+/g, ''));
		placesObjClear[(val+'').replace(/[^\d]+/g, '')] = val;
		placesObj[val] = val;
	});
	
	
	
	
	
	//	соберу вот такой обьект одного поезда с вагонами
	coupe_objekt['id']					=	index;	//	нужен для дальнейшей рработы с текущим купе
	coupe_objekt['from']				=	coupe['PassengerDepartureStation']['name'];
	coupe_objekt['to']					=	coupe['PassengerArrivalStation']['name'];
	coupe_objekt['fromCode']			=	coupe['PassengerDepartureStation']['code'];
	coupe_objekt['toCode']				=	coupe['PassengerArrivalStation']['code'];
	coupe_objekt['places']				=	places;
	coupe_objekt['prices_on_place']		=	( coupe['prices_on_place'] && _.keys(coupe['prices_on_place']).length ) ? coupe['prices_on_place'] : false;
	coupe_objekt['placesArrClear']		=	placesArrClear;
	coupe_objekt['placesObj']			=	placesObj;
	coupe_objekt['placesObjClear']		=	placesObjClear;
	coupe_objekt['type']             	=   coupe['type'].toLowerCase();
	coupe_objekt['LoyaltyCards']     	=   ( coupe['LoyaltyCards'] && coupe['LoyaltyCards'].trim() ) ? coupe['LoyaltyCards'].split(',') : [];
	coupe_objekt['dateFrom']			=	moment(coupe['dateFrom'], 'YYYY-MM-DD');
	coupe_objekt['dateTo']				=	moment(coupe['dateTo'], 'YYYY-MM-DD');
	coupe_objekt['isoDateFrom']			=	moment(coupe['isoDateFrom'], 'DD.MM.YYYY HH:mm:ss');
	coupe_objekt['isoDateTo']			=	moment(coupe['isoDateTo'],   'DD.MM.YYYY HH:mm:ss');
	coupe_objekt['isoDateFrom_type']	=	TYME_TYPE[ pint(coupe['isoDateFrom_type']) ];
	coupe_objekt['isoDateTo_type']		=	TYME_TYPE[ pint(coupe['isoDateTo_type']) ];
	coupe_objekt['timeFrom']			=	moment(coupe['timeFrom'],    'HH:mm');        //  "00:10" -   // Время отправления со станции отправления пассажира
	coupe_objekt['timeTo']				=	moment(coupe['timeTo'],      'HH:mm');        //  "10:06" -   // Время прибытия на станцию прибытия пассажира
	coupe_objekt['timeInWay']			=	timeInWay;
	coupe_objekt['trainType']			=	TRAINS_TYPE[ coupe['trainType'].toLowerCase() ];
	coupe_objekt['price']				=	pint( coupe['price'] );
	coupe_objekt['maxPrice']			=	pint( coupe['maxPrice'] );
	coupe_objekt['servicePrice']		=	pfloat( coupe['servicePrice'] );
	coupe_objekt['serviceMinPrice']		=	pint( coupe['serviceMinPrice'] );
	coupe_objekt['hide']				=	false;	//	флаг для сортировок
	coupe_objekt['startStorey']			=	0;		//	для двухэтажных вагонов нужно менять точку отсчета
	coupe_objekt['timeInWayFormat']		=	getTimeInWayFormat(timeInWay.days(), timeInWay.hours(), timeInWay.minutes());	//	в формате для человека
	coupe_objekt['ifPossibleRapida']	=	ifPossibleRapida(STATE['order'], coupe);	//	можно-ли оплатить рапидой...
	coupe_objekt['bl']					=	coupe['bl'];	//	постельное белье
	coupe_objekt['LocalDepartureTime']	=	( coupe['LocalDepartureTime'] ) ? moment(coupe['LocalDepartureTime'], 'DD.MM.YYYY HH:mm:ss') : false;
	coupe_objekt['LocalArrivalTime']	=	( coupe['LocalArrivalTime'] ) 	? moment(coupe['LocalArrivalTime'], 'DD.MM.YYYY HH:mm:ss') 	 : false;
	coupe_objekt['selectedPlaces']		=	[];	// места выбранные в данном вагоне
	coupe_objekt['currentFloor']		=	1;	// Текущий этаж
	
	return coupe_objekt;
}








//	проверяю свободны ли метса...
const placesIsset = function(current, places, direction, STATE) {

	let coupe 		= getCurrentCoupe(STATE, {direction});
	let freePlaces 	= coupe.prices_on_place;

	for (let p = 0; p < places.length; p++) {
		if ( !freePlaces[pint(places[p])] )
			return false;
	}

	return true;
}