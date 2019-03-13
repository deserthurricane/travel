import { pint } from './../helpers/pint';




export const COUPES_REQUEST 		= 'COUPES_REQUEST';
export const COUPES_UPDATE 			= 'COUPES_UPDATE';
export const COUPES_CURRENT_UPDATE 	= 'COUPES_CURRENT_UPDATE';
export const COUPES_CURRENT_BACK_UPDATE 	= 'COUPES_CURRENT_BACK_UPDATE';










//	initial state
/**
	значение состояния:
		status	: 'loading',	//	loading;  error;  success;	many_stations;    (many_stations - уточнение станции)
		msg		: '',			//	для loading - текст загрузки;  для error - текст ошибки;  для success - ничего не значит
		list	: [],			//	массив поездов
*/
export const COUPES = {
	status: '',
	msg: '',
	list: [],
	list_back: [],
	info: {},
	info_back: {},
	current: null,
	current_back: null,
	sorting: {
		price: 'DESC',
	},
	filter: {
		coupe_type 	: ["Все"]
	}
};




export const COUPE_CHECK_SELECT_PLACES_PAGE = {
	number: {
		required: true,
		message: 'Не выбран вагон',
		pattern: /^[0-9]+$/,
	},

	selectedPlaces: {
		type: 'object',
		required: true,
		message: 'Выбраны не все места',
		minItems: 1,
		conform: function(val, obj, field, dobProps) {
			
			if ( val.length < (pint(dobProps.count_adult) + pint(dobProps.count_child)) )
				return true;
		}
	}
}