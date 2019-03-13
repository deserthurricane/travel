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
const isEmpty = (value) => {
    if (typeof value === 'string') {
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
const isMatchMinLength = (value, length) => {
    if (typeof value === 'string') {
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

/**
 * Получить нарушенные правила валидации
 */
const getBrokenRules = (value, validators) => {
    const brokenRules = [];
    Object.keys(validators).forEach((validator) => {
        if (!validators[validator](value)) {
            brokenRules.push(validator);
        }
    });
    return brokenRules;
}

const createValidators = (rule, value) => {
    if (!rule) {
        return {};
    }
    
    const validators = {};

    if ('required' in rule) {
        validators.required = (value) => !isEmpty(value);
    }

    if ('min_length' in rule) {
        validators.minLength = (value) => {
            return isMatchMinLength(value, rule.min_length);
        };
    }

    if ('max_length' in rule) {
        validators.maxLength = (value) => {
            return isMatchMaxLength(value, rule.max_length);
        };
    }

    if ('allowed_values' in rule) {
        validators.allowedValues = (value) => {
            return isFitToAllowedvalues(value, rule.allowed_values);
        };
    }

    if ('regex_js' in rule) {
        validators.match = (value) => {
            return isMatch(value, rule.regex_js);
        };
    }

    return validators;
}

const createErrors = (rule) => {
    let message = rule && rule.message || '';
    
    if (!rule) {
        return {};
    }
    
    if (!rule.message) {
        message = 'Поле заполнено неверно';
    }

    const errors = {};

    if ('required' in rule) {
        errors.required = 'Поле обязательно для заполнения';
    }

    if ('min_length' in rule) {
        errors.minLength = `Минимальное количество символов ${rule.min_length}`;
    }

    if ('max_length' in rule) {
        errors.maxLength = `Максимальное количество символов ${rule.max_length}`;
    }

    if ('allowed_values' in rule) {
        errors.allowedValues = message;
    }

    if ('regex_js' in rule) {
        errors.match = message;
    }

    return errors;
}

export { getBrokenRules, createValidators, createErrors };