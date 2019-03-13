
import { is_operator } from './is';



export function analytics( metka ) {
	metka = metka.trim();

	if ( is_operator() )
		return;

	if ( !metka ) return;

	try{
		// window._gaq.push(['_trackPageview', '/rway/site/' + metka]);


		window.dataLayer.push({
		    'event'				: 'VirtualPageview',
		    // 'virtualPageURL'	: document.location.pathname + document.location.hash,
		    'virtualPageTitle'	: document.title,
			'virtualPageURL'	: '/rway/site/' + metka,
		});



		window.yaCounter15522617.reachGoal('rwaysite' + metka);
	} catch(e) { }
}
