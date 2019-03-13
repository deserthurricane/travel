import { createSelector } from 'reselect';

import { pint } from './../helpers/pint.js';
import _ from 'underscore';

const getList 			= state => state.coupes.list;
const getListBack		= state => state.coupes.list_back;
const getCurrent 		= state => state.coupes.current;
const getCurrent_back 	= state => state.coupes.current_back;
const getFilter 		= state => state.coupes.filter;
const getSorting 		= state => state.coupes.sorting;
const getPass 			= state => [state.order.count_adult, state.order.count_child, state.order.count_baby];

const getId				= (state, props) => props.id;
const getDirection		= (state, props) => props.direction || 'to';





//	фильтр вагонов по доступному количеству мест для конкретного заказа
export const getFilteredByPassCoupes = createSelector([ getList, getListBack, getPass, getDirection ], (list, listBack, pass, direction) => {
	//	pass - array(adylt, child, baby)

	let adt_chd = pint(pass[0]) + pint(pass[1]);

	if ( direction === 'to' ) 
		return _.filter(list, (coupe) => coupe['places'].length >= adt_chd );
	else
		return _.filter(listBack, (coupe) => coupe['places'].length >= adt_chd );
});







export const getFilteredCoupes = createSelector([ getFilteredByPassCoupes, getFilter ], (list, filters ) => {

	if ( !_.keys(filters).length )
		return list;

	const coupes = [];

	_.each(list, coupe => {
		let is_it = false;

		for (let key in filters) {

			const val = _.map(filters[key], (filt) => filt.toLowerCase() );

			// eslint-disable-next-line
			switch (key) {
				case 'coupe_type':

					let intersection 	= _.intersection([coupe['type'].toLowerCase(), 'all', 'все'], val);				//	ищу общие в списке выдачи и в списке из фильтра...
					if ( intersection.length ) {
						is_it = true;
						break;
					}

				break;
			}
		};

		if (is_it) coupes.push(coupe);
	});


	return coupes;
});






export const getSortCoupe = createSelector([ getFilteredCoupes, getSorting ], (list, sorting) => {

	let sorted = [...list];

	if ( !_.keys(sorting).length ) 
		return sorted;


	for (let sort in sorting) {

		const key = sort;
		const val = sorting[key]; //	ASC  DESC
		const zn = val === 'ASC' ? -1 : 1;

		if ( !val.trim() )
			continue;
			
		// eslint-disable-next-line
		switch (key) {
			case 'price': //	сортировка по цене
				sorted = _.sortBy(sorted, coupe => zn * coupe['price']); //	буду смотреть по минимальной цене
			break;
		}

	}

	return sorted;
});







export const getCoupesTypesByCoupes = createSelector([ getList, getListBack, getDirection ], (list, listBack, direction) => {
	let trainTypes = {
		'все': 1
	};

	let list_coupe = ( direction === 'to' ) ? [...list] : [...listBack];

	_.each(list_coupe, (model) => {
		trainTypes[ model['type'].toLowerCase() ] = 1;
	});

	return _.keys(trainTypes);
});





export const getCoupeByID = createSelector([ getList, getListBack, getId, getDirection ], (coupes, coupesBack, id, direction) => {
	if ( direction === 'to' )
		return _.findWhere(coupes, {id: id}) || false;
	else
		return _.findWhere(coupesBack, {id: id}) || false;
});





export const getCurrentCoupe = createSelector([ getList, getListBack, getCurrent, getCurrent_back, getDirection ], (coupes, coupesBack, current, current_back, direction) => {
	if ( direction === 'to' )
		return _.findWhere(coupes, {id: current}) || false;
	else
		return _.findWhere(coupesBack, {id: current_back}) || false;
});
