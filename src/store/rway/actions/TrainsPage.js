import { TRAINS_REQUEST, TRAINS_UPDATE, TRAIN_UPDATE } from './../constants/Trains';
import { COUPES_UPDATE } from './../constants/Coupes';

import cookie from 'react-cookies';
import _ from 'underscore';
// import $ from 'jquery';
import { URL, TYME_TYPE, TRAINS_TYPE } from './../options';

import { SEARCH_SCHEMA, SEARCH, SEARCH_CHANGE } from './../constants/Search';
import { CHANGE_STEP } from './../constants/Step';
import isValid from 'srk/lib/helpers/isValid';

import { parseURL } from './../helpers/parseURL';
import { escapeInjectionOBJ } from './../helpers/escapeInjection';
// import { setSearchState } from './../actions/SearchForm';

import SYNC from './../helpers/sync';

import { addHistorySearch } from './../actions/historyOfSearch';


import { pint } from './../helpers/pint';
import { is_online, is_catalog } from './../helpers/is';
import { getTimeInWayFormat } from './../helpers/getTimeInWayFormat'
import moment from 'moment'

import { getCoupesTypes, getSortTrains } from './../selectors/Trains';
import { getCoupesTypesByCoupes } from './../selectors/Coupes';
import { SERVICES_UPDATE_LIST } from './../constants/Services';
import { SAVE_ORDER } from './../constants/Order';
import { setSearchState } from './SearchForm';






export function onChangeURLParamsTrains(store) {
	return (history, match) => {

		// скою форму субсткрайба
		if ( window.toggleSubscribeForm )
			window.toggleSubscribeForm(false)

		let urlParams = parseURL(history.location.search)['params'];


		//	этот параметр нужно сбрасывать из урла
		urlParams['backDate'] = (urlParams['backDate'] && urlParams['backDate'].trim()) ? urlParams['backDate'].trim() : '';

		urlParams = _.pick(urlParams, _.keys(SEARCH));	// фильтрану, что-бы в стейт ничего лишнего не попало
		
		urlParams = escapeInjectionOBJ(urlParams);

		//	запишу в глобальный стейт новый данные
		setSearchState(urlParams)(store.dispatch, store.getState);

		//	валидирую и загружаю поезда
		loadTrains()(store.dispatch, store.getState);
	};
}





