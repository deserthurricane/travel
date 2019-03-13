import { HISTORY_OF_SERACH_DEL, HISTORY_OF_SERACH_ADD } from './../constants/historyOfSearch';

export function addHistorySearch(query) {

	return (dispatch, getState) => {

		dispatch({
			type: HISTORY_OF_SERACH_ADD,
			payload: {
				from: query['from'],
				to: query['to'],
				date: query['date'],
				backDate: query['backDate'],
				hash: query['from'] + '/' + query['to'] + '/' + query['date'] + '/' + query['backDate']
			}
		});

	};

}

export function delHistorySearch(query) {

	return (dispatch, getState) => {

		dispatch({
			type: HISTORY_OF_SERACH_DEL,
			payload: query
		});

	};

}
