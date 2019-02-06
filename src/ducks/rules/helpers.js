import { isMatch, isEmpty, isMatchMinLength, isMatchMaxLength, isFitToAllowedValues } from '../../utils/validation';

const ruleSelector = (state) => state.rules[rule];

const createValidators = (rule) => {
    if (!rule) {
        return {};
    }
    
    const validators = {};
    
    function isRequiredOrNotEmpty(value) {
        return rule.required || !isEmpty(value);
    }

    if ('required' in rule) {
        validators.required = (value) => !isEmpty(value);
    }

    if ('min_length' in rule) {
        validators.minLength = (value) => {
            return isRequiredOrNotEmpty(value) ? isMatchMinLength(value, rule.min_length) : true;
        };
    }

    if ('max_length' in rule) {
        validators.maxLength = (value) => {
            return isRequiredOrNotEmpty(value) ? isMatchMaxLength(value, rule.max_length) : true;
        };
    }

    if ('allowed_values' in rule) {
        validators.allowedValues = (value) => {
            return isRequiredOrNotEmpty(value) ? isFitToAllowedValues(value, rule.allowed_values) : true;
        };
    }

    if ('regex_js' in rule) {
        validators.match = (value) => {
            return isRequiredOrNotEmpty(value) ? isMatch(value, rule.regex_js) : true;
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
        errors.required = message;
    }

    if ('min_length' in rule) {
        errors.minLength = message;
    }

    if ('max_length' in rule) {
        errors.maxLength = message;
    }

    if ('allowed_values' in rule) {
        errors.allowedValues = message;
    }

    if ('regex_js' in rule) {
        errors.match = message;
    }

    return errors;
}

export { ruleSelector, createValidators, createErrors };