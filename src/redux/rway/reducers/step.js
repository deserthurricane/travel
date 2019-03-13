import { CHANGE_STEP } from './../constants/Step';

import update from 'immutability-helper';
// import $ from 'jquery';

const initialState = 'start';   //  start trains coupes passengers book status

export default function step(state = initialState, action) {

	// eslint-disable-next-line
	switch (action.type) {
		case CHANGE_STEP:
			return update(state, { $set: action.payload }); // eslint-disable-next-line
		break
	}

	return state;
}
