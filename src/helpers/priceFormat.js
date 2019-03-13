
export function priceFormat(price) {
	price = price+"";
	return price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
