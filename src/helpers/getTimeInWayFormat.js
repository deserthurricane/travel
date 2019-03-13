
import { pint } from './pint';

export function getTimeInWayFormat(days, hours, minutes) {
	// return (days) ? days+' д. '+hours+' ч.' : hours+' ч. '+minutes+' м.';

	if ( pint(days) ) {
		return days+' д. ' + (( hours ) ? hours+' ч.' : '');
    }
	else {
        if ( pint(hours) ) {
            return hours+' ч. ' + (( minutes ) ? minutes+' м.' : '');
        }
        else
        {
            return minutes+' м.';
        }
    }
}
