import { ORDER, SAVE_ORDER } from './../constants/Order';

import update from 'immutability-helper';
import cookie from 'react-cookies';
// import $ from 'jquery';

import { is_online, is_operator } from './../helpers/is';
import { setHtmlClass } from './../helpers/setHtmlClass';



let initialState = update({}, { $merge: ORDER });



//	загружу данные из кук...
if ( is_online() )
	initialState = update(initialState, {
										$merge: cookie.load(SAVE_ORDER) || {}
									}
						);




if ( is_operator() ) {
	initialState['number_tt']	= cookie.load('opr_tt_number')  || ''; //	Номер торговой точки
	initialState['email_tt']	= cookie.load('opr_tt_email')   || ''; //	Почта точки
}






export default function order(state = initialState, action) {

	// eslint-disable-next-line
	switch (action.type) {
		case SAVE_ORDER:

			if ( action.payload['source'] && action.payload['source'].trim() )
				setHtmlClass( action.payload['source'] );

			return update(state, { $merge: action.payload }); // eslint-disable-next-line
		break

	}

	return state;
}
