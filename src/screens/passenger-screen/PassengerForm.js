import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ControlForm from '../../components/form/ControlForm';
import ControlInput from '../../components/form/fields/ControlInput';
import ControlRadioGroup from '../../components/form/fields/ControlRadioGroup';
import ControlSelect from '../../components/form/fields/ControlSelect';
import DocumentFormGroup from './DocumentFormGroup';
import DateFormGroup from './DateFormGroup';
import { 
	validationRules, 
	initialValues, 
	sexOptions, 
	documentTypeOptions,
	isDateSmallerOrEqual
} from './helpers';
import { countriesSelector, fetchCountriesThunkActionCreator } from '../../ducks/countries';

const mapStateToProps = (state) => ({
	countries: countriesSelector(state)
});

class PassengerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			initialValues: initialValues,
			rules: validationRules
		};
	}

	async componentDidMount() {
		await this.props.dispatch(fetchCountriesThunkActionCreator());
	}

	handleSubmit = async values => {
		// const { dispatch } = this.props;
		// await dispatch(mergeApplicationActionCreator(values));
		// try {
		// 	await dispatch(thunkActions.createOrUpgrade(true));
		// } catch (error) {
		// 	throw error;
		// }
	};

	render() {
		const { initialValues } = this.state;
		const { countries } = this.props;

		if (countries && countries.length) {
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
									error={fieldValidity.surname}
								/>
								<ControlInput
									name="name"
									label="Имя"
									onChange={handleInputChange}
									value={values.name}
									error={fieldValidity.name}
								/>
								<Text>Дата рождения</Text>
								<DateFormGroup
									dayName="birth_day" 
									monthName="birth_month" 
									yearName="birth_year" 
									values={values} 
									fieldValidity={fieldValidity} 
									handleInputChange={handleInputChange} 
									compareDateFn={isDateSmallerOrEqual}
								/>
								<ControlRadioGroup
									groupLabel="Пол"
									name="sex"
									options={sexOptions}
									selectedValue={values.sex}
									onChange={handleInputChange}
									error={fieldValidity.sex}
								/>
								<Text>Гражданство</Text>
								<ControlSelect
									name="citizenship"
									options={countries} 
									selectedValue={values.citizenship}
									onChange={handleInputChange}
								/>
								<Text>Тип документа</Text>
								<ControlSelect
									name="document_type"
									options={documentTypeOptions} 
									selectedValue={values.document_type}
									onChange={handleInputChange}
									error={fieldValidity.document_type}
								/>
								<DocumentFormGroup
									values={values}
									handleInputChange={handleInputChange}
									fieldValidity={fieldValidity}
								/>
								<Text>ОТПРАВИТЬ</Text>
							</View>
						)}
				/>
			);
		} else {
			return null;
		}
	}
}

export default connect(mapStateToProps)(PassengerForm);
