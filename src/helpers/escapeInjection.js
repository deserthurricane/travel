import _ from 'underscore';
import { pint } from './../helpers/pint';

export function escape_(val) {

	switch (typeof val) {

	case 'string':

		try {
			val = decodeURIComponent(val.trim());
		} catch (error) {
			val = '';
		}

		val = val
			.replace(/<\/?[^>]+>/gi, '')
			.replace('"', '')
			.replace('\'', '')
			.replace('<', '')
			.replace('>', '')
			.replace('+', '')
			.replace('script', '');

		val = _.escape(val);
		break;

	case 'number':
		val = pint(val);
		break;

	case 'object':
		val = escapeInjectionOBJ(val);
		break;
	default:
		val = false;
	}

	return val;
}





//	Клонирование объекта
export function escapeInjectionOBJ(obj) {

	_.each(obj, function(val, key) {
		obj[key] = escape_(val);
	});

	return obj;
}




//	отфильтрую из обьекта ненужные данные...
export function obj_filter(obj, filters) {

	let new_obj = {};
	_.each(obj, (val, key) => {
		if ( _.indexOf(filters, key)+1 ) new_obj[key] = val;
	});

	return new_obj;
}
