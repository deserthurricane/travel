
import { is_catalog }   from './is';
import cookie 	        from 'react-cookies';
import Modal 			from 'srk/lib/components/Modal';
import _                from 'underscore';
import $                from 'jquery';
import { concatNumberLeft } from './concatNumber';


window.helloToken       = cookie.load('svz_catalogToken_rway')   || Math.random().toString(36).substr(2);
window.catalogChannel   = '';






export function initExternalKeyboard( selector, callBack = () => {} ) {

    setTimeout(()=>{

        if ( !is_catalog() || !selector.trim() || window.top === window )
            return;

        if (!window.catalogChannel)
            return;

        // console.log('initExternalKeyboard', selector);

        //  атач кейбоард
        // eslint-disable-next-line
        $(selector).externalKeyboard({
            "msgChannel"     : window.catalogChannel,
            "cnKbLayoutRu"   : "keyboard-layout-RU",
            "cnKbLayoutEn"   : "keyboard-layout-EN",
            "cnKbUpperCase"  : "keyboard-uppercase",
            "cnKbLowerCase"  : "keyboard-lowercase",
            "cnKbOnlyDigits" : "keyborad-only-digits",
        }, callBack );

    }, 200);

}

















/**
 * Инициализация данных для каталога
 */
export function setCatalogINIT() {

    if ( !is_catalog() )
        return;




    if (!window.MessageChannel)
		return;




	window.catalogChannel = new window.MessageChannel(window.parent, '*');
	window.catalogChannel.connect();



	window.catalogChannel.registerService('status', function(msg) {

		// console.log('response hello message - ', msg);

		try {
			var message = JSON.parse(msg);


			// console.log('response hello message - ', message);
			
			
			cookie.save('svz_catalogToken_rway', window.helloToken, {
				path: '/',
				maxAge: (60 * 60 * 24 * 90) /*domain: '.svyaznoy.travel'*/
			});


			
			if (message.shopId)
				cookie.save('svz_catalogId', concatNumberLeft(message.shopId, 8, '0'), {
					path: '/',
					maxAge: (60 * 60 * 24 * 90) /*domain: '.svyaznoy.travel'*/
				});
			



			if (message.shopCity)
				cookie.save('svz_catalogCity', message.shopCity, {
					path: '/',
					maxAge: (60 * 60 * 24 * 90) /*domain: '.svyaznoy.travel'*/
				});

			

            
		} catch (e) {

            console.error('ERROR ON registerService - status', e);

        }

	});





	window.catalogChannel.send('status', ('{"action":"hello", "token":"' + window.helloToken + '"}'));






	// не спать
    $(document).on('mousedown mouseup mouseover mouseout keydown keyup touchmove touchstart click tap taphold swipe swipeleft swiperight', 
    
        _.throttle(() => {
            window.catalogChannel.send('status', JSON.stringify({
                "action": "activity",
                "token": window.helloToken
            }));
        }, 1500)

    );
    
    
    




    //  если это фрейм, то переназначу алерт
    if ( window !== window.top ) {
        Modal.alert = (msg) => {
            window.catalogChannel.send('popup_register_service', '{POPUP:' + msg.replace(/(?:\r\n|\r|\n)/g, ' ') + '}');
        }
    }

}














//  ************************** служебные скрипты по типу полифилов










/**
 * Абстракция над window.postMessage, позволяющая отправлять и принимать
 * сообщения для разных адресатов
 *
 * @constructor
 * @param {window} targetWindow Ссылка на window-объект iframe
 * @param {string=} opt_origin Origin для postMessage
 * @param {window=} opt_currentWindow Объект window, у которого необходимо
 *                                    прослушивать событие "message"
 */
window.MessageChannel = function (targetWindow, opt_origin, opt_currentWindow) {

	if (typeof (targetWindow) === 'undefined' || typeof (targetWindow.postMessage) === 'undefined') {

		console.log('No method "postMessage" in passed target');
		return false;
		// throw new Exception('No method "postMessage" in passed target');

	}


	/** @private {window} */
	this._targetWindow = targetWindow;
	/** @private {window} */
	this._currentWindow = opt_currentWindow || window;
	/** @private {string} */
	this._origin = opt_origin || '*';

	/** @private {Object<string,Function>} */
	this._services = {};

	/** @private {Object<string,Function>} */
	this._callBacksKeyBoard = {};
};

/**
 * Устанавливает обработчик события "message"
 * @param {Function=} opt_callBack
 */
MessageChannel.prototype.connect = function (opt_callBack) {
	$(this._currentWindow).bind('message', this._onReceive.bind(this));

	if (opt_callBack)
		opt_callBack.call(this);
};

/**
 * Устанавливает обработчик входящих сообщений для определенного типа
 *
 * @param {string} service
 * @param {Function(string)} callback
 */
MessageChannel.prototype.registerService = function (service, callback) {
	this._services[service] = callback;
};

/**
 * Устанавливает коллбек для клавиатуры
 *
 * @param {string} name
 * @param {Function(string)} callback
 */
