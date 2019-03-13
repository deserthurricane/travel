/* eslint-disable */

import {TYME_TYPE, MOMENT_FORMATS} from './../options';

export const getTime = (train, type = 'depart', format = 'HH:mm') => {
    let F = MOMENT_FORMATS['DISPLAY_DATETIME_FORMAT'];

    switch (type) {
        case 'depart':
            return ( train.LocalDepartureTime && train.LocalDepartureTime.format(F) !== train.isoDateFrom.format(F) ) ? train.LocalDepartureTime.format(format) : train.isoDateFrom.format(format);
        break;
        case 'arrival':
            return ( train.LocalArrivalTime && train.LocalArrivalTime.format(F) !== train.isoDateTo.format(F) ) ? train.LocalArrivalTime.format(format) : train.isoDateTo.format(format);
        break;
    }
    
}


export const getTimeType = (train, type = 'depart') => {
    let F = MOMENT_FORMATS['DISPLAY_DATETIME_FORMAT'];

    switch (type) {
        case 'depart':
            return ( train.LocalDepartureTime && train.LocalDepartureTime.format(F) !== train.isoDateFrom.format(F) ) ? TYME_TYPE[1] : train.isoDateFrom_type;
        break;
        case 'arrival':
            return ( train.LocalArrivalTime && train.LocalArrivalTime.format(F) !== train.isoDateTo.format(F) ) ? TYME_TYPE[1] : train.isoDateTo_type;
        break;
    }
    
}




