// import moment from 'moment';
// import { MOMENT_FORMATS }	from './../options';
// import $ from 'jquery';
import { pint } from './../helpers/pint';

import cookie 	from 'react-cookies';

export const SAVE_ORDER = 'SAVE_ORDER';
export const BOOK_ORDER = 'BOOK_ORDER';
export const CANCEL_ORDER = 'CANCEL_ORDER';
export const PAY_TICKET = 'PAY_TICKET';
export const GET_CAB_LINK = 'GET_CAB_LINK';







//	initial state
export const ORDER = {
	provider: '', //	Поставщик...

	number_tt	: cookie.load('opr_tt_number') 	|| '', //	Номер торговой точки
	email_tt	: cookie.load('opr_tt_email') 	|| '', //	Почта точки

	count_adult: 1,
	count_child: 0,
	count_baby: 0,

	e_mail: '',
	phone: '',
	phoneCode: '7',
	sclub: '',
	PromoCode: '',
	I_Agree: true,
	Subscribe: true,

	idOrder: '', //	ID транзакции УФС
	hash: '', //	хеш для получения информации о билетах...

	oferta: '',
};














//	https://github.com/flatiron/revalidator

export const ORDER_SCHEMA = {
	
	peoples: {
		type: 'string',
		required: true,
		pattern: /^[0-4]{1}:[0-4]{1}:[0-4]{1}$/,
		message: 'Проверьте количество пассажиров',
	},


	provider: {
		required: true,
		message: 'Не указан поставщик',
	},
	

	e_mail: {
		required: true,
		type: 'string',
		format: 'email',
		messages: {
	      type: 'Проверьте правильность почты',
	      format: 'Проверьте правильность почты',
		  required: 'Укажите почту.',
	    }
	},


	phoneCode: {
		required: true,
		message: 'Проверьте код телефона',
		pattern: /^[0-9]{1,5}$/,
	},


	phone: {
		required: true,
		message: 'Проверьте номер телефона',
		pattern: /^[0-9()-\s]*$/,
	},


	PromoCode: {
		type: 'string',
		required: false,
		message: ' ',
	},

	sclub: {
		type: 'string',
		required: false,
		message: 'Проверьте правильность ввода номера, расположенного на обороте под штрих кодом, и повторите попытку.',
		conform: function(val, obj) {
			val =  val ? val.trim().replace(/ /g, '') : '';

			if ( val ) {

				var reg = /^(298|296)[0-9]{10}$/;
				if ( !reg.test(val) )
					return 'Проверьте правильность ввода номера, расположенного на обороте под штрих кодом, и повторите попытку.';

				//	Алгоритм спижженный у Кирилла из Flight.js
				var ean13 		= val;
				var ean 		= pint(ean13 / 10);
				var nechetres 	= 0;
				var chetres 	= 0;

				while (ean > 0) {
					nechetres 	+= 	ean % 10 * 3;
					ean 		= 	pint(ean / 10);
					chetres 	+= 	ean % 10;
					ean 		= 	pint(ean / 10);
				}

				if ((ean13 % 10) !== ((10 - ((chetres + nechetres) % 10)) % 10))
					return 'Проверьте правильность ввода номера, расположенного на обороте под штрих кодом, и повторите попытку!';
	            //	*** * ***
	        }

		}
	},


	I_Agree: {
		type: 'boolean',
		required: true,
		message: 'Для продолжения оформления билета вы должны согласиться с условиями.',
		conform: function(val, obj) {
			return !val;
		}
	},

	Subscribe: {
		type: 'boolean',
		required: false,
		message: ' ',
	},


	oferta: {
		type: 'string',
		required: false,
		message: ' ',
	},


	idOrder: {
		required: true,
		message: 'Проверьте номер заказа',
		pattern: /^[0-9]{1,9}$/,
	},



	hash: {
		required: true,
		message: 'Проверьте хеш заказа',
		pattern: /^[0-9a-zA-Z]{32}$/,
	},

};
