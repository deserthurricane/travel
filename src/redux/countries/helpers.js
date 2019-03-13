export function normalizeCountriesOptions(countries) {
    return countries.map(({label, code, ...rest}) => {
        return {
            label,
            value: code
        }
    })
}