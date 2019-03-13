import _ from 'underscore';
// import moment from 'moment';

import { ORDER_SCHEMA }	from './../constants/Order';
import { BOOK_REQUEST } from './../constants/Book';
import { CHANGE_STEP } from './../constants/Step';

import { URL, STATUSES } from './../options';

import { escapeInjectionOBJ } from './../helpers/escapeInjection';
import { pint } from './../helpers/pint'

import isValid from 'srk/lib/helpers/isValid';

import SYNC from '../helpers/sync';

import { BOOK_UPDATE } 		from './../constants/Book';

import { saveOrder }		from './../actions/Order';
import { loadServices } 	from './Services';
import { setHtmlClass } from './../helpers/setHtmlClass';
import { SERVICES_SET, INITIAL_STATE } from './../constants/Services';






export function onChangeURLParamsBook(store) {
	return async (history, match) => {


		store.dispatch({
			type: CHANGE_STEP,
			payload: 'book'
		});


        store.dispatch({
            type: BOOK_UPDATE,
            payload: {
				response: {},
                status: 'loading',
                msg: 'Загрузка брони...',
            }
        });




		store.dispatch({
			type: SERVICES_SET,
			payload: INITIAL_STATE
		});




		let book_params = {
			idOrder: match.params.id,
			hash: match.params.hash,
		};



		book_params = escapeInjectionOBJ(book_params);




		const validate 	= isValid(book_params, ORDER_SCHEMA);
		if ( !validate.valid ) {

            store.dispatch({
                type: BOOK_UPDATE,
                payload: {
					response: {},
                    status: 'error',
                    msg: _.filter(validate.state, (it) => { return it } ).join(', '),
                }
            });

            return null;
		}



		saveOrder(book_params)(store.dispatch, store.getState);





		let ORDER_INFO = {};

		try {
		    ORDER_INFO = await loadBook()(store.dispatch, store.getState)
		} catch ( fail ) {

			store.dispatch({
                type: BOOK_UPDATE,
                payload: {
					response: fail,
                    status	: 'error',
                    msg		: 'Не удалось загрузить информацию о заказе. Попробуйте позже.',
                }
            });

			return null;
		}





		if ( !ORDER_INFO )	{
			store.dispatch({
                type: BOOK_UPDATE,
                payload: {
					response: ORDER_INFO,
                    status	: 'error',
                    msg		: 'Не удалось загрузить информацию',
                }
            });

			return null;
		}




		if ( ORDER_INFO['error'] && pint(ORDER_INFO['error']) )	{
			store.dispatch({
                type: BOOK_UPDATE,
                payload: {
					response: ORDER_INFO,
                    status	: 'error',
                    msg		: ORDER_INFO.msg,
                }
            });

			return null;
		}





		if ( !ORDER_INFO['order'] )	{
			store.dispatch({
                type: BOOK_UPDATE,
                payload: {
					response: ORDER_INFO,
                    status	: 'error',
                    msg		: 'Не удалось загрузить информацию',
                }
            });

			return null;
		}


		//	на случай обновления страницы...
		setHtmlClass( ORDER_INFO['source'] );









		let orderTo 	=	ORDER_INFO['order'][0],
			// orderBack	=	(( ORDER_INFO['order'][1] ) ? ORDER_INFO['order'][1] : false),
			countPeople =	orderTo['countPeople'].split(':');


		saveOrder({
			'e_mail'		:	orderTo['email'],
			// 'phone'			:	orderTo['phone'].substr(1),		// отключу т.к. не понятно что код а что номер да оно какгбе и не надо
			// 'phoneCode'		:	orderTo['phone'].substr(0, 1),	// отключу т.к. не понятно что код а что номер да оно какгбе и не надо
			'provider'		:	orderTo['provider'],
			'oferta'		:	ORDER_INFO['documents']['oferta'],
			'count_adult'	:	pint(countPeople[0]),
			'count_child'	:	pint(countPeople[1]),
			'count_baby'	:	pint(countPeople[2]),
		})(store.dispatch, store.getState);



		



		if ( [4,5,6,7].indexOf( pint(orderTo['status']) )+1 )	{
			store.dispatch({
                type: BOOK_UPDATE,
                payload: {
					response: ORDER_INFO,
                    status	: 'error',
                    msg		: STATUSES[ pint(orderTo['status']) ],
                }
            });

			return null;
		}




		//	Загрузка страховок...
		try {
		    await loadServices('')(store.dispatch, store.getState);	//	там внутри все само сохранится в редакс...
		} catch ( fail ) {}





		store.dispatch({
			type: BOOK_UPDATE,
			payload: {
				response: ORDER_INFO,
				status	: 'success',
				msg		: '',
			}
		});


	};
}
















export function loadBook( params = {} ) {
	return (dispatch, getState) => {

		let order 			= getState()['order'];
		let checkPayStatus 	= ( params.checkPayStatus !== undefined ) ? params.checkPayStatus : true;

		return SYNC.fetch(
			{
				url: URL['getOrderInfo'],
				type: 'POST',
				dataType: 'json',
				data: {
					checkPayStatus 	: 	checkPayStatus,
					loadId			:	order.idOrder,
					hash			:	order.hash,
					brand			:	window.brand,
				}
			},
			BOOK_REQUEST,
			true
		)

	};
}
