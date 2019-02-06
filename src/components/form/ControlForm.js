import React from 'react';
import Form from './Form';
import withValidators from './ValidationWrapper';
import { getBrokenRules } from './validation-helpers';

class ControlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: props.initialValues || {},
            fieldValidity: {},
            formValidity: false,
        };
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
        const { validators, messages } = this.props;
        const brokenRules = getBrokenRules(value, validators[name]);

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
                    [name]: messages[name][brokenRules[0]],
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
        
        return (
            <Form
            >
                {children}
                {render && render({values, handleInputChange, fieldValidity, formValidity})}
            </Form>
        );
    }
}

export default withValidators(ControlForm);