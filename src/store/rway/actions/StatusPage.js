import _ 				from 'underscore';
// import moment 			from 'moment';
import { ORDER_SCHEMA }	from './../constants/Order';
import { CHANGE_STEP } 	from './../constants/Step';
import { URL } 			from './../options';
import { escapeInjectionOBJ } from './../helpers/escapeInjection';
import { pint } 		from './../helpers/pint'
import isValid 			from 'srk/lib/helpers/isValid';
import { parseURL } 	from './../helpers/parseURL';
import SYNC 			from '../helpers/sync';
import { saveOrder }	from './../actions/Order';
import { STATUS_UPDATE, STATUS_REQUEST } from './../constants/Status';


// import { PASSENGERS_UPDATE } from './../constants/Passengers';
import { is_catalog } from './../helpers/is';
import { setHtmlClass } from './../helpers/setHtmlClass';



export function onChangeURLParamsStatus(store) {
	return (history, match) => {




		// //	если это окно открыто во фрейме,
		// //	то урл этого окна отправлю в родительское...
		// //	т.к. во фрейме должен быть только платежный шлюз
		// if ( window !== window.top ) {
		// 	document.body.style.opacity = '0';
		// 	window.top.location = window.location;
		// 	return null;
		// }




		store.dispatch({
			type: CHANGE_STEP,
			payload: 'status'
		});




        store.dispatch({
            type: STATUS_UPDATE,
            payload: {
				response: {},
                status: 'loading',
                msg: 'Проверка статуса...',
            }
        });



		let book_params = {
			idOrder: match.params.id,
			hash: match.params.hash,
		};


		book_params = escapeInjectionOBJ(book_params);




		const validate 	= isValid(book_params, ORDER_SCHEMA);
		if ( !validate.valid ) {

            store.dispatch({
                type: STATUS_UPDATE,
                payload: {
					response: {},
                    status: 'error',
                    msg: _.filter(validate.state, (it) => { return it } ).join(', '),
                }
            });

            return null;
		}



		saveOrder(book_params)(store.dispatch, store.getState);

		newCircle()(store.dispatch, store.getState);
	};
}















export function newCircle() {
	return async (dispatch, getState) => {

		let STATUS_INFO = {};


		try {
			STATUS_INFO = await loadStatus()(dispatch, getState);
		} catch ( fail ) {

			if ( fail.readyState !== 0 )	//	cancel
				dispatch({
					type: STATUS_UPDATE,
					payload: {
						response: fail,
						status	: 'error',
						msg		: 'Не удалось загрузить информацию о заказе. Попробуйте позже.',
					}
				});

			return null;
		}


		if ( !STATUS_INFO )	{
			dispatch({
				type: STATUS_UPDATE,
				payload: {
					response: STATUS_INFO,
					status	: 'error',
					msg		: 'Не удалось загрузить информацию, попытка будет повторена.',
				}
			});

			return null;
		}


		if ( STATUS_INFO['error'] && pint(STATUS_INFO['error']) )	{
			dispatch({
				type: STATUS_UPDATE,
				payload: {
					response: STATUS_INFO,
					status	: 'error',
					msg		: STATUS_INFO.msg,
				}
			});

			return null;
		}




		//	на случай обновления страницы...
		setHtmlClass( STATUS_INFO['source'] );


		
		// if ( is_operator() ) {
		// 	dispatch({
		// 		type: PASSENGERS_UPDATE,
		// 		payload: []
		// 	});
		// }










		
		
		let orderTo 			=	STATUS_INFO['order'][0],
			// orderBack		=	(( STATUS_INFO['order'][1] ) ? STATUS_INFO['order'][1] : false),
			continueWatching 	=	pint(STATUS_INFO['continueWatching']),
			countPeople 		=	orderTo['countPeople'].split(':');


		saveOrder({
			'e_mail'		:	orderTo['email'],
			// 'phone'			:	orderTo['phone'].substr(1),		// отключу т.к. не понятно что код а что номер да оно какгбе и не надо
			// 'phoneCode'		:	orderTo['phone'].substr(0, 1),	// отключу т.к. не понятно что код а что номер да оно какгбе и не надо
			'provider'		:	orderTo['provider'],
			'oferta'		:	STATUS_INFO['documents']['oferta'],
			'count_adult'	:	pint(countPeople[0]),
			'count_child'	:	pint(countPeople[1]),
			'count_baby'	:	pint(countPeople[2]),
		})(dispatch, getState);






		//	не буду сбивать с толку клиента...
		// //	Ну и сохраню поиск...
		// setSearchState({
		// 	from 	: STATUS_INFO['order']['from'],
		// 	to 		: STATUS_INFO['order']['to'],
		// 	date	: date_from.format('YYYY-MM-DD'),
		// })(dispatch, getState);



		dispatch({
			type: STATUS_UPDATE,
			payload: {
				response: STATUS_INFO,
				status	: ( continueWatching === 1 ) ? 'loading' 										: 'success',
                msg		: ( continueWatching === 1 ) ? (STATUS_INFO['payMsg'] || 'Проверка статуса...')	: (STATUS_INFO['payMsg'] || ''),
			}
		});


		//	задержка перед следующим запросом...
		let DELAY = ( STATUS_INFO['payTool'] === 'CC' ) ? 10000 : 15000;


		//	тут разберемся с рекурсией....
		//	буду ориентироваться по параметру continueWatching
		if ( !is_catalog() ) {
			if ( getState()['step'] === 'status' && continueWatching === 1 && STATUS_INFO['payStatus'] !== 1 && !STATUS_INFO['error'] ) {
				try{
					clearTimeout( window.timeoutId );
				} catch(e) {}
	
				window.timeoutId =  setTimeout(() => {
										newCircle()(dispatch, getState);
									}, DELAY);
			}
		}


	};
}









export function loadStatus() {
	return (dispatch, getState) => {

		let order 			= getState()['order'];
		let url_params 		= parseURL()['params'];
		let resultCode 		= url_params['resultCode'] 		|| '';
		let ticketingFirst 	= url_params['ticketingFirst'] 	|| '';


		return SYNC.fetch(
			{
				url: URL['getPayStatus'],
				type: 'POST',
				dataType: 'json',
				data: {
					loadId			:	order.idOrder,
					hash			:	order.hash,
					resultCode		:	resultCode,
					ticketingFirst	:	ticketingFirst,
					brand			:	window.brand,
				}
			},
			STATUS_REQUEST,
			true
		)

	};
}






