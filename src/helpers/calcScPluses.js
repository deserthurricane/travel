import { pint }				from './pint';
import { priceFormat }      from './priceFormat';


//	подсчитать сколько получится плючов связного...
export function calcScPluses(sum, sclub) {

	sum = pint(sum);

	//Максимальная скидка Склубаf
	let SclubMaxDiscount = Math.floor(sum/100);

	if (SclubMaxDiscount > 3000)
		SclubMaxDiscount = 3000;

	let wordend = SclubMaxDiscount % 10;
	wordend = ((wordend === 1 && (SclubMaxDiscount < 11 || SclubMaxDiscount > 14)) ? "" :
		((wordend > 1 && wordend < 5  && (SclubMaxDiscount < 11 || SclubMaxDiscount > 14)) ? "а" : "ов"));


    let addSclubDiscount = '';

    if ( sclub && pint(sclub.replace(/ /g, '').substr(0,3)) === 298 ) {
        addSclubDiscount = priceFormat(SclubMaxDiscount) + ' плюс' + wordend;
    }
    else
    {
        addSclubDiscount = priceFormat(SclubMaxDiscount) + ' бонусных рублей';
    }
	return addSclubDiscount;
}
