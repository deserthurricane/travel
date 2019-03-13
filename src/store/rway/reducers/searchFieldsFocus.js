import { CHANGE_searchFieldsFocus } from './../constants/searchFieldsFocus';

import update from 'immutability-helper';


const initialState = false;

export default function searchFieldsFocus(state = initialState, action) {

	// eslint-disable-next-line
	switch (action.type) {
		case CHANGE_searchFieldsFocus:
			return update(state, { $set: action.payload }); // eslint-disable-next-line
		break
	}

	return state;
}
