import { priceFormat } from './priceFormat';
import { pint } from './pint';
import _ from 'underscore';

export const getPriceString = (train, train_back, prexix = false) => {
		
    let min_price 	= pint(train.coupes[0].price) 		|| 0;
    let max_price 	= pint(_.last(train.coupes).price) 	|| 0;

    //	обратный поезд
    if ( train_back ) {
        min_price 	+= 	pint(train_back.coupes[0].price);
        max_price 	+= 	pint(_.last(train_back.coupes).price);
    }

    return 	(( prexix && min_price !== max_price) ? 'от ' : '') + priceFormat( min_price );
}
