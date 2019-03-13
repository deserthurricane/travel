import scrollToElement 	from 'srk/lib/helpers/scrollToElement';
import $ from 'jquery';



export function initScrollToElementOnPortal() {

	$("body").on(
		"focus",
		"input.keyboard-layout-RU, input.keyboard-layout-EN, input.keyboard-uppercase, input.keyboard-lowercase, input.keyborad-only-digits, input[datainpselectizer]",
		e => {
			scrollToElement($(e.currentTarget), 10, 300);
		}
    );
    
}