export function loadTrains() {
	return (dispatch, getState) => {

		let params = getState().search;




		//	обновлю в памяти степ
		dispatch({
			type: CHANGE_STEP,
			payload: 'trains'
		});



		
		//	валидация введенных данных....
		const validate = isValid(getState().search, SEARCH_SCHEMA);

		
		//	это чтобы подсветить ошибку в форме поиска
		//	или удалить уже показанные ошибки
		dispatch({
			type: SEARCH_CHANGE,
			payload: {
				errors: validate.state
			}
		});



		if ( !validate.valid ) {
			//	это чтоб показать текст ошибки в строке поиска
			dispatch({
				type: TRAINS_UPDATE,
				payload: {
					status: 'error',
					msg: _.find(validate.state, (val_, var_) => val_ !== null),
					list: []
				}
			});

			return null;
		}



		if ( is_online() ) {
			// saveToCache(SEARCH_STORAGE, params);			//	сохраню поиск для последующего заполнения полей в форме поиска...
			addHistorySearch(params)(dispatch, getState);	//	сохраню в историю поиска данный поиск
		}



		
		if ( is_catalog() )
			cookie.save('svz_catalogCity', params['from'], {
				path: '/',
				maxAge: (60 * 60 * 24 * 90) /*domain: '.svyaznoy.travel'*/
			});



			
		//	отчищу сервисы
		dispatch({
			type: SERVICES_UPDATE_LIST,
			payload: []
		});




		
			
		//	отчищу номер предыдущей брони чтоб она не отменилась при следующей...
		dispatch({
			type: SAVE_ORDER,
			payload: {
				idOrder	: '',
				hash	: '',
			}
		});





		dispatch({
			type: COUPES_UPDATE,
			payload: {
				current: null,
				current_back: null,
			}
		});




		dispatch({
			type: TRAINS_UPDATE,
			payload: {
				status		: 'loading',
				msg			: 'Поиск поездов...',
				list		: [],
				list_back	: [],
			}
		});



		SYNC.fetch(
			{
				url: URL['getTrains'],
				type: 'POST',
				dataType: 'json',
				data: {
					date		: params['date'],
					backDate	: params['backDate'],
					from		: params['from'],
					to			: params['to'],
					brand		: window.brand,
					source		: window.source,
				}
			},
			TRAINS_REQUEST,
			true
		).then(
			getTrains => {

				//	SUCCESS

				if (!getTrains || getTrains.error || !getTrains.to.trains.length) {

					dispatch({
						type: TRAINS_UPDATE,
						payload: {
							status: 'error',
							msg: getTrains.msg || 'Не удалось выполнить поиск. Попробуйте повторить позже.',
							list: [],
							other_date_on_trains: getTrains.other_date_on_trains || [],
						}
					});

				} else if (getTrains.many_stations) {

					dispatch({
						type: TRAINS_UPDATE,
						payload: {
							status: 'many_stations',
							msg: '',
							list: []
						}
					});

				} else {








					//	отформатирую направление обратно
					// это приципиально чтоб вначале формировать обратное направление
					// т.к. при формировании направления туда, 
					// нужно определять поезда обратно по умолчанию
					// а для этого нуже их список...
					let list_back 	= [];
					if ( getTrains.back && getTrains.back.trains && getTrains.back.trains.length ) 	{

						_.each(getTrains.back.trains, (train) => {
							list_back.push( trainConstruct(train, getTrains.back.info) );
						});

						list_back = _.sortBy(list_back, train => train['isoDateFrom'].unix());
					}








					


					//	отформатирую направление туда
					let formatterTrains = [];
					_.each(getTrains.to.trains, (train) => {

						let newTrain = trainConstruct(train, getTrains.to.info);
						
						//	если есть направление обратно
						if ( list_back.length ) {

							//	тут буду фильтровать те поезда на которые нет обратных рейсов
							const FBDT = filterBackDirectionTrains(newTrain, list_back);
							
							newTrain['back_train_num_api'] = ( FBDT.length ) ? FBDT[0]['trainNumApi'] : false;		// то проверю есть ли обратные поезда, если есть то возьму первый

							//	очень важно!!!  back_train_num_api  это индекс в УЖЕ ОТФИЛЬТРОВАННОМ МАССИВЕ поездов
							if ( newTrain['back_train_num_api'] !== false )	//..обрежу те поезда, на которыне нет обратных рейсов
								formatterTrains.push(newTrain);
						}
						else
						{
							formatterTrains.push(newTrain);
						}
						
					});


					dispatch({
						type: TRAINS_UPDATE,
						payload: {
							status		: 'success',
							msg			: '',
							list		: formatterTrains,
							list_back	: list_back,
							other_date_on_trains: [],
						}
					});










				}

			},
			response => {

				//	ERROR

				if (response.readyState !== 0) {

					//	not abort
					dispatch({
						type: TRAINS_UPDATE,
						payload: {
							status: 'error',
							msg: response.msg || 'Не удалось выполнить поиск. Попробуйте повторить позже.',
							list: [],
							other_date_on_trains: [],
						}
					});

				}

			}
		);

	};
}





//	переключение фильтров...
//	Эта функция будет использоваться как для переключения фильтров на странице вагонов
//	так и для переключения фильтров на странице купе
//	т.к. смысл один и тот-же только разные переключатели...
export function changeFilter(type_of_filter, type, value, direction = 'to') {
	return (dispatch, getState) => {

		value 				= value.toLowerCase();


		let filter 			= [],
			trainTypes 		= [],
			dispatch_type 	= '',
			STATE 			= getState();


		if ( type_of_filter === 'TRAINS' )	{
			filter 			= STATE['trains']['filter'];
			trainTypes 		= getCoupesTypes(STATE);
			dispatch_type 	= TRAINS_UPDATE;
		}
		else
		{
			filter 			= STATE['coupes']['filter'];
			trainTypes 		= getCoupesTypesByCoupes(STATE, {direction});
			dispatch_type 	= COUPES_UPDATE;
		}



		//	если вдруг пришел неизвестный ранее тип фильттров.
		//	они должны быть заранее описаны в константах!!!
		if ( !filter[type] )	{
			console.error('type - ' + type + ' - not found!');
			return;
		}


		// console.log('filter', filter);
		// console.log('type', type);
		// console.log('value', value);
		// console.log('trainTypes', trainTypes);



		if ( _.indexOf(filter[type], value)+1 ) {	//	удаление
			filter[type] = _.without(filter[type], value);

			if ( !filter[type].length )	//	если ничего не выбранно, то деляю галку все
				filter[type] = ['все'];
		}
		else
		{
			if ( value === 'все' )	{	//	если нажато "Все" то просто делаю ТОЛЬКО пункт все остальное отчищаю
				filter[type] = ['все'];
			}
			else {	//	если добавляю не "все" то его удаляю если он уже добавлен
				filter[type].push(value);

				if ( _.without(filter[type], 'все').length === _.without(trainTypes, 'все').length )
					filter[type] = ['все'];
				else
					filter[type] = _.without(filter[type], 'все');
			}
		}





		dispatch({
			type: dispatch_type,
			payload: {
				filter: {...filter}
			}
		});





		//	теперь нужно выбрать уже первый отфильтрованный вагон...
		let FilteredToTrains 	= getSortTrains(STATE, {direction: 'to'});
		let FilteredBackTrains 	= getSortTrains(STATE, {direction: 'back'});
		for (let t = 0; t < FilteredToTrains.length; t++) {
			let tna = filterBackDirectionTrains(FilteredToTrains[t], FilteredBackTrains);
			FilteredToTrains[t]['back_train_num_api'] = tna[0]['trainNumApi'];

			dispatch({
				type: TRAIN_UPDATE,
				payload: {
					trainNumApi: FilteredToTrains[t]['trainNumApi'],
					update: FilteredToTrains[t],
				}
			});
		}
		



	};
}







