import React from 'react';
import { View, Text } from 'react-native';
import ControlForm from '../../components/form/ControlForm';
import ControlInput from '../../components/form/fields/ControlInput';
import ControlRadioGroup from '../../components/form/fields/ControlRadioGroup';
import ControlSelect from '../../components/form/fields/ControlSelect'
import { validationRules, emptyValues } from './helpers';

const sexOptions = [
    {
        label: 'Мужчина',
        value: 'M'
    },
    {
        label: 'Женщина',
        value: 'F'
    },
];

const documentTypeOptions = [
    {
        label: 'Паспорт',
        value: 1
    },
    {
        label: 'Загранпаспорт',
        value: 2
    },
    {
        label: 'Свидетельство о рождении',
        value: 3
    },
];

export default class PassengerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initialValues: emptyValues,
			rules: validationRules
		};
	}

	handleSubmit = async values => {
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
					formValidity
				}) => (
						<View>
							<ControlInput
								name="surname"
								label="Фамилия"
								onChange={handleInputChange}
								value={values.surname}
								error={fieldValidity.surname || ''}
							/>
							<ControlInput
								name="name"
								label="Имя"
								onChange={handleInputChange}
								value={values.name}
								error={fieldValidity.name || ''}
							/>
							<Text>Дата рождения</Text>
							<ControlInput
								name="birth_day"
								label="День"
								onChange={handleInputChange}
								value={values.birth_day}
								error={fieldValidity.birth_day || ''}
							/>
							<ControlInput
								name="birth_month"
								label="Месяц"
								onChange={handleInputChange}
								value={values.birth_month}
								error={fieldValidity.birth_month || ''}
							/>
							<ControlInput
								name="birth_year"
								label="Год"
								onChange={handleInputChange}
								value={values.birth_year}
								error={fieldValidity.birth_year || ''}
							/>
                            <ControlRadioGroup
                                groupLabel="Пол"
                                name="sex"
                                options={sexOptions}
                                selectedValue={values.sex}
                                onChange={handleInputChange}
                                error={fieldValidity.sex || ''}
                            />
							<Text>Тип документа</Text>
                            <ControlSelect
                                name="document_type"
                                defaultValue={documentTypeOptions[0].value}
                                options={documentTypeOptions} 
                                value={values.document_type}
                                onChange={handleInputChange}
                                error={fieldValidity.document_type || ''}
                            />
							<ControlInput
								name="civil_passport_series"
								label="Серия паспорта"
								onChange={handleInputChange}
								value={values.civil_passport_series}
								error={fieldValidity.civil_passport_series || ''}
							/>
							<ControlInput
								name="civil_passport_number"
								label="Номер паспорта"
								onChange={handleInputChange}
								value={values.civil_passport_number}
								error={fieldValidity.civil_passport_number || ''}
							/>
							<ControlInput
								name="international_passport_series"
								label="Серия загранпаспорта"
								onChange={handleInputChange}
								value={values.international_passport_series}
								error={fieldValidity.international_passport_series || ''}
							/>
							<ControlInput
								name="international_passport_number"
								label="Номер загранпаспорта"
								onChange={handleInputChange}
								value={values.international_passport_number}
								error={fieldValidity.international_passport_number || ''}
							/>
							<Text>Срок действия загранпаспорта</Text>
							<ControlInput
								name="international_passport_expiration_day"
								label="День"
								onChange={handleInputChange}
								value={values.international_passport_expiration_day}
								error={fieldValidity.international_passport_expiration_day || ''}
							/>
							<ControlInput
								name="international_passport_expiration_month"
								label="Месяц"
								onChange={handleInputChange}
								value={values.international_passport_expiration_month}
								error={fieldValidity.international_passport_expiration_month || ''}
							/>
							<ControlInput
								name="international_passport_expiration_year"
								label="Год"
								onChange={handleInputChange}
								value={values.international_passport_expiration_year}
								error={fieldValidity.international_passport_expiration_year || ''}
							/>
							<ControlInput
								name="birth_certificate_series"
								label="Серия свидетельства о рождении"
								onChange={handleInputChange}
								value={values.birth_certificate_series}
								error={fieldValidity.birth_certificate_series || ''}
							/>
							<ControlInput
								name="birth_certificate_number"
								label="Номер свидетельства о рождении"
								onChange={handleInputChange}
								value={values.birth_certificate_number}
								error={fieldValidity.birth_certificate_number || ''}
							/>
							<Text>ОТПРАВИТЬ</Text>
						</View>
					)}
			/>
		);
	}
}
