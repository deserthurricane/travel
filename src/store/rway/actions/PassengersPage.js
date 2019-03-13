import _ from 'underscore';
// import $ from 'jquery';
// import cookie from 'react-cookies';
// import moment from 'moment';

import { COUPES_UPDATE } from './../constants/Coupes';
// import { SEARCH } from './../constants/Search';
import { CHANGE_STEP } from './../constants/Step';
import { ORDER_SCHEMA, SAVE_ORDER }	from './../constants/Order';
import { PAY_METHODS_UPDATE, PAY_METHOD_REQUEST } from './../constants/payMethods';
import { URL, PAY_METHODS, AVAIL_TARIFFS, MAP_PASS_TYPES, DOC_TYPE } from './../options';

import { CHANGE_searchFieldsFocus } from './../constants/searchFieldsFocus';
import { parseURL } from './../helpers/parseURL';
import { escapeInjectionOBJ } from './../helpers/escapeInjection';
// import { setSearchState } from './../actions/SearchForm';
import { pint } from './../helpers/pint'
import { loadCoupes } from  './CoupesPage';
import isValid from 'srk/lib/helpers/isValid';
import { is_operator, is_online } from './../helpers/is';
// import { loadServices } from './Services';
import { getFromCache, saveToCache } from './../helpers/cache';
import { ONE_PASSENGERS, PASSENGERS_UPDATE, ONE_PASSENGERS_UPDATE, PASSENGERS } from './../constants/Passengers';
import { getCurrentCoupe } from './../selectors/Coupes';
import SYNC from '../helpers/sync';
import { updateIdCoupe } from './CoupesPage';
import { loadBeddingServices } from './Services';
import { indexOfObj } from './../helpers/indexOfObj';






export function onChangeURLParamsPassengers(store) {
	return async (history, match) => {

		let urlParams = parseURL(history.location.search)['params'];

		urlParams = escapeInjectionOBJ(urlParams);





		// //	сохранюсь в сейт поиска
		// let setSearchStateParams 		= _.pick(urlParams, _.keys(SEARCH));
		// setSearchStateParams.date 		= moment(urlParams.isoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
		// setSearchStateParams.backDate 	= moment(urlParams.backIsoDateFrom, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');

		// setSearchState(
		// 	setSearchStateParams
		// )(store.dispatch, store.getState);




		

		// let urlParamsSearch = obj_filter(urlParams, _.keys(SEARCH)); // фильтрану, что-бы в стейт поиска ничего лишнего не попало
		// //	запишу в глобальный стейт новый данные
		// if ( is_operator() ) {
		// 	setSearchState(urlParamsSearch)(store.dispatch, store.getState);
		// }
		// else
		// {
		// 	setSearchState(
		// 		_.omit(urlParamsSearch, ['from', 'to']) 	//	не буду делат ьназвания искомых городов некрасивыми...
		// 	)(store.dispatch, store.getState);
		// }
		




        //	обновлю в памяти степ
		store.dispatch({
			type: CHANGE_STEP,
			payload: 'passengers'
		});


		store.dispatch({
			type: CHANGE_searchFieldsFocus,
			payload: false
		});




        // // фильтрану, что-бы в стейт ничего лишнего не попало
        // let urlParamsCoupe = obj_filter(urlParams, [
    	// 											..._.keys(SEARCH),
    	// 											...['from', 'to', 'date', 'provider','from_time','train','number','places','peoples', 'backDate', 'backFrom_time', 'backTrain', 'backNumber', 'backPlaces', 'backFrom', 'backFromCode', 'backTo', 'backToCode']
    	// 										]
		// 									);
												

        // //  выбранные места придется здесь в ручную привести в порядок....
        // if ( urlParamsCoupe['places'] )
        //     urlParamsCoupe['places'] = urlParamsCoupe['places'].split(',').map( (p) => pint(p) );


        // //  выбранные места придется здесь в ручную привести в порядок....
        // if ( urlParamsCoupe['backPlaces'] )
        //     urlParamsCoupe['backPlaces'] = urlParamsCoupe['backPlaces'].split(',').map( (p) => pint(p) );



        const validate 	= isValid(urlParams, ORDER_SCHEMA);
		if ( !validate.valid ) {

            store.dispatch({
                type: COUPES_UPDATE,
                payload: {
                    status: 'error',
                    msg: _.filter(validate.state, (it) => { return it } ).join(', '),
                    list: []
                }
            });

            return null;
		}


		

		let peoples = urlParams['peoples'].split(':');
        store.dispatch({
            type: SAVE_ORDER,
            payload: {
				count_adult: pint(peoples[0]),
				count_child: pint(peoples[1]),
				count_baby: pint(peoples[2]),
			}
        });

		

		//	загружаю вагоны если нужно...
		// let order = store.getState()['order'];
        let coupes = store.getState()['coupes'];
        if ( coupes['status'] !== 'success' || !coupes['list'].length || coupes['current'] === null )
            await loadCoupes( urlParams )(store.dispatch, store.getState);



        //  обновлю данные
        coupes = store.getState()['coupes'];
        if ( coupes['status'] === 'success' && coupes['list'].length ) {
			fixGenderOnPlices()(store.dispatch, store.getState);
			constructPassengerCollection(urlParams)(store.dispatch, store.getState);
			// loadServices()(store.dispatch, store.getState);
			loadBeddingServices()(store.dispatch, store.getState);
			loadPayMethods()(store.dispatch, store.getState);
        }


	};
}












