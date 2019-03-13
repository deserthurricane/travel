import update from 'immutability-helper';

// import $ from 'jquery';
// import _ from 'underscore';
import { BOOK_UPDATE, BOOK } from './../constants/Book';

const initialSate = {...BOOK};

export default function book(state = initialSate, action) {

	// eslint-disable-next-line
	switch (action.type) {

		case BOOK_UPDATE:
			return update(state, { $merge: action.payload }); // eslint-disable-next-line
		break;
	}

	return state;
}
