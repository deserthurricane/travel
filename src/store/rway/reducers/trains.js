import update from 'immutability-helper';

// import $ from 'jquery';
import { TRAINS, TRAINS_UPDATE, TRAIN_UPDATE } from './../constants/Trains';
import { indexOfObj } from './../helpers/indexOfObj';

const initialSate = {...TRAINS};

export default function trains(state = initialSate, action) {

	// eslint-disable-next-line
	switch (action.type) {
	case TRAINS_UPDATE:
		return update(state, { $merge: action.payload }); // eslint-disable-next-line
	break;
	case TRAIN_UPDATE:


		let i = indexOfObj(state.list, {trainNumApi: action.payload.trainNumApi});

		if ( i+1 )
			return update(state, {
				list : {[i]: {$merge : action.payload.update}}
			});
	


	// eslint-disable-next-line
	break;
	}

	return state;
}
