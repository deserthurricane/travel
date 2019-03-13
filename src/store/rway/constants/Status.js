export const STATUS_REQUEST 	= 'STATUS_REQUEST';
export const STATUS_UPDATE 		= 'STATUS_UPDATE';



//	initial state
/**
	значение состояния:
		status	: 'loading',	//	loading;  error;  success;
		msg		: '',			//	для loading - текст загрузки;  для error - текст ошибки;  для success - ничего не значит
*/
export const STATUS = {
	response: {},
	status: '',
	msg: '',
};
