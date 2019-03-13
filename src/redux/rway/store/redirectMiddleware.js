import { history } from '../constants/History';
import { ROUTING } from '../constants/Router';

export const redirect = store => next => action => {

	if (action.type === ROUTING)
		history[action.payload.method](action.payload.nextUrl);

	return next(action);

};
