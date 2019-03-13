export function pint(val) {

	return parseInt(val, 10);

}

export function pfloat(val) {

	return parseFloat(val);

}


export function isInt(x) {
   if ( x.trim() === '' || x === undefined || x === null )
   		return false;
	return /^[0-9]+$/.test(x);
}




export function toFix(x, after = 2) {
	x = pfloat(x);

	if ( x === pint(x) )
		return x;
	else
		return x.toFixed(after);
}
 
 

