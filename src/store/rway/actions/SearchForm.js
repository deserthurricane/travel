

import { SEARCH_CHANGE } from './../constants/Search';



export function setSearchState(query) {
	return (dispatch, getState) => {

		//	сохраню стейт поиска
		dispatch({
			type: SEARCH_CHANGE,
			payload: query
		});

	};
}
