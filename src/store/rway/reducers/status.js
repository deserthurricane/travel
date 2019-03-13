import update from 'immutability-helper';

// import $ from 'jquery';
// import _ from 'underscore';
import { STATUS_UPDATE, STATUS } from './../constants/Status';

const initialSate = {...STATUS};

export default function status(state = initialSate, action) {

	// eslint-disable-next-line
	switch (action.type) {

		case STATUS_UPDATE:
			return update(state, { $merge: action.payload }); // eslint-disable-next-line
		break;
	}

	return state;
}
