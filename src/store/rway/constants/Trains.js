export const TRAINS_REQUEST = 'TRAINS_REQUEST';
export const TRAINS_UPDATE = 'TRAINS_UPDATE';
export const TRAIN_UPDATE = 'TRAIN_UPDATE';



//	initial state
/**
	значение состояния:
		status	: 'loading',	//	loading;  error;  success;	many_stations;    (many_stations - уточнение станции)
		msg		: '',			//	для loading - текст загрузки;  для error - текст ошибки;  для success - ничего не значит
		list	: [],			//	массив поездов
*/
export const TRAINS = {
	status: '',
	msg: '',
	list: [],
	list_back: [],
	sorting: {
		isoDateFrom: 'DESC',
	},
	filter: {
		coupe_type 	: ["Все"]
	},

	other_date_on_trains: [],	//	подбор этих поездов на соседние даты...
};
