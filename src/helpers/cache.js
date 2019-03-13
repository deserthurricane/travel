import Storages from "js-storage";
import {
	escape_
} from "./../helpers/escapeInjection";








export function getFromCache(type, default_value = false) {
	const cache = Storages.localStorage.get(type);

	return cache ? escape_(cache) : default_value;
}






export function saveToCache(type, data) {
	if (data === false) Storages.localStorage.remove(type);
	else {
		try {
			Storages.localStorage.set(type, data);
		} catch (error) {
			if (isQuotaExceeded(error)) Storages.localStorage.remove(type);
		}
	}
}







/**
 * проверка переполнен ли локалсторейдж...
 * @param {*} e
 */
function isQuotaExceeded(e) {
	var quotaExceeded = false;
	if (e) {
		if (e.code) {
			// eslint-disable-next-line
			switch (e.code) {
				case 22:
					quotaExceeded = true;
					break;
				case 1014:
					// Firefox
					if (e.name === "NS_ERROR_DOM_QUOTA_REACHED")
						quotaExceeded = true;
					break;
			}
		} else if (e.number === -2147024882) {
			// Internet Explorer 8
			quotaExceeded = true;
		}
	}
	return quotaExceeded;
}