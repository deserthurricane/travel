import React from 'react';
import { View } from 'react-native';
import ControlForm from '../../components/form/ControlForm';
import ControlInput from '../../components/form/fields/ControlInput';
import { validationRules, emptyValues } from './helpers';

export default class PassengerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValues: emptyValues,
            rules: validationRules
        };
    }

    handleSubmit = async (values) => {
        const { dispatch } = this.props;
        await dispatch(mergeApplicationActionCreator(values));
        try {
            await dispatch(thunkActions.createOrUpgrade(true));
        } catch (error) {
            throw error;
        }
    };

    render() {
        const { initialValues } = this.state;

        return (
            <ControlForm
                initialValues={initialValues}
                rules={validationRules}
                onSubmit={this.handleSubmit}
                render={({
                    values = initialValues, 
                    handleInputChange, 
                    fieldValidity,
                    formValidity,
                }) => (
                    <View>
                        <ControlInput
                            name="surname" 
						    label="Фамилия"
                            onChange={handleInputChange}
                            value={values.surname}
                            error={fieldValidity.surname || ''}
					    />
                    </View>
                )}
            />
        );
    }
}