MessageChannel.prototype.registerCallBack = function (name, callback) {
	this._callBacksKeyBoard[name] = callback;
};

/**
 * Проверяет, установлен ли обработчик входящих сообщений для определенного типа
 * @param {string} service
 * @returns {boolean}
 */
MessageChannel.prototype.isServiceRegistered = function (service) {
	return (typeof (this._services[service]) !== 'undefined');
};

/**
 * Осуществляет отправку сообщения
 *
 * @param {string} service Тип сообщения
 * @param {string} contents Сообщение
 */
MessageChannel.prototype.send = function (service, contents) {
	// console.log(' --- request --- ', service, contents);
	
	this._targetWindow.postMessage(this._msgPack(service, contents), this._origin);
};

/**
 * Обработчик сообщения "message"
 *
 * @private
 * @param {jQuery.Event} e
 */
MessageChannel.prototype._onReceive = function (e) {
	var evt = e.originalEvent;

	// console.log('--- _onReceive --- ', evt);
	

	if (evt.origin !== this._origin && this._origin !== '*')
		return;


	var unpacked = this._msgUnpack(evt.data);
	if (!unpacked)
		return;
	if (typeof (this._services[unpacked.service]) === 'undefined') {
		// console.warn(
		//   (
		//     'No callback for service "'
		//     + unpacked.service
		//     + '", message:'
		//     ),
		//   unpacked.message
		//   );
		return;
	}

	// console.log(' --- response --- ', unpacked.service, unpacked.message);


	this._services[unpacked.service].call(null, unpacked.message);
};

/**
 * Сериализует сообщение для отправки
 *
 * @private
 * @param {string} service
 * @param {string} contents
 * @returns {string}
 */
MessageChannel.prototype._msgPack = function (service, contents) {
	return (service + ':' + contents);
};

/**
 * Восстанавливает сериализованное сообщение
 *
 * @private
 * @param {string} rawMsg
 * @returns {Object}
 */
MessageChannel.prototype._msgUnpack = function (rawMsg) {

	if (typeof (rawMsg) !== 'string')
		return null;

	var delimPos = rawMsg.indexOf(':');
	if (delimPos <= 0)
		return null;

	return {
		"service": rawMsg.substr(0, delimPos),
		"message": rawMsg.substr(delimPos + 1)
	};
};











/**
 * Плагин jQuery для взаимодействия с клавиатурой во внешнем фрейме
 */
