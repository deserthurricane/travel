import { SERVICES_UPDATE, SERVICES_REQUEST, SERVICE_UPDATE } from './../constants/Services';

import SYNC from '../helpers/sync';
import _ from 'underscore';
import { URL } from './../options';
// import Modal 			from 'srk/lib/components/Modal';


import { SERVICES_SET } from './../constants/Services';
import { pfloat } from './../helpers/pint';
import { getCurrentCoupe } from './../selectors/Coupes';






export function loadServices( endDate = '' ) {
	return (dispatch, getState) => {
		
		let new_services 	= [];
		let GET_STATE		= getState();
		let order 			= GET_STATE['order'];
		let old_services	= GET_STATE['services']['list'];


		dispatch({
			type: SERVICES_UPDATE,
			payload: {
				status: 'loading',
				msg: 'Загрузка страховых продуктов...',
			}
		});

		// Modal.loading('Загрузка информации о страховке...');

		SYNC.fetch({
				url: URL['getServices'],
				type: 'POST',
				dataType: 'json',
				data: {
					id			: order['idOrder'],
					source		: window.source,
					endDate		: endDate,
					brand		: window.brand,
				}
			},
			SERVICES_REQUEST,
			true
		).then(
			getServices => {
				//	SUCCESS

				// Modal.hide();

				if (!getServices || getServices.error || !getServices.length) {

					dispatch({
						type: SERVICES_UPDATE,
						payload: {
							status: 'error',
							msg: getServices.msg || '',
							list: [],
						}
					});

				} else {


					
					_.each(getServices, (service) => {

						let find_service = _.findWhere(old_services, {id:service['id'], type:service['type']});
						if ( find_service )
							service['state'] = find_service['state'];

						service['title_short'] = service['title_short'].replace(/<\/?[^>]+>/gi, ' ');
						service['state'] = ( service['state'] === 1 || service['state'] === true ) ? true : false;

						new_services.push(service);
					});



                    dispatch({
            			type: SERVICES_UPDATE,
            			payload: {
            				status: 'success',
            				msg: '',
            				list: new_services,
            			}
            		});


				}
			},
			response => {

				//	ERROR
				if (response.readyState !== 0) {
					//	not abort
					dispatch({
						type: SERVICES_UPDATE,
						payload: {
							status: 'error',
							msg: response.msg || 'Не удалось выполнить запрос. Попробуйте повторить позже.',
							list: [],
						}
					});
				}

			}
		);


	};
}







export function changeService(serv, update) {
	return (dispatch, getState) => {
		let index 	= _.findIndex(getState()['services']['list'], {id: serv['id']});

		if ( index === -1 )
			return null;

		dispatch({
			type: SERVICE_UPDATE,
			payload: {
				index: index,
				update: update
			}
		});

		//	если изменился период страхования, то перегружу цену страховки...
		if ( update['endDate'] && update['endDate'].trim() )
			loadServices( update['endDate'] )(dispatch, getState);

	};
}










export function bookServices() {
	return (dispatch, getState) => {

		let order 		= getState()['order'];
		let services 	= getState()['services']['list'];

		return SYNC.fetch(
			{
				url: URL['bookServices'],
				type: 'POST',
				dataType: 'json',
				data: {
					loadId		:	order.idOrder,
					hash		:	order.hash,
					services	:	services,
					brand		:	window.brand,
				}
			},
			SERVICES_REQUEST,
			true
		)

	};
}









//	включу при необходимости постельное белье...
export function loadBeddingServices() {
	return (dispatch, getState) => {


		let BEDDING 	= [];
		let STATE		= getState();
		let order		= STATE['order'];
		let coupe		= getCurrentCoupe(STATE, {direction: 'to'});
		let coupe_back	= getCurrentCoupe(STATE, {direction: 'back'});
		let len			= order.count_adult + order.count_child;

		if ( !coupe )
			return null;
			
		if ( coupe['bl'] )
			BEDDING.push({
				type 			: 'Bedding',
				state 			: true,
				price 			: pfloat( coupe['servicePrice'] ) * len,
				title 			: 'Постельное белье туда',
				title_short 	: 'Постельное белье туда:',
				descr 			: ( len <= 1 ) ? '<b>На одного пассажира</b>' : '<b>На ' + len + ' пассажира</b>',
				url				: '',
				headerTitle		: 'стоимость белья для всех пассажиров',
				id				: 777,
			});

		

		
		if ( coupe_back && coupe_back['bl'] ) {

			// логика чтоб туда отдельно обратно отдельно
			BEDDING.push({
				type 			: 'Bedding',
				state 			: true,
				price 			: pfloat( coupe_back['servicePrice'] ) * len,
				title 			: 'Постельное белье обратно',
				title_short 	: 'Постельное белье обратно:',
				descr 			: ( len <= 1 ) ? '<b>На одного пассажира</b>' : '<b>На ' + len + ' пассажира</b>',
				url				: '',
				headerTitle		: 'стоимость белья для всех пассажиров',
				id				: 888,
			});

			
			//	логика чтоб можно было купить билье туда-обратно одновременно
			// if ( BEDDING.length ) {
			// 	BEDDING[0]['price'] 		+= pfloat( coupe_back['servicePrice'] ) * len;
			// 	BEDDING[0]['title'] 		= 'Постельное белье туда/обратно';
			// 	BEDDING[0]['title_short'] 	= 'Постельное белье туда/обратно:';
			// 	BEDDING[0]['id'] 			= 999;
			// }
			// else
			// {
			// 	BEDDING.push({
			// 		type 			: 'Bedding',
			// 		state 			: true,
			// 		price 			: pfloat( coupe_back['servicePrice'] ) * len,
			// 		title 			: 'Постельное белье обратно',
			// 		title_short 	: 'Постельное белье обратно:',
			// 		descr 			: ( len <= 1 ) ? '<b>На одного пассажира</b>' : '<b>На ' + len + ' пассажира</b>',
			// 		url				: '',
			// 		headerTitle		: 'стоимость белья для всех пассажиров',
			// 		id				: 888,
			// 	});
			// }
		}
		

		

		dispatch({
			type: SERVICES_SET,
			payload: {
				status: 'success',
				msg: '',
				list: BEDDING,
			}
		});

	};
}
