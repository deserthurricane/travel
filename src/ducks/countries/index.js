import { Dispatch } from 'redux';
import { Statuses as asyncStatuses } from 'ducks/async-payload.h';
import { IRules as IRulesClient, IRulesNormalized, getRules, normalizeRules } from 'services/client/rules';

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
export const rulesSelector = (state) => state.rules.data;

export const ruleSelector = (state, rule) => state.rules.data[rule];

// export const getRuleSelector = <P extends { rulePath?: string }>(
//     state: IWithWidgetRules,
//     props: P,
// ): IRulesClient => state.rules.data[props.rulePath];

/**
 * Constants
 */
export const FETCH_RULES = 'widget/rules/FETCH_RULES';

/**
 * Actions
 */


/**
 * Reducer
 */
export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RULES:
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
                data: { ...action.payload.data },
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
export const fetchRulesActionCreator = (payload) => ({
    type: FETCH_RULES,
    payload,
});

/**
 * Получение правил валидации
 */
export const fetchRulesThunkActionCreator = (route) => {
    return async (dispatch, getState) => {
        const state = getState();

        if (state.rules.isFetching) {
            return;
        }

        dispatch(fetchRulesActionCreator());

        try {
            const response = await getRules(route);
            const data = response.data;
            const rules = normalizeRules(data);
            
            dispatch(fetchRulesActionCreator({ status: asyncStatuses.success, data: rules }));
        } catch (reason) {
            const error = reason.response && reason.response.data || reason.message;
            dispatch(fetchRulesActionCreator({ status: asyncStatuses.error, error }));
            throw new Error(error);
        }
    };
};