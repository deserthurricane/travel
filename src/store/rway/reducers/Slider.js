
import update from 'immutability-helper';

// import $ from 'jquery';
// import _ from 'underscore';
import { SLIDERS_UPDATE, SLIDERS } from './../constants/Slider';

const initialSate = [...SLIDERS];

export default function Slider(state = initialSate, action) {

	// eslint-disable-next-line
	switch (action.type) {

		case SLIDERS_UPDATE:
			return update(state, { $set: action.payload }); // eslint-disable-next-line
		break;
	}

	return state;
}