//	бывает что в урле приходит вместо 11С  -  просто 11 (без признака гендера)
//	мне тут нужно найти эти места в купе и перезаписать места уже с признаком...
export function fixGenderOnPlices() {
	return (dispatch, getState) => {

		let STATE 		= 	getState();
		let current 	=	STATE['coupes']['current'];

		if ( current === null )
			return;

		let coupe 		=	getCurrentCoupe(STATE, {direction: 'to'});
		let places 		=	coupe.selectedPlaces.map( (n) => pint(n) );
		let new_places 	=	_.pick(coupe['placesObjClear'], places);

		updateIdCoupe(coupe.id, {selectedPlaces: _.values(new_places)}, coupe.direction)(dispatch, getState);




		let current_back 	=	STATE['coupes']['current_back'];
		let coupe_back		=	getCurrentCoupe(STATE, {direction: 'back'});

		if ( current_back && coupe_back ) {
			let backPlaces 		=	coupe_back.selectedPlaces.map( (n) => pint(n) );
			let new_backPlaces 	=	_.pick(coupe_back['placesObjClear'], backPlaces);

			updateIdCoupe(coupe_back.id, {selectedPlaces: _.values(new_backPlaces)}, coupe_back.direction)(dispatch, getState);
		}

	};
}









//	возможных способов оплаты...
export function loadPayMethods() {
	return (dispatch, getState) => {
		let order = getState()['order'];

        dispatch({
			type: PAY_METHODS_UPDATE,
			payload: {
				status: 'loading',
				msg: 'Загрузка способов оплаты...',
				list: [],
                current: null,
			}
		});

		SYNC.fetch(
			{
				url: URL['getAvailablePaymentTools'],
				type: 'POST',
				dataType: 'json',
				data: {
                    provider	:	order['provider'],
					source		:	window.source,
					brand		:	window.brand,
				}
			},
			PAY_METHOD_REQUEST,
			true
		).then(
			getPayMethods => {
				//	SUCCESS

                if ( !getPayMethods || getPayMethods.error || !getPayMethods.length ) {

                    dispatch({
            			type: PAY_METHODS_UPDATE,
            			payload: {
            				status: 'error',
            				msg: getPayMethods.msg || 'Извините, ничего не найдено.',
            				list: [],
                            current: null,
            			}
            		});

				} else {





					//	фильтранц не нужные способы оплаты...
					const PAY_METHODS_filtered = PAY_METHODS[window.brand];
					getPayMethods = getPayMethods.filter((p) => PAY_METHODS_filtered[ p.Code ]);



					if ( is_operator()  )
						getPayMethods = getPayMethods.filter((p) => p.Code !== 'CC');




					//	найду текущий способ оплаты..
					let current = null;
					let state 	= getState();
					let coupe	= getCurrentCoupe(state, {direction: 'to'});

					if ( !coupe['ifPossibleRapida'] )
						current = 'CC';
					else if ( is_operator() )
						current = 'RAPIDA';
					else
						current = getPayMethods[0]['Code'];



                    dispatch({
            			type: PAY_METHODS_UPDATE,
            			payload: {
            				status: 'success',
            				msg: '',
            				list: getPayMethods,
                            current: current,
            			}
            		});

				}

			},
			response => {

				//	ERROR
				if (response.readyState !== 0) {
					//	not abort
					dispatch({
						type: PAY_METHODS_UPDATE,
						payload: {
							status: 'error',
							msg: response.msg || 'Не удалось загрузить способы оплаты.',
							list: [],
                            current: null,
						}
					});
				}

			}
		);

	};
}






