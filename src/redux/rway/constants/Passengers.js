
// import $ from 'jquery';
import _ from 'underscore';
import moment from 'moment';

import { pint, isInt } from './../helpers/pint';

import { DOC_TYPE, AGES_INFO } from './../options';

export const PASSENGERS_UPDATE = 'PASSENGERS_UPDATE';
export const ONE_PASSENGERS_UPDATE = 'ONE_PASSENGERS_UPDATE';
export const PASSENGERS = 'PASSENGERS';


export const INITIAL_STATE = [];

export const ONE_PASSENGERS = {
    AgeCategory         : "",       //  adult child  baby
    AgeCategory_str     : "",       //  Пассажир (взрослый), <b>место 46</b>.
    Citizenship         : "RUS",    //  RUS
    DayOfBirth_DD       : "",       //  04
    DayOfBirth_MM       : "",       //  07
    DayOfBirth_YYYY     : "",       //  1990
    DocNum              : "",       //  46 11 123123
    DocType             : "",       //  ПН
    FamilyName          : "",       //  иванов
    Name                : "",       //  задлрот
    Patronymic          : "",       //  pfkegmtdbx
    RzhdCardNum         : "",
    RzhdCardType        : "",
    Sex                 : "",
    place               : false,
    tariff              : "",
};














//  https://github.com/flatiron/revalidator

export const PASSENGER_SCHEMA = {


    FamilyName: {
        required: true,
        type: 'string',
        message: ' ',
    	conform: function(val, obj, field) {
            val 		=	val ? val.trim() : '';

            var
				opt			=	_.findWhere(DOC_TYPE, {'code' : obj['DocType']})['FIO'][field],
				required 	=	opt['required'],
				pattern 	=	opt['pattern'],
				msg 		=	opt['msg'];

			if ( required && !val )          return ' ';
            if ( !required && val === '' )   return false;
			if ( !pattern.test( val ) )      return msg;
		}
    },


    Name: {
        required: true,
        type: 'string',
        message: ' ',
    	conform: function(val, obj, field) {
            val 		=	val ? val.trim() : '';

            var
				opt			=	_.findWhere(DOC_TYPE, {'code' : obj['DocType']})['FIO'][field],
				required 	=	opt['required'],
				pattern 	=	opt['pattern'],
				msg 		=	opt['msg'];

			if ( required && !val )          return ' ';
            if ( !required && val === '' )   return false;
			if ( !pattern.test( val ) )      return msg;
		}
    },



    Patronymic: {
        required: false,
        type: 'string',
        message: ' ',
    	conform: function(val, obj, field) {
            val 		=	val ? val.trim() : '';

            var
				opt			=	_.findWhere(DOC_TYPE, {'code' : obj['DocType']})['FIO'][field],
				required 	=	opt['required'],
				pattern 	=	opt['pattern'],
				msg 		=	opt['msg'];

			if ( required && !val )          return ' ';
            if ( !required && val === '' )   return false;
			if ( !pattern.test( val ) )      return msg;
		}
    },


    Citizenship: {
        required: true,
		message: 'Проверьте гражданство',
		pattern: /^[a-zA-Z]*$/,
	},





    DayOfBirth_DD: {
        required: true,
        message: ' ',
        pattern: /^[0-9]{2}$/,
        conform: function(val, obj) {
            return ( !pint(val) || pint(val) > 31 ) ? true : false;
		}
    },

    DayOfBirth_MM: {
        required: true,
        message: ' ',
        pattern: /^[0-9]{2}$/,
        conform: function(val, obj) {
            return ( !pint(val) || pint(val) > 12 ) ? true : false;
		}
    },

    DayOfBirth_YYYY: {
        required: true,
        message: ' ',
        pattern: /^[0-9]{4}$/,
        conform: function(val, obj) {
            return ( !pint(val) || pint(val) > moment().year() || pint(val) < moment().year()-100 ) ? true : false;
		}
    },


    DOB: {
        without_model: true,    //  эта схема валидируется без поля в модели.
        message: ' ',
        conform: function(obj, field, DOP_DATA) {

            if ( !isInt(obj['DayOfBirth_DD']) || !isInt(obj['DayOfBirth_MM']) || !isInt(obj['DayOfBirth_YYYY']) )
                return false; //    верну типа нет ошибок, т.к. не введены все числа...


            let
                directionGroup  = DOP_DATA['directionGroup'],
                travelDate      = DOP_DATA['date'],
                age_from        = AGES_INFO[ obj['AgeCategory'] ][ directionGroup ]['age_from'],
                age_to          = AGES_INFO[ obj['AgeCategory'] ][ directionGroup ]['age_to'],
                now             = moment(travelDate, 'YYYY-MM-DD'),
                date            = moment().date( pint(obj['DayOfBirth_DD']) ).month( pint(obj['DayOfBirth_MM']) - 1 ).year( pint(obj['DayOfBirth_YYYY']) ),
                age             = now.diff(date, 'years');


            if (age < age_from || age >= age_to) {
                let error_ = 'Возраст пассажира должен быть от ' + age_from;

                error_ += (age_to < 100) ? ' до ' + age_to + ' лет' : ' лет';

                error_ += ' на момент поездки.';

                return error_;
            }

		}
    },


    DocNum: {
        required: true,
        message: ' ',
        conform: function(val, obj) {

            val 		=	val ? val.trim() : '';

            if ( !val ) return ' ';

            let cur = _.findWhere(DOC_TYPE, {'code' : obj['DocType']});

			if ( !cur ) return 'Не найден шаблон документа';

			var pattern = cur['pattern'];
			var msg 	= cur['msg'] || ' ';

			if ( pattern !== false && !pattern.test(val) )
				return msg;

            return false;    //  типа нет ошибки
		}
    },


    DocType: {
        required: true,
		message: ' ',
		pattern: /^[a-zA-Zа-яА-Я]{2}$/,
	},

    RzhdCardType: {
        required: false,
		message: ' ',
	},


    RzhdCardNum: {
        required: false,
		message: ' ',
        conform: function(val, obj) {
            if ( obj['RzhdCardType'].trim() && (!val || !val.trim()) )
                return ' ';

            if ( obj['RzhdCardType'].trim() && !/[0-9]{13}/.test(val.trim()) )
                return ' ';
                // return 'Номер карты должен содержать 13 цифр.';
		}
	},

    Sex: {
        required: true,
		message: ' ',
        pattern: /^[M|F]{1}$/,
	},

    tariff: {
        required: true,
		message: ' ',
		pattern: /^[0-9]{1,2}$/,
	},


    AgeCategory: {
        required: false,
		message: ' ',
	},


    AgeCategory_str: {
        required: false,
		message: ' ',
	},

    place: {
        required: false,
		message: ' ',
	},

};
