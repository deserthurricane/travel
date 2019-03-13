// Парсим URL на состовляющие
export function parseURL(url) {

	url = url || document.location.href;

	var result = {};

	var pattern = '^(([^:/\\?#]+):)?(//(([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$';
	var rx = new RegExp(pattern);
	var parts = rx.exec(url);

	var params_str = url.split('?')[1];
	var params_obj = {};

	if ( params_str )
		params_obj = params_str
			.replace(/(^\?)/, '')
			.split('&')
			.map(
				function(n) {
					n = n.split('=');
					this[n[0]] = n[1];
					return this;
				}.bind({})
			)[0]; //	Параметры урла



	result.href = parts[0] || '';
	result.protocol = parts[1] || '';
	result.hostname = parts[5] || '';
	result.port = parts[6] || '';
	result.pathname = parts[7] || '/';
	result.search = parts[8] || '';
	result.hash = parts[10] || '';
	result.url = result.protocol + '//' + result.hostname + result.pathname;
	result.params = params_obj; //	Параметры урла

	return result;
}
