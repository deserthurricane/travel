import React from 'react';
import Form from './Form';
import { getBrokenRules, createValidators, createErrors } from './validation-helpers';


class ControlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.initialValues || {},
            fieldValidity: {},
            formValidity: false,
        };
        this.validators = {};
        this.messages = {};
        for (const fieldName in props.initialValues) {
            this.validators[fieldName] = createValidators(this.props.rules[fieldName]);
            this.messages[fieldName] = createErrors(this.props.rules[fieldName]);
        }
    }

    async componentDidMount() {
        /** Валидация initialValue */
        const { values } = this.state;
        const fieldNames = Object.keys(values);
        if (fieldNames.length) {
            for (const fieldName of fieldNames) {
                if (values[fieldName]) {
                    await this.checkFieldValidity(fieldName, values[fieldName]);
                }
            }
        }
    }

    checkFormValidity = () => {
        const { values, fieldValidity } = this.state;
        const isFormFilled = Object.values(values).every((fieldValue) => {
            return fieldValue;
        });
        const areFieldsValid = Object.values(fieldValidity).every((errorMessage) => {
            return !errorMessage;
        });
        this.setState({
            formValidity: isFormFilled && areFieldsValid,
        });
    }

    checkFieldValidity = async (name, value) => {
        // const { validators, messages } = this.props;
        const brokenRules = getBrokenRules(value, this.validators[name]);
        console.log(brokenRules, 'brokenRules');

        if (!brokenRules.length) {
            await this.setState({ 
                fieldValidity: {
                    ...this.state.fieldValidity, 
                    [name]: '',
                },
            });
        } else {
            await this.setState({ 
                fieldValidity: {
                    ...this.state.fieldValidity, 
                    [name]: this.messages[name][brokenRules[0]],
                },
            });
        }
    }

    handleInputChange = (name, value) => {
        this.setState({
            values: {
                ...this.state.values,
                [name]: value,
            },
        });
        this.checkFieldValidity(name, value);
    }

    handleSubmit = async () => {  
        try {
            await this.props.onSubmit(this.state.values);
            if (this.props.handleSubmitSuccess) {
                this.props.handleSubmitSuccess();
            }
        } catch (error) {
            // this.handleSubmitFailed(error);
        }
    };

    // handleSubmitFailed = (error) => {
    // };
    
    render() {
        const {
            children,
            render,
        } = this.props;
        const { values, fieldValidity, formValidity } = this.state;
        const handleInputChange = this.handleInputChange;

        console.log(fieldValidity.surname);
        
        return (
            <Form>
                {render && render({values, handleInputChange, fieldValidity, formValidity})}
            </Form>
        );
    }
}

export default ControlForm;