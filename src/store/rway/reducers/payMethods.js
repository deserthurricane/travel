import { PAY_METHODS_UPDATE, INITIAL_STATE } from './../constants/payMethods';

import update from 'immutability-helper';
// import $ from 'jquery';

const initialState = {...INITIAL_STATE};   //  start trains coupes passengers book finish

export default function payMethods(state = initialState, action) {

	// eslint-disable-next-line
	switch (action.type) {
		case PAY_METHODS_UPDATE:
			return update(state, { $merge: action.payload }); // eslint-disable-next-line
		break
	}

	return state;
}
