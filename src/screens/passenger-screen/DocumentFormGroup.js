import React from 'react';
import { Text } from 'react-native';
import ControlInput from '../../components/form/fields/ControlInput';
import DateFormGroup from './DateFormGroup';
import { validationRules, isDateBigger } from './helpers';

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
                        mask="99"
                        maxLength={validationRules.international_passport_series.max_length}
                        onChange={handleInputChange}
                        value={values.international_passport_series}
                        error={fieldValidity.international_passport_series}
                    />
                    <ControlInput
                        name="international_passport_number"
                        label="Номер загранпаспорта"
                        keyboardType="numeric"
                        mask="9999999"
                        maxLength={validationRules.international_passport_number.max_length}
                        onChange={handleInputChange}
                        value={values.international_passport_number}
                        error={fieldValidity.international_passport_number}
                    />
                    <Text>Срок действия загранпаспорта</Text>
                    <DateFormGroup
                        dayName="international_passport_expiration_day" 
                        monthName="international_passport_expiration_month" 
                        yearName="international_passport_expiration_year" 
                        values={values} 
                        fieldValidity={fieldValidity} 
                        handleInputChange={handleInputChange} 
                        compareDateFn={isDateBigger}
                    />
                </React.Fragment>						
            );
        case 3:
            return (
                <React.Fragment>
                    <ControlInput
                        name="birth_certificate_series"
                        label="Серия свидетельства о рождении"
                        mask="XV-АБ"
                        maxLength={validationRules.birth_certificate_series.max_length}
                        onChange={handleInputChange}
                        value={values.birth_certificate_series}
                        error={fieldValidity.birth_certificate_series}
                    />
                    <ControlInput
                        name="birth_certificate_number"
                        label="Номер свидетельства о рождении"
                        keyboardType="numeric"
                        mask="999999"
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
                        mask="9999"
                        maxLength={validationRules.civil_passport_series.max_length}
                        onChange={handleInputChange}
                        value={values.civil_passport_series}
                        error={fieldValidity.civil_passport_series}
                    />
                    <ControlInput
                        name="civil_passport_number"
                        label="Номер паспорта"
                        mask="999999"
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