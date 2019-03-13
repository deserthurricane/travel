import { ROUTING } from './../constants/Router';


// метод для программного перехода по ссылке...

export function goToURL(url) {

	return (dispatch, getState) => {

		//	отправляю на новый роут (поиска поездов)
		dispatch({
			type: ROUTING,
			payload: {
				method: 'push',
    			nextUrl: url    //	ссылка на страницу поездов
			}
		});

	};

}
