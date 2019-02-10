/** State */
export const initialState = {
    name: '',
    surname: '',
    sex: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    document_type: 1,
    citizenship: 'RU',
    civil_passport_series: '',
    civil_passport_number: '',
    international_passport_series: '',
    international_passport_number: '',
    international_passport_expiration_day: '',
    international_passport_expiration_month: '',
    international_passport_expiration_year: '',
    birth_certificate_series: '',
    birth_certificate_number: ''
}

/**
 * Selectors
 */
export const passengerDataSelector = (state) => state.passengerData;

/** Actions */
const UPDATE_PASSENGER_DATA = 'UPDATE_PASSENGER_DATA';

/** Reducer */
export default function passengerDataReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PASSENGER_DATA:
            return {
                ...state,
                ...action.payload,
            }; 
        default:
            return state;
    }
}

/** Action Creators */
export function updatePassengerDataActionCreator(passengerData) {
    return {
        type: UPDATE_PASSENGER_DATA,
        payload: passengerData,
    };
}