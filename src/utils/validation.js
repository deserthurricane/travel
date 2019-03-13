/**
 * Строка соответствует регулярному выражению
 */
const isMatch = (value, rule, trim = true) => {
    if (typeof value === 'string') {
        if (trim) {
            value = value.trim();
        }
        return !!value.match(`^${rule}$`);
    } else if (typeof value === 'number') {
        return !!value.toString().match(`^${rule}$`);
    }
    return !!value;
}

/**
 * Значение не пустое
 */
const isEmpty = (value, trim = true) => {
    if (typeof value === 'string') {
        if (trim) {
            value = value.trim();
        }
        return value.length === 0;
    } else if (typeof value === 'number') {
        return value.toString().length === 0;
    } else if (typeof value === 'boolean') {
        return false;
    }

    return !value;
}

/**
 * Строка больше или равна минимальной длине
 */
const isMatchMinLength = (value, length, trim = true) => {
    if (typeof value === 'string') {
        if (trim) {
            value = value.trim();
        }
        return value.length >= length;
    } else if (typeof value === 'number') {
        return value.toString().length >= length;
    }

    return !!value;
}

/**
 * Строка меньше или равна максимальной длине
 */
const isMatchMaxLength = (value, length, trim = true) => {
    if (typeof value === 'string') {
        if (trim) {
            value = value.trim();
        }
        return value.length <= length;
    } else if (typeof value === 'number') {
        return value.toString().length <= length;
    }

    return !!value;
}

/**
 * Значение соответствует одному из возможных
 */
const isFitToAllowedvalues = (value, values, trim = true) => {
    if (typeof value === 'string' && trim) {
        value = value.trim();
    }
    return values.length > 0 ? values.indexOf(value) > -1 : true;
}

export { isMatch, isEmpty, isMatchMinLength, isMatchMaxLength, isFitToAllowedvalues };