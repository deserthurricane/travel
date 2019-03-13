import update from 'immutability-helper';


import _ from 'underscore';
import { COUPES_UPDATE, COUPES, COUPES_CURRENT_UPDATE, COUPES_CURRENT_BACK_UPDATE } from './../constants/Coupes';


const initialSate = {...COUPES};

export default function coupes(state = initialSate, action) {

	// eslint-disable-next-line
	switch (action.type) {

		case COUPES_UPDATE:


			// нужно заменить all на все
			if ( action.payload.filter && action.payload.filter.coupe_type && action.payload.filter.coupe_type.length ) {	
				let inddd = _.indexOf(action.payload.filter.coupe_type, 'all');
				if ( inddd !== -1 )
					action.payload.filter.coupe_type[ inddd ] = 'все';
			}


			return update(state, { $merge: action.payload }); // eslint-disable-next-line
		break;


		case COUPES_CURRENT_UPDATE:

			return update(state, {
				list : {[action.payload.index]: {$merge : action.payload.update}}
			});
			// eslint-disable-next-line
		break;

		case COUPES_CURRENT_BACK_UPDATE:

			return update(state, {
				list_back : {[action.payload.index]: {$merge : action.payload.update}}
			});
			// eslint-disable-next-line
		break;


	}

	return state;
}