//	сортировка поездов...
export function changeSortTrains(type) {
	return (dispatch, getState) => {

		let new_sorting = {};
		let sorting 	= getState()['trains']['sorting'];

		if ( !sorting[type] )
			new_sorting[type] = 'DESC';
		else
			new_sorting[type] = (sorting[type] === 'DESC') ? 'ASC' : 'DESC';

		dispatch({
			type: TRAINS_UPDATE,
			payload: {
				sorting: {...new_sorting}
			}
		});
	};
}









//	изменение информации в поезде туда...
export function trainUpdate(trainNumApi, update) {
	return (dispatch, getState) => {

		dispatch({
			type: TRAIN_UPDATE,
			payload: {
				trainNumApi: trainNumApi,
				update: update,
			}
		});
	};
}









const trainConstruct = function( train, info ) {
	let TRAIN = {};

	let coupes 				= _.sortBy(train['coupes'], (coupe) => coupe['price'] ),	//	отсортирую вагоны по цене...
		timeInWay 			= moment.duration({hours: train['timeInWay'].split(':')[0], minutes: train['timeInWay'].split(':')[1]}),
		TimeInWayFormat 	= getTimeInWayFormat(timeInWay.days(), timeInWay.hours(), timeInWay.minutes());	//	в формате для человека

	TRAIN = {
		'from'					: 	info.from 		|| '',
		'fromCode'				: 	info.fromCode 	|| '',
		'to'					: 	info.to 		|| '',
		'toCode'				: 	info.toCode 	|| '',
		'brand'					: 	train['brand'],
		'provider'				: 	train['provider'],
		'isoDateFrom_type'		:	TYME_TYPE[ pint(train['isoDateFrom_type']) ],
		'isoDateTo_type'		:	TYME_TYPE[ pint(train['isoDateTo_type']) ],
		'isoDateFrom'			:	moment(train['isoDateFrom'], 'DD.MM.YYYY HH:mm:ss'),
		'isoDateTo'				:	moment(train['isoDateTo'], 'DD.MM.YYYY HH:mm:ss'),
		'timeInWay'				: 	timeInWay,
		'timeInWayFormat'		:	TimeInWayFormat,
		'type' 					: 	train['trainType'].toLowerCase(),
		'trainType' 			: 	TRAINS_TYPE[ train['trainType'].toLowerCase() ],
		'trainNumApi'			:	train['trainNumApi'],
		'trainNumViewed'		:	train['trainNumViewed'],
		'coupes'				:	coupes,
		'name' 					:	train['name'],
		'er'					:	train['er'],
		'how_much_time_is_left'	:	train['how_much_time_is_left'],
		'stations'				:	train['stations'],
		'LocalDepartureTime'	:	( train['LocalDepartureTime'] ) ? moment(train['LocalDepartureTime'], 'DD.MM.YYYY HH:mm:ss') : false,
		'LocalArrivalTime'		:	( train['LocalArrivalTime'] ) 	? moment(train['LocalArrivalTime'], 'DD.MM.YYYY HH:mm:ss') 	 : false,
	};

	return TRAIN;
}






export const filterBackDirectionTrains = ( train_to, list_back ) => {

	let filtered = _.filter(list_back, (tr) => {

		if ( train_to['provider'] === tr['provider'] && train_to['isoDateTo'] < tr['isoDateFrom'] )
			return true;

		return false;
	});

	return ( filtered.length ) ? filtered : false;
}