import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Form from './Form';
import { getBrokenRules, createValidators, createErrors } from './validation-helpers';
import styles from './styles';

class ControlForm extends React.Component {
    validators = {}; // Функции-валидаторы
    messages = {}; // Тексты ошибок в соответствии с правилами валидации
    formRefs = {}; // Ссылки на отображаемые поля формы, которые обязательны для заполнения

    constructor(props) {
        super(props);
        this.state = {
            values: props.initialValues || {},
            fieldValidity: {},
            formValidity: false,
        };
        for (const fieldName in props.initialValues) {
            this.validators[fieldName] = createValidators(this.props.rules[fieldName]);
            this.messages[fieldName] = createErrors(this.props.rules[fieldName]);
            this.formRefs = {
                ...this.formRefs,
                [fieldName]: React.createRef()
            };
        }
    }

    /** Получаем имена обязательных полей, отображаемых на странице */
    getAllRequiredFields = () => {
        return Object.keys(this.state.values).filter((field) => {
            return this.formRefs[field].current;
        });
    }

    checkFormValidity = () => {
        const { values, fieldValidity } = this.state;
        const requiredFields = this.getAllRequiredFields();

        const formValidity = requiredFields.every((field) => {
            return values[field] && !fieldValidity[field];
        });
        this.setState({
            formValidity
        });
    }

    checkFieldValidity = async (name, value) => {
        const brokenRules = getBrokenRules(value, this.validators[name]);

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
        this.checkFormValidity();
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
        } catch (error) {
            throw error;
        }
    };
    
    render() {
        const {
            render,
            submitLabel
        } = this.props;
        const { values, fieldValidity, formValidity } = this.state;
        const handleInputChange = this.handleInputChange;
        const formRefs = this.formRefs;
        
        return (
            <Form>
                {render && render({values, handleInputChange, fieldValidity, formValidity, formRefs})}
                <TouchableOpacity
                    style={formValidity ? styles.submitButton : {
                        ...styles.submitButton,
                        ...styles.disabledButton
                    }}
					onPress={this.handleSubmit}
                    disabled={!formValidity}
				>
					<Text style={styles.submitLabel}>{submitLabel}</Text>
				</TouchableOpacity>
            </Form>
        );
    }
}

export default ControlForm;