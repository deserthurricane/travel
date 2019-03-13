import { createSelector } from 'reselect';
import _ from 'underscore';
import $ from 'jquery';

const getList 		= state => state.trains.list;
const getBackList 	= state => state.trains.list_back;
const getFilter 	= state => state.trains.filter;
const getSorting 	= state => state.trains.sorting;
const getDirection	= (state, props) => props.direction || 'to';



export const getFilteredTrains = createSelector([ getList, getBackList, getFilter, getDirection ], (list, list_back, filters, direction) => {

	if ( !_.keys(filters).length )
		return list;

	const trains = [];
	let TRINS_LIST = ( direction === 'to' ) ? list : list_back;

	_.each(TRINS_LIST, train => {
		let is_it = false;

		for (let key in filters) {

			const val = _.map(filters[key], (filt) => filt.toLowerCase() );

			// eslint-disable-next-line
			switch (key) {
				case 'coupe_type': //	филтр по наличию типа купе...

					let types_map 		= _.map(train['coupes'], (coupe) => coupe['type'].toLowerCase() );	//	список всех типов купе в данной выдаче
					let intersection 	= _.intersection([...types_map, 'все', 'all'], val);				//	ищу общие в списке выдачи и в списке из фильтра...

					if ( intersection.length ) {
						is_it = true;
						break;
					}

				break;
			}
		}

		if (is_it) trains.push(train);
	});

	return trains;
});







export const getSortTrains = createSelector([ getFilteredTrains, getSorting ], (list, sorting) => {

	if ( !_.keys(sorting).length )
		return list;

	let sorted = $.extend(true, [], list);


	for (let sort in sorting) {

		const key 	= sort;
		const val 	= sorting[key]; //	ASC  DESC
		const zn 	= val === 'ASC' ? -1 : 1;

		if ( !val.trim() )
			continue;

		// eslint-disable-next-line
		switch (key) {
			case 'price': //	сортировка по цене
				sorted = _.sortBy(sorted, train => zn * train['coupes'][0]['price']); //	буду смотреть по первому купе
			break;
			case 'isoDateFrom':
				sorted = _.sortBy(sorted, train => zn * train['isoDateFrom'].unix()); //	время отправления
			break;
			case 'isoDateTo':
				sorted = _.sortBy(sorted, train => zn * train['isoDateTo'].unix()); //	время прибытия
			break;
			case 'coupes_length':
				sorted = _.sortBy(sorted, train => -1 * zn * train['coupes'].length); //	Количество купе - тут нужна сортировка наоборот
			break;
			case 'timeInWay':
				sorted = _.sortBy(sorted, train => zn * train['timeInWay'].asMilliseconds()); //	время в пути
			break;
			case 'places':
				sorted = _.sortBy(sorted, train => -1 * zn * _.reduce(train['coupes'], (m, i) => m + i['places'], 0)); //	свободные места
			break;
		}


	}

	return sorted;

});







// export const getSortTrainsBack = createSelector([ getBackList, getSorting ], (list, sorting) => {

// 	if ( !_.keys(sorting).length )
// 		return list;

// 	let sorted = $.extend(true, [], list);


// 	for (let sort in sorting) {

// 		const key 	= sort;
// 		const val 	= sorting[key]; //	ASC  DESC
// 		const zn 	= val === 'ASC' ? -1 : 1;

// 		if ( !val.trim() )
// 			continue;

// 		// eslint-disable-next-line
// 		switch (key) {
// 			case 'price': //	сортировка по цене
// 				sorted = _.sortBy(sorted, train => zn * train['coupes'][0]['price']); //	буду смотреть по первому купе
// 			break;
// 			case 'isoDateFrom':
// 				sorted = _.sortBy(sorted, train => zn * train['isoDateFrom'].unix()); //	время отправления
// 			break;
// 			case 'isoDateTo':
// 				sorted = _.sortBy(sorted, train => zn * train['isoDateTo'].unix()); //	время прибытия
// 			break;
// 			case 'coupes_length':
// 				sorted = _.sortBy(sorted, train => -1 * zn * train['coupes'].length); //	Количество купе - тут нужна сортировка наоборот
// 			break;
// 			case 'timeInWay':
// 				sorted = _.sortBy(sorted, train => zn * train['timeInWay'].asMilliseconds()); //	время в пути
// 			break;
// 			case 'places':
// 				sorted = _.sortBy(sorted, train => -1 * zn * _.reduce(train['coupes'], (m, i) => m + i['places'], 0)); //	свободные места
// 			break;
// 		}


// 	}

// 	return sorted;

// });








export const getBestPrice = createSelector([ getList ], list => {

	if ( list.length === 1 )
		return null;

	let sorted = _.sortBy(list, train => train['coupes'][0]['price']);
	return sorted[0];
});





export const getBestComf = createSelector([ getList ], list => {

	if ( list.length === 1 )
		return null;
		
	let sorted = _.sortBy(list, train => train['timeInWay'].asMilliseconds() );
	return sorted[0];
});






export const getCoupesTypes = createSelector([ getList ], list => {
	let trainTypes = {
		'все': 1
	};
	_.each(list, (model) => {
		for (var i = 0; i < model['coupes'].length; i++)
			trainTypes[ model['coupes'][i]['type'].toLowerCase() ] = 1;
	});
	return _.keys(trainTypes);
});
