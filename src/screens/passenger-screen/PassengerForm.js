import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import ControlForm from '../../components/form/ControlForm';
import ControlInput from '../../components/form/fields/ControlInput';
import ControlRadioGroup from '../../components/form/fields/ControlRadioGroup';
import ControlSelect from '../../components/form/fields/ControlSelect';
import ControlModal from '../../components/modal/Modal';
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
import { passengerDataSelector, updatePassengerDataActionCreator } from '../../ducks/passenger';
import styles from './styles';

const mapStateToProps = (state) => ({
	countries: countriesSelector(state),
	passenger: passengerDataSelector(state)
});

class PassengerForm extends React.Component {
	state = {
		showFinalModal: false
	};

	componentDidMount() {
		this.props.dispatch(fetchCountriesThunkActionCreator());
	}

	handleSubmit = async (values) => {
		const { dispatch } = this.props;
		try {
			await dispatch(updatePassengerDataActionCreator(values));
			this.setState({
				showFinalModal: true
			});
		} catch (error) {
			// error handler
		}
	};

	closeModal = () => {
		this.setState({
			showFinalModal: false
		});
	}

	render() {
		const { countries, passenger } = this.props;
		const { showFinalModal } = this.state;

		if (countries && countries.length) {
			return (
				<View>
					<ControlForm
						initialValues={initialValues}
						rules={validationRules}
						onSubmit={this.handleSubmit}
						submitLabel="ОТПРАВИТЬ"
						render={({
							values = initialValues,
							handleInputChange,
							fieldValidity
					}) => (
							<View>
								<ControlInput
									name="surname"
									label="Фамилия"
									onChange={handleInputChange}
									value={values.surname}
									error={fieldValidity.surname}
									autoCapitalize="characters"
								/>
								<ControlInput
									name="name"
									label="Имя"
									onChange={handleInputChange}
									value={values.name}
									error={fieldValidity.name}
									autoCapitalize="characters"
								/>
								<DateFormGroup
									label="Дата рождения"
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
								<ControlSelect
									name="citizenship"
									label="Гражданство"
									options={countries} 
									selectedValue={values.citizenship}
									onChange={handleInputChange}
								/>
								<ControlSelect
									name="document_type"
									label="Тип документа"
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
							</View>
						)}
				/>     
				{showFinalModal && <ControlModal
					title="Данные пассажира"
					onPress={this.closeModal}
					data={JSON.stringify(passenger)}
				/>}
			</View>
			);
		} else {
			return null;
		}
	}
}

export default connect(mapStateToProps)(PassengerForm);
