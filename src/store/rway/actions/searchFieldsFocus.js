import { CHANGE_searchFieldsFocus } from './../constants/searchFieldsFocus';

export function change_searchFieldsFocus(state) {
	return (dispatch, getState) => {

		//	сохраню стейт поиска
		dispatch({
			type: CHANGE_searchFieldsFocus,
			payload: state
		});

	};
}