//	Построю массив данных с пассажирами....
export function constructPassengerCollection(urlParamsCoupe) {
	return (dispatch, getState) => {

		let STATE		= getState();
		let info		= STATE.coupes.info;
		let info_back	= STATE.coupes.info_back;
		
		
		let coupe		= getCurrentCoupe(STATE, {direction: 'to'});
		let coupe_back	= getCurrentCoupe(STATE, {direction: 'back'});

		let peoples 	= urlParamsCoupe['peoples'].split(':');		//	adult child infant
		let places 		= coupe.selectedPlaces;
		let passengers 	= STATE['passengers'];
		let pass_list 	= ['adult', 'child', 'baby'];

		for (let i = 0; i < pass_list.length; i++) {
			let type 		= pass_list[i];
			let need 		= pint(peoples[i]);

			while ( need !== _.where(passengers, {AgeCategory:type}).length ) {
				if ( need > _.where(passengers, {AgeCategory:type}).length )
					passengers = addPass(passengers, type);
				else
					passengers = popPass(passengers, type);
			}
		}

		
		//	заполню некоторые дополнительные данные по умолчанию...
		for (let i = 0; i < passengers.length; i++) {
			let getTariff_ 			= getTariff(passengers[i], coupe['AvailableTariffs'], coupe_back['AvailableTariffs']);
			let getAllowedDocTypes_ = getAllowedDocTypes(passengers[i], info['allowedDocTypes'], info_back['allowedDocTypes']);

			//	место в вагоне
			passengers[i]['place'] = ( (places[i]) ? places[i] : false )


			//	тариф по усмолчанию...
			if ( !_.where(getTariff_, {code:passengers[i]['tariff']}).length )
				passengers[i]['tariff'] = ( getTariff_.length ) ? getTariff_[0]['code'] : '';


			//	документ по умолчанию...
			if ( !_.where(getAllowedDocTypes_, {code:passengers[i]['DocType']}).length )
				passengers[i]['DocType'] = ( getAllowedDocTypes_.length ) ? getAllowedDocTypes_[0]['code'] : '';
		}





		
		//	тут такая тема: если нужен только один пассажир, и в памяти он есть, то сразу заполню его...
		if ( is_online() ) {
			let need_pass 				= pint(peoples[0]) + pint(peoples[1]);
			let passFromLocalStortage 	= getPassengersFromLocalStorage();
			if ( need_pass === 1 && passFromLocalStortage.length ) {
	
				let fromLocal = passFromLocalStortage[0];	//	возьму из памяти первого...
	
				//	заполню ТОЛЬКО ПУСТЫЕ ПОЛЯ!!!
				for (let attr in passengers[0]) {
					if ( !passengers[0][attr] )
						passengers[0][attr] = fromLocal[attr];
				}
				
			}
		}






        dispatch({
            type: PASSENGERS_UPDATE,
            payload: passengers
        });

	};



	function addPass(ps, type) {
		let new_pass = {...ONE_PASSENGERS, ...{AgeCategory: type}};
		ps.push(new_pass);
		
		return [...ps];
	}


	function popPass(ps, type) {
		let excess = _.findLastIndex(ps, {AgeCategory: type});

		if ( excess+1 )
			ps = _.without(ps, ps[excess]);

		return [...ps];
	}

}






