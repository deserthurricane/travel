import { PASSENGERS_UPDATE, ONE_PASSENGERS_UPDATE, INITIAL_STATE } from './../constants/Passengers';

import update from 'immutability-helper';

// import $ from 'jquery';


const initialState = [...INITIAL_STATE];


export default function passengers(state = initialState, action) {

	// eslint-disable-next-line
	switch (action.type) {
		case PASSENGERS_UPDATE:
			return update(state, { $set: action.payload }); // eslint-disable-next-line
		break;
		case ONE_PASSENGERS_UPDATE:

			return update(state, {
				[action.payload.index] : {$merge : action.payload.update}
			});


			// state[ action.payload.index ] = $.extend(true, state[ action.payload.index ], action.payload.update);
			// return state;


			// for(let sv in action.payload.update)
			// 		state[ action.payload.index ][ sv ] = action.payload.update[ sv ];
            //
			// return $.extend(true, [], state);

			// eslint-disable-next-line
		break;
	}

	return state;
}
