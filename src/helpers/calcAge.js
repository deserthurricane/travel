import moment from 'moment';


export function calcAge(birthDate, format) {
    let today = moment();
    let diff = {};

    birthDate = moment(birthDate, format);

    if (!birthDate.isValid()) 
        return false;

    diff = moment.duration(today.diff(birthDate));

    return diff.years();
}
