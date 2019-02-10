import React from 'react';
import { Text } from 'react-native';
import ControlInput from '../../components/form/fields/ControlInput';
import { validationRules } from './helpers';

export default function DocumentFormGroup(props) {
    const { handleInputChange, values, fieldValidity } = props;

    switch (values.document_type) {
        case 2:
            return (
                <React.Fragment>
                    <ControlInput
                        name="international_passport_series"
                        label="Серия загранпаспорта"
                        keyboardType="numeric"
                        maxLength={validationRules.international_passport_series.max_length}
                        onChange={handleInputChange}
                        value={values.international_passport_series}
                        error={fieldValidity.international_passport_series}
                    />
                    <ControlInput
                        name="international_passport_number"
                        label="Номер загранпаспорта"
                        keyboardType="numeric"
                        maxLength={validationRules.international_passport_number.max_length}
                        onChange={handleInputChange}
                        value={values.international_passport_number}
                        error={fieldValidity.international_passport_number}
                    />
                    <Text>Срок действия загранпаспорта</Text>
                    <ControlInput
                        name="international_passport_expiration_day"
                        label="День"
                        onChange={handleInputChange}
                        value={values.international_passport_expiration_day}
                        error={fieldValidity.international_passport_expiration_day}
                    />
                    <ControlInput
                        name="international_passport_expiration_month"
                        label="Месяц"
                        onChange={handleInputChange}
                        value={values.international_passport_expiration_month}
                        error={fieldValidity.international_passport_expiration_month}
                    />
                    <ControlInput
                        name="international_passport_expiration_year"
                        label="Год"
                        onChange={handleInputChange}
                        value={values.international_passport_expiration_year}
                        error={fieldValidity.international_passport_expiration_year}
                    />
                </React.Fragment>						
            );
        case 3:
            return (
                <React.Fragment>
                    <ControlInput
                        name="birth_certificate_series"
                        label="Серия свидетельства о рождении"
                        maxLength={validationRules.birth_certificate_series.max_length}
                        onChange={handleInputChange}
                        value={values.birth_certificate_series}
                        error={fieldValidity.birth_certificate_series}
                    />
                    <ControlInput
                        name="birth_certificate_number"
                        label="Номер свидетельства о рождении"
                        keyboardType="numeric"
                        maxLength={validationRules.birth_certificate_number.max_length}
                        onChange={handleInputChange}
                        value={values.birth_certificate_number}
                        error={fieldValidity.birth_certificate_number}
                    />
                </React.Fragment>
            );
        case 1:    
        default:
            return (
                <React.Fragment>
                    <ControlInput
                        name="civil_passport_series"
                        label="Серия паспорта"
                        keyboardType="numeric"
                        maxLength={validationRules.civil_passport_series.max_length}
                        onChange={handleInputChange}
                        value={values.civil_passport_series}
                        error={fieldValidity.civil_passport_series}
                    />
                    <ControlInput
                        name="civil_passport_number"
                        label="Номер паспорта"
                        keyboardType="numeric"
                        maxLength={validationRules.civil_passport_number.max_length}
                        onChange={handleInputChange}
                        value={values.civil_passport_number}
                        error={fieldValidity.civil_passport_number}
                    />
                </React.Fragment>
            );
    }
}