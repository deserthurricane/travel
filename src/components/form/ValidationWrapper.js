import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ruleSelector } from 'ducks/rules';
import { createValidators, createErrors } from '../ducks/rules/helpers';

const emptyValidators = {};
const emptyMessages = {};

const makeValidatorsSelector = () => {
    return createSelector(
        [ruleSelector],
        (rule) => {
            if (!rule) {
                return emptyValidators;
            }
            return createValidators(rule);
        },
    );
};

const makeMessagesSelector = () => {
    return createSelector(
        [ruleSelector],
        (rule) => {
            if (!rule) {
                return emptyMessages;
            }
            return createErrors(rule);
        },
    );
};

const makeMapStateToProps = () => {
    return (state, props) => {
        const { initialValues } = props;
        
        const validatorsSelector = makeValidatorsSelector();
        const messagesSelector = makeMessagesSelector();

        const formValidators = {};
        const formErrorMessages = {};

        for (const fieldName in initialValues) {
            formValidators[fieldName] = validatorsSelector(state, fieldName);
            formErrorMessages[fieldName] = messagesSelector(state, fieldName);
        }

        return {
            validators: formValidators,
            messages: formErrorMessages,
        };
    };
};

const withValidators = (FormComponent) => {
    return connect(makeMapStateToProps, null)(FormComponent);
}

export default withValidators;