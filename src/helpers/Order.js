import _ from 'underscore';
import { pint, pfloat, toFix } from './pint';
import moment 			from 'moment';



//  конструктор цены...
export function getTicketPrice(with_baby, with_bedding, with_calculation_of_seats, coupe, count_with_baby, count_without_baby) {

	
		let
			prices_on_place	=	coupe['prices_on_place'],
			len 			= 	( with_baby ) ? count_with_baby : count_without_baby,
			bedding_price	=	( coupe['bl'] ) ? pint( coupe['servicePrice'] ) * len : 0,
			price 			= 	pfloat( coupe['price'] ),
			maxPrice 		= 	pfloat( coupe['maxPrice'] ),
			select_places	=	coupe.selectedPlaces || [];


		if ( coupe.twoPlaces || coupe.fourPlaces ) {

			let koef 		= ( coupe.twoPlaces ) ? 2 : 4;
			let increase 	= Math.ceil(select_places.length/koef);

			if ( increase === 0 ) increase = 1;

			price 		*=	increase;
			maxPrice 	*=	increase;
		}
		else
		{
			//	проверка на формирование цены с учетом мест (верхнее - дешевле; нижнее - дороже)
			if ( with_calculation_of_seats && select_places.length )	{
				let finalPrice = 0;



				_.each(select_places, (place) => {

					//	если есть массив с ценами по местам, то смотрю в нем...
					if ( prices_on_place && prices_on_place[place] ) {
						finalPrice += prices_on_place[place];
					}
					else
					{
						//	если нет, то считаю так...
						finalPrice += ( pint(place) % 2 === 0 ) ? price : maxPrice;
					}
					

				});

				price 		=	finalPrice;
				maxPrice 	=	finalPrice;
			}
			else
			{
				price 		= 	price 		* len;
				maxPrice 	= 	maxPrice 	* len;
			}
		}


		//	Если нужна цена билета без стоимсоти белья
		//	то белье вычитаю т.к. его стоимость уже включена
		if ( !with_bedding ) {
			price 		-= bedding_price;
			maxPrice 	-= bedding_price;
		}

		return {
			'price'		: toFix(price),
			'maxPrice'	: toFix(maxPrice),
		};

	}








	





export function creatObjForPassengersURL( coupe ) {

	let COUPE_ = {
		trainNumApi 				: coupe['trainNumApi'],
		isoDateFrom 				: moment(coupe['departureDateTime'], 	"YYYY-MM-DD HH:mm:ss"),
		selectedPlaces 				: coupe['places'].split(','),
		number						: coupe['car_number'],
		PassengerDepartureStation 	: {
			name: coupe['from'], 
			code: coupe['fromCode'], 
		},
		PassengerArrivalStation 	: {
			name: coupe['to'], 
			code: coupe['toCode'], 
		},
	};

	return COUPE_;
}

	






export function getCoupeGender( coupe ) {
	let GENDER 			= '';
	let GENDER_ARR 		= [];
	let selectedPlaces 	= coupe.selectedPlaces;
	let placesObjClear 	= coupe.placesObjClear;
	
	for (let p = 0; p < selectedPlaces.length; p++) {

		let pl = selectedPlaces[p].replace(/[а-яА-Яa-zA-Z]/g, '');

		if ( /[а-яА-Яa-zA-Z]/.test(placesObjClear[pl]) )
			GENDER_ARR.push( placesObjClear[pl].replace(/[0-9]/g, '') );	
	}

	if ( GENDER_ARR.length )
		GENDER = GENDER_ARR.join(',');

	return GENDER;
}