(function ($) {

	/**
	 * Класс для корректного перемещения фокуса у набора полей ввода
	 *
	 * @param {Array.<Element>} inputs Список полей ввода
	 * @param {boolean} sequence Осуществлять ли зацикливание навигации
	 */
	var InputFocusManager = function (inputs, sequence) {
		if (!inputs.length)
			console.warn('Focus managed inputs are empty');

		/** @private {Array.<Element>} */
		this._inputs = inputs;
		/** @private {number} */
		this._currentPos = 0;
		/** @private {boolean} */
		this._sequence = !!(sequence);
	};

	/**
	 * Перемещение фокуса ввода в следующее поле
	 * @returns {boolean}
	 */
	InputFocusManager.prototype.next = function () {

		if ((this._currentPos + 1) >= this._inputs.length) {

			if (this._sequence)

				this._currentPos = 0;

			else {

				this._blurCurrent();


				$('._catalogKeyboard').trigger('catalogPrevNextEnd', [{

					el: $(this._inputs).eq(this._currentPos),
					delta: 1

				}]);

				return false;

			}

		} else
			this._currentPos += 1;

		this._focusCurrent();
		return true;
	};

	/**
	 * Перемещение фокуса ввода в предыдущее поле
	 * @returns {Boolean}
	 */
	InputFocusManager.prototype.prev = function () {
		if ((this._currentPos - 1) < 0) {
			if (this._sequence)
				this._currentPos = this._inputs.length - 1;
			else {
				this._blurCurrent();

				$('._catalogKeyboard').trigger('catalogPrevNextEnd', [{

					el: $(this._inputs).eq(this._currentPos),
					delta: 0

				}]);

				return false;
			}
		} else
			this._currentPos -= 1;

		this._focusCurrent();
		return true;
	};

	/**
	 * Возвращает текущий подсвеченный элемент
	 * @returns {Element}
	 */
	InputFocusManager.prototype.current = function () {
		return this._inputs[this._currentPos];
	};

	/**
	 * Метод для вызова при срабатывании события "focus" у элемента
	 * @param {Element} element
	 */
	InputFocusManager.prototype.onFocus = function (element) {
		var pos = $.inArray(element, this._inputs);
		if (pos < 0) {
			console.warn('Manager does not include argument input');
			return;
		}


		$(element).trigger('catalogFocus');

		this._currentPos = pos;
	};

	/**
	 * @private
	 * Устанавливает фокус в текущий выбранный элемент и генерирует событие
	 */
	InputFocusManager.prototype._focusCurrent = function () {
		$(this.current()).focus().trigger('focus', {
			"fromFocusManager": true
		});
	};

	/**
	 * Убирает фокус из текущего выбранного элемента и генерирует событие
	 * @private
	 */
	InputFocusManager.prototype._blurCurrent = function () {
		$(this.current()).blur().trigger('blur', {
			"fromFocusManager": true
		});
	};

    // eslint-disable-next-line
	var symbolExp = /^\{SYMBOL\:([\S\x20]{1})\}$/;














	/**
	 * Обработчик события FOCUS для элементов, переданных в плагин
	 *
	 * @param {Element} el
	 * @param {jQuery.Event} evt
	 * @param {Object=} addit
	 */
	var onElementFocus = function (el, evt, addit) {


		if (!addit || !addit.fromFocusManager)
			this.focusManager.onFocus(el);

		var $el = $(el);


		var keyboardMessage = '{SHOW:' +
			(
				(this.cnKbLayoutRu && $el.hasClass(this.cnKbLayoutRu)) ? 'RU' : ( (this.cnKbLayoutEn && $el.hasClass(this.cnKbLayoutEn)) ? 'EN' : '' )
			) 
			+
			':' 
			+
			(
				(this.cnKbUpperCase && $el.hasClass(this.cnKbUpperCase)) ? 'A' : ( (this.cnKbLowerCase && $el.hasClass(this.cnKbLowerCase)) ? 'a' : '' )
			) 
			+
			':' 
			+
			( 
				(this.cnKbOnlyDigits && $el.hasClass(this.cnKbOnlyDigits)) ? '1' : '0' 
			) 
			+
			'}';
		



		//	на новых каталогах есть какая-то странная задержка.
		//	выходит что шоу отправляется перед хайдом. 
		//	а такого быть не должно
		setTimeout(() => {
			this.msgChannel.send(this.serviceID, keyboardMessage);	
		}, 100);
		
	}


	

	/**
	 * Обработчик события BLUR для элементов, переданных в плагин
	 *
	 * @param {Element} el
	 * @param {jQuery.Event} evt
	 */
	var onElementBlur = function (el, evt) {
		this.msgChannel.send(this.serviceID, '{HIDE}');
	}

	/**
	 * Обработчик входящих сообщений от клавиатуры для объекта плагина
	 * @param {string} msg
	 */
	var keyboardMessageHandler = function (msg) {

		var symbol, symbolToAdd;
		var curEl = this.focusManager.current();
		var callBack = this.msgChannel._callBacksKeyBoard[this.serviceID] || undefined;
		var curEl_value = '';

		if (!curEl)
			return;

		if (msg === '{NEXT}') {

			this.focusManager.next();

		} else if (msg === '{PREV}') {

			this.focusManager.prev();

		} else if (msg === '{HIDE}') {

			$(curEl).blur();

		} else if (msg === '{BACKSPACE}') {

			var selStart = curEl.selectionStart,
				selEnd = curEl.selectionEnd;

			if (selStart === selEnd)
				selStart -= 1;

			// curEl.value = (curEl.value.substr(0, selStart) + curEl.value.substr(selEnd) );
			curEl_value = (curEl.value.substr(0, selStart) + curEl.value.substr(selEnd));


			//  дергну коллбек
			if (callBack && typeof (callBack) === 'function') callBack(curEl.getAttribute('name'), curEl_value, curEl);



			curEl.setSelectionRange(selStart, selStart);

		} else if (msg === '{ENTER}') {

			if (this.focusManager.current().tagName === 'TEXTAREA')
				symbolToAdd = "\n";
			else
				this.focusManager.next();

		// eslint-disable-next-line
		} else if ((symbol = msg.match(symbolExp)) !== null) {

			symbolToAdd = symbol[1];

		}

		if (typeof (symbolToAdd) !== 'undefined') {
			selStart = curEl.selectionStart;
			selEnd = curEl.selectionEnd;

			// curEl.value = curEl.value.substr(0, selStart) + symbolToAdd + curEl.value.substr(selEnd);
			curEl_value = curEl.value.substr(0, selStart) + symbolToAdd + curEl.value.substr(selEnd);


			//  дергну коллбек
			if (callBack && typeof (callBack) === 'function') callBack(curEl.getAttribute('name'), curEl_value, curEl);



			curEl.setSelectionRange(selEnd + 1, selEnd + 1);
		}









		$(curEl).trigger('input');
	}











	/**
	 * @param {Object}
	 * @returns {jQuery}
	 */
	$.fn.externalKeyboard = function (opts, callBack) {
		opts = opts || {};
		opts.focusManager = new InputFocusManager(this.get(), opts.focusSequence);

		var id;
		do {
			id = "keyboard_" + parseInt(Math.random() * 1000, 16);
		} while (opts.msgChannel.isServiceRegistered(id));

		opts.serviceID = id;

		opts.msgChannel.send("keyboard_register_service", id);
		opts.msgChannel.registerService(id, keyboardMessageHandler.bind(opts));
		opts.msgChannel.registerCallBack(id, callBack); // зарегшистрирую колбек для сохранения данных в редакс...

		return this.each(function () {
			$(this).focus(onElementFocus.bind(opts, this));
			$(this).blur(onElementBlur.bind(opts, this));
		});
	};







})($);
