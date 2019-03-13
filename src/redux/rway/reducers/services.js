import { SERVICES_UPDATE, INITIAL_STATE, SERVICES_UPDATE_LIST, SERVICE_UPDATE, SERVICES_SET } from './../constants/Services';

import update from 'immutability-helper';
// import $ from 'jquery';

const initialState = INITIAL_STATE;   //  start trains coupes passengers book finish

export default function services(state = initialState, action) {

	// eslint-disable-next-line
	switch (action.type) {
		case SERVICES_SET:
			return update(state, { $set: action.payload }); // eslint-disable-next-line
		break
		case SERVICES_UPDATE:
			return update(state, { $merge: action.payload }); // eslint-disable-next-line
		break
		case SERVICES_UPDATE_LIST:
			state.list = action.payload;
			return {...state}; // eslint-disable-next-line
		break
		case SERVICE_UPDATE:

			return update(state, {
				list : {[action.payload.index]: {$merge : action.payload.update}}
			});

		// eslint-disable-next-line
		break
	}

	return state;
}
