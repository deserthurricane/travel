import $ from 'jquery';

import { pint } from './pint';
import cookie 	from 'react-cookies';
import { md5 } from './md5';
import { is_operator } from './is';



window.flocktory            = window.flocktory || [];
window.ttConversionOptions  = [];


export function flocktoryAddDiv( attributes, kuda = '' ) {
	if ( is_operator() )
		return;

	kuda = kuda.trim() || 'body';

	$("<div>")
		.addClass('i-flocktory')
		.attr(attributes)
		.appendTo(kuda);
}








	
export function reinitFlicktory() {
	try {
		window.flocktory.reInit();
	} catch (e) {}
}








export function showCPA_Pixels( order ) {



	var order_id 		= order['idTransaction'],
		utm_source 		= ( cookie.load('utm_source') ) 	? cookie.load('utm_source') 	: '',
		click_id 		= ( cookie.load('click_id') ) 		? cookie.load('click_id') 		: '',
		uid 			= ( cookie.load('uid') ) 			? cookie.load('uid') 			: '',
		order_total 	= order['amount'],
		currency 		= 'RUB',
		customer_type 	= 'new',
		payment_method 	= ( order['payTool'] === 'CC' ) ? 'Credit Card' : 'Cash',
		coupon 			= '',
		discount 		= '',
		position_count	= pint(order["countPeople"].split(":")[0]) + pint(order["countPeople"].split(":")[1]) + pint(order["countPeople"].split(":")[2]),
		basket 			= JSON.stringify({
			"fd"	:	order['departureDateTime'],
			"td"	:	order['arrivalDateTime'],
			"cl"	:	order["class_of_service"],
			"op"	:	order["from"],
			"dp"	:	order["to"],
			"cp"	:	pint(order["countPeople"].split(":")[1]) + pint(order["countPeople"].split(":")[2]),
			"ap"	:	order["countPeople"].split(":")[0],
			"tt"	:	"RWAY",
			"cn"	:	order["provider"],
			"up"	:	pint(order['amount']) / position_count,
			"pd"	:	0
		});









	// 1) Cityads
	if ( cookie.load('click_id') )	{

		$.getScript('https://cityadstrack.com/tr/js/'+order_id+'/ct/r1/c/11345?click_id='+click_id+'&order_total='+order_total+'&currency='+currency+'&customer_type='+customer_type+'&payment_method='+payment_method+'&coupon='+coupon+'&discount='+discount+'&basket='+basket);

		$('<iframe>', {
			src: 'https://cityadstrack.com/tr/xframe/'+order_id+'/ct/r1/c/11345?click_id='+click_id+'&order_total='+order_total+'&currency='+currency+'&customer_type='+customer_type+'&payment_method='+payment_method+'&coupon='+coupon+'&discount='+discount+'&basket='+basket,
			id:  'CityadsIFRAME',
			frameborder: 0,
			scrolling: 'no'
		}).appendTo('body');

	}












	// 2) PayPerSale
	$('<img style="display:none;">', {
		src: "http://a63.paypersale.ru/track/id/"+order_id+"/key/"+md5(order_id)+"/target/t3"
	}).appendTo('body');

	$('<img style="display:none;>', {
		src: "http://a63.paypersale.ru/track/id/"+order_id+"/akey/1392/target/t3"
	}).appendTo('body');











	// 3) Admitad
	if ( utm_source === 'admitad' && uid )	{

		(function (d, w) {
		    w._admitadPixel = {
		        response_type: 'img',     // 'script' or 'img'. Default: 'img'
		        action_code: '6',
		        campaign_code: 'bf3e570a18'
		    };
		    w._admitadPositions = w._admitadPositions || [];
		    w._admitadPositions.push({
		        uid				:	uid,
		        tariff_code		:	'1',
		        order_id		:	order_id,
		        position_id		:	'',
		        currency_code	:	currency,
		        position_count	:	position_count,
		        price			:	order_total,
		        quantity		:	'',
		        product_id		:	'RWAY',
		        payment_type	:	'sale'
		    });
		    var id = '_admitad-pixel';
		    if (d.getElementById(id)) { return; }
		    var s = d.createElement('script');
		    s.id = id;
		    var r = (new Date()).getTime();
		    var protocol = (d.location.protocol === 'https:' ? 'https:' : 'http:');
		    s.src = protocol + '//cdn.asbmit.com/static/js/npixel.js?r=' + r;
		    var head = d.getElementsByTagName('head')[0];
		    head.appendChild(s);
		})(document, window)


		$('<img>', {
			src: "//ad.admitad.com/r?campaign_code=bf3e570a18&action_code=6&payment_type=sale&response_type=img&uid="+uid+"&tariff_code=1&order_id="+order_id+"&position_id=&currency_code="+currency+"&position_count="+position_count+"&price="+order_total+"&quantity=&product_id=RWAY",
			style: 'display:none',
		}).appendTo('body');

	}








	// 4) Tradetracker
	window.ttConversionOptions.push({
		type: 'sales',
		campaignID: '17240',
		productID: '30357',
		transactionID: order_id,
		transactionAmount: order_total,
		quantity: '1',
		email: order['email'],
		descrMerchant: '',
		descrAffiliate: '',
		currency: currency
	});


	$('<img>', {
		src: "//ts.tradetracker.net/?cid=17240&pid=30357&tid="+order_id+"&tam="+order_total+"&data=&qty=1&eml=&descrMerchant=&descrAffiliate=&event=sales&currency=",
		style: 'display:none',
	}).appendTo('body');



	(function(ttConversionOptions) {
		var campaignID = 'campaignID' in ttConversionOptions ? ttConversionOptions.campaignID : ('length' in ttConversionOptions && ttConversionOptions.length ? ttConversionOptions[0].campaignID : null);
		var tt = document.createElement('script'); tt.type = 'text/javascript'; tt.async = true; tt.src = '//tm.tradetracker.net/conversion?s=' + encodeURIComponent(campaignID) + '&t=m';
		var s = document.getElementsByTagName('script'); s = s[s.length - 1]; s.parentNode.insertBefore(tt, s);
	})(window.ttConversionOptions);






}
