
import { URL } from './../options';



	

/**
 * Инициализация слежки за ошибками...
 */
export function errorReporterINIT() {

	


	(function(mainWindow) {

		function SError( obj ) {
	
			var reportUrl 			= obj['url'];
			var name 				= obj['name'] || window.location.href;
			var extended_info 		= obj['extended_info'] || function(){};
	
			this.init( reportUrl, name, extended_info );
		}

		
		SError.prototype = {
	
			init : function( reportUrl, name, extended_info ) {
	
				this.reportUrl 		=	reportUrl;
				this.name 			=	name;
				this.extended_info 	=	extended_info;
	
				this.startWatch();
			},
	
	
			startWatch : function() {
	
				var _self = this;
	
				mainWindow.onerror = function(message, source, lineno, colno, error) {
	
					_self.sendReport({
						name   		: _self.name,
						href   		: window.location.href,
						message 	: message,
						source  	: source,
						lineno  	: lineno,
						colno   	: colno,
						error   	: _self.errorToModel( error ),
						INFO		: _self.extended_info(),
						userAgent	: window.navigator.userAgent,
						referrer	: document.referrer,
					});

				};

			},
	
	
			errorToModel : function( error ) {
				return (!error || !mainWindow.ReferenceError ) 
				? 
					{} 
				: 
					{
						columnNumber	:	error.columnNumber,
						fileName    	:	( error.fileName ) ? error.fileName : '',
						lineNumber  	:	error.lineNumber,
						message     	:	error.message,
						name        	:	error.name,
						stack       	:	error.stack,
					};
			},
	
	
			serialize : function(obj) {
				var str = [];
				for (var p in obj) {
					if (obj.hasOwnProperty(p)) {
						if (typeof( obj[p] ) === 'object')
							str.push(encodeURIComponent(p) + "=" + this.serialize( obj[p] ));
						else
							str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					}
				}
				return str.join("&");
			},
	
	
	
			sendReport : function( model ) {
				try{
					var
						xhr  =	new XMLHttpRequest(),
						body =	JSON.stringify( model );
				} catch(e) {}
	
				xhr.open('POST', this.reportUrl, true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send( body );
			}
	
		}

		mainWindow.SError = SError;
	})(window);








	// Включу логирование ошибок...
	new window.SError({
		'name'			:	'yii2 REACT ЖД ' + window.source,
		'url'			:	URL['JS_error_reporter'],
		// 'extended_info'	:	() => {
		// 	if ( ORDER !== undefined )
		// 		return ORDER.toJSON();

		// 	return 'ORDER == undefined';
		// },
	});




}



