const validationRules = {
    surname: {
        allowed_values: [],
        max_length: 30,
        message: "Без пробелов и спецсимволов, только латиница или кириллица",
        min_length: 1,
        path: "surname",
        regex_js: "[A-Za-zА-Яа-я]*"
    }
};

const emptyValues = {
    name: '',
    surname: '',
    sex: '',
    day: '',
    month: '',
    year: '',
    document_series: '',
    document_number: '',
    document_date: '',
    cell_phone: '',
    email: '',
    employment_income: '',
};

export { validationRules, emptyValues };