//	Подберу тарифы
export function getTariff(pass, AvailableTariffs, AvailableTariffs_back) {
	
	AvailableTariffs_back	=	AvailableTariffs_back || AvailableTariffs;	//	если это OW то тариф обратно сделаю аналогичным туда. Это не сломает ничего

	AvailableTariffs 		=	AvailableTariffs.map(( e )=> e+'' );	//	застрочу
	AvailableTariffs_back	=	AvailableTariffs_back.map(( e )=> e+'' );	//	застрочу

	let tariff 				=	[];
	let AgeCategory 		=	pass['AgeCategory'];
	let mapPassTypes 		=	MAP_PASS_TYPES[ AgeCategory ];
	let needTarifs			=	_.intersection(AvailableTariffs, AvailableTariffs_back, mapPassTypes);

	_.each(AVAIL_TARIFFS, ( item, ind ) => {
		if ( _.indexOf(needTarifs, ind)+1 )
			tariff.push({
				code	:	ind,
				label	:	item,
			});
	});

	return tariff;
}






//	Подберу все типы документов доступные тут
export function getAllowedDocTypes(pass, allowedDocTypes_, backAllowedDocTypes) {
	let allowedDocTypes 		=	[];
	let AgeCategory				=	pass['AgeCategory'];

	backAllowedDocTypes			=	backAllowedDocTypes || allowedDocTypes_;	//	если это OW то обратно сделаю аналогичным туда. Это не сломает ничего
	
	allowedDocTypes_ 			=	allowedDocTypes_.split(',');
	backAllowedDocTypes 		=	backAllowedDocTypes.split(',');


	//	Детям и младенцам нужно удалить паспорт из документов...
	if ( _.indexOf(['child', 'baby'], AgeCategory)+1 ) {
		allowedDocTypes_ 	= _.difference(allowedDocTypes_, ['ПН', 'ПМ', 'ВБ']);
		backAllowedDocTypes = _.difference(backAllowedDocTypes, ['ПН', 'ПМ', 'ВБ']);
	}


	_.each(DOC_TYPE, ( item ) => {
		if ( _.indexOf(allowedDocTypes_, item['code'])+1 &&  _.indexOf(backAllowedDocTypes, item['code'])+1 )
			allowedDocTypes.push({
				code	:	item['code'],
				label	:	item['label'],
			});
	});

	return allowedDocTypes;
}



//	сохранение данных определенного пассажира
export function savePassenger(index, update) {
	return (dispatch, getState) => {

        dispatch({
			type: ONE_PASSENGERS_UPDATE,
			payload: {
				update: update,
				index: index,
			}
		});

	};
}









//	сохраню данные пассажиров в куки...
export function savePassengersToLocalStorage() {
	return (dispatch, getState) => {

        let passengers 	= getState()['passengers'];
		let LS 			= getFromCache(PASSENGERS, []);

		for (let i = 0; i < passengers.length; i++) {

			let need = indexOfObj(LS, {
				FamilyName	:	passengers[i]['FamilyName'],
				Name		:	passengers[i]['Name'],
				Patronymic	:	passengers[i]['Patronymic'],
			});
		
			if ( need+1 )
				LS[ need ] = {...LS[ need ], ...passengers[i]};
			else
				LS.unshift(passengers[i]);
		}


		if ( LS.length > 10 )
			LS = LS.slice(0, 10);

		saveToCache(PASSENGERS, LS);
	};
}








export function getPassengersFromLocalStorage() {

	let LS	= getFromCache(PASSENGERS, []);

	if ( LS.length > 10 )
		LS = LS.slice(0, 10);

	return LS;
}




export function delFromLocalStorage( pass ) {

	let LS	= getFromCache(PASSENGERS, []);

	let NEW_LS = _.filter(LS, (p) => {
		 if (
			 p['FamilyName'] === pass['FamilyName'] &&
			 p['Name'] === pass['Name']
			 // p['Patronymic'] === pass['Patronymic'] &&
		 )
			return false;
		 else
		 	return true;
	});

	saveToCache(PASSENGERS, NEW_LS);
}




