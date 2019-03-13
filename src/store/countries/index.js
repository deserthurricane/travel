import { getCountries } from '../../api/countries';
import { normalizeCountriesOptions } from './helpers';

/**
 * State
 */
const initialState = {
    isFetching: false,
    error: null,
    data: null,
};

/**
 * Selectors
 */
export const countriesSelector = (state) => state.countries.data;

/**
 * Actions
 */
const FETCH_COUNTRIES = 'FETCH_COUNTRIES';

/**
 * Reducer
 */
export default function countriesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_COUNTRIES:
            if (!action.payload) {
                return {
                    ...state,
                    isFetching: true,
                    error: null,
                };
            }

            if (action.payload.status === 'error') {
                return {
                    ...state,
                    isFetching: false,
                    error: action.payload.error,
                };
            }

            return {
                ...state,
                data: action.payload.data,
                isFetching: false,
                error: null,
            };
        default:
            return state;
    }
}

/**
 * Action creators
 */
export const fetchCountriesActionCreator = (payload) => ({
    type: FETCH_COUNTRIES,
    payload,
});

/**
 * Получение списка стран
 */
export const fetchCountriesThunkActionCreator = () => {
    return async (dispatch, getState) => {
        const state = getState();

        if (state.countries.isFetching) {
            return;
        }

        dispatch(fetchCountriesActionCreator());

        try {
            const response = await getCountries();
            const countries = normalizeCountriesOptions(response.data);     

            dispatch(fetchCountriesActionCreator({ status: 'success', data: countries }));
        } catch (reason) {
            const error = reason.response && reason.response.data || reason.message;
            dispatch(fetchCountriesActionCreator({ status: 'error', error }));
            throw new Error(error);
        }
    };
};