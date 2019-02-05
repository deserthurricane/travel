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

export { getFirstErrorFromMessages, getBrokenRules };