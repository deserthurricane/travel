

export function ltrimArr(values) {
	for (var i = 0; i < values.length; i++)
        values[i] = ltrim(values[i], '0');

    return values;
}



export function ltrim( str, charlist ) {
    // eslint-disable-next-line
	charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+', 'g');
	return str.replace(re, '');
}
