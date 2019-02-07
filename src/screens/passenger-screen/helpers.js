const validationRules = {
    surname: {
        max_length: 30,
        message: "Только латиница или кириллица",
        min_length: 1,
        regex_js: "[A-Za-zА-Яа-я]*"
    },
    name: {
        max_length: 30,
        message: "Только латиница или кириллица",
        min_length: 1,
        regex_js: "[A-Za-zА-Яа-я]*"
    },
    birth_day: {
        message: "Введите число от 01 до 31",
        min_length: 2,
        max_length: 2,
        regex_js: "(0[1-9]|[12][0-9]|3[01])"
    },
    birth_month: {
        message: "Введите число от 01 до 12",
        min_length: 2,
        max_length: 2,
        regex_js: "(0[1-9]|1[012])"
    },
    birth_year: {
        message: "Введите число",
        min_length: 4,
        max_length: 4,
        regex_js: "^(19|20)\\d{2}$"
    },
    sex: {
        allowed_values: ["M", "F"],
        min_length: 1,
        max_length: 1,
        message: "Выберите пол пассажира"
    },
    document_type: {
        allowed_values: [1, 2, 3], // ["civil_passport", "international_passport", "birth_certificate"],
        min_length: 1,
        max_length: 1,
        message: "Выберите тип документа"
    },
    civil_passport_series: {
        min_length: 4,
        max_length: 4,
        regex_js: '\\d{4}',
        allowed_values: [],
        message: 'Неверная серия паспорта'
    },
    civil_passport_number: {
        min_length: 6,
        max_length: 6,
        regex_js: '\\d{6}',
        allowed_values: [],
        message: 'Неверный номер паспорта'
    },
    international_passport_series: {
        regex_js: '\\d{2}',
        min_length: 2,
        max_length: 2,
        message: 'Неверно указана серия загранпаспорта'
    },
    international_passport_number: {
        regex_js: '\\d{7}',
        min_length: 7,
        max_length: 7,
        message: 'Неверно указан номер паспорта'
    },
    international_passport_expiration_day: {
        message: "Введите число от 01 до 31",
        min_length: 2,
        max_length: 2,
        regex_js: "(0[1-9]|[12][0-9]|3[01])"
    },
    international_passport_expiration_month: {
        message: "Введите число от 01 до 12",
        min_length: 2,
        max_length: 2,
        regex_js: "(0[1-9]|1[012])"
    },
    international_passport_expiration_year: {
        message: "Введите число",
        min_length: 4,
        max_length: 4,
        regex_js: "^(20)\\d{2}$"
    },
    birth_certificate_series: {
        regex_js: '^(([XVI]){1,2}([А-Я]){1,2})$',
        min_length: 2,
        max_length: 4,
        message: 'Неверно указана серия свидетельства о рождении'
    },
    birth_certificate_number: {
        regex_js: '\\d{6}',
        min_length: 6,
        max_length: 6,
        message: 'Неверно указан номер свидетельства о рождении'
    },

};

const emptyValues = {
    name: '',
    surname: '',
    sex: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    document_type: '',
    civil_passport_series: '',
    civil_passport_number: '',
    international_passport_series: '',
    international_passport_number: '',
    international_passport_expiration_day: '',
    international_passport_expiration_month: '',
    international_passport_expiration_year: '',
    birth_certificate_series: '',
    birth_certificate_number: ''
};

export { validationRules, emptyValues };