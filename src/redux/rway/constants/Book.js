export const BOOK_REQUEST 		= 'BOOK_REQUEST';
export const BOOK_UPDATE 		= 'BOOK_UPDATE';



//	initial state
/**
	значение состояния:
		status	: 'loading',	//	loading;  error;  success;
		msg		: '',			//	для loading - текст загрузки;  для error - текст ошибки;  для success - ничего не значит
*/
export const BOOK = {
	response: {},
	status: '',
	msg: '',
};
