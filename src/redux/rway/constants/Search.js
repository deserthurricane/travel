import moment from 'moment';
import { MOMENT_FORMATS } from '../options';

export const SEARCH_CHANGE = 'SEARCH_CHANGE';
export const SEARCH_RESET = 'SEARCH_RESET';
export const SEARCH_STORAGE = 'SEARCH_STORAGE';

//	initial state
export const SEARCH = {
	from: '', 		//	МОСКВА
	to: '', 		//	САНКТ-ПЕТЕРБУРГ
	// fromCode: '', 	//	2000000
	// toCode: '', 	//	2004000

	errors:{},	//	хранилище ошибок

	date: moment().format(MOMENT_FORMATS['DATE_FORMAT']), //	23.04.2017
	backDate: '',
};


//	https://github.com/flatiron/revalidator

export const SEARCH_SCHEMA = {

	from: {
		type: 'string',
		required: true,
		message: 'Проверьте город отправления',
		conform: function(val, obj) {
			return !(val && (!obj.to || obj.to !== val));
		}
	},

	to: {
		type: 'string',
		required: true,
		message: 'Проверьте город прибытия',
		conform: function(val, obj) {
			return !(val && (!obj.from || obj.from !== val));
		}
	},

	date: {
		type: 'string',
		required: true,
		message: 'Дата отправления должна быть не позднее сегодняшнего дня',
		conform: function(val, obj) {
			let date = moment(val, MOMENT_FORMATS['DATE_FORMAT']);
			let now = moment();

			return (!date || date.diff(now, 'days') < 0);
		}
	},

	backDate: {
		type: 'string',
		message: 'Дата возврата должна быть не позднее даты отправления',
		required: false,
		conform: function (val, obj) {

			if ( !val || !val.trim() ) return false;

			let date 		= moment(val, MOMENT_FORMATS['DATE_FORMAT']);
			let now 		= moment(obj.date, MOMENT_FORMATS['DATE_FORMAT']);
			let date_diff 	= date.diff(now, 'days');

			return ( date_diff < 0 );
		}
	}

};
