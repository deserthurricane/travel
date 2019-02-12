import React from 'react';
import { View } from 'react-native';
import ControlInput from '../../components/form/fields/ControlInput';
import DateFormGroup from './DateFormGroup';
import { validationRules, isDateBigger } from './helpers';
import styles from './styles';
// import headingStyles from '../../components/heading/styles';

export default function DocumentFormGroup(props) {
    const { handleInputChange, values, fieldValidity } = props;

    switch (values.document_type) {
        case 2:
            return (
                <React.Fragment>
                    <View style={styles.formRow}>
                        <View style={styles.seriesField}>
                            <ControlInput
                                name="international_passport_series"
                                label="Серия"
                                keyboardType="numeric"
                                mask="99"
                                maxLength={validationRules.international_passport_series.max_length}
                                onChange={handleInputChange}
                                value={values.international_passport_series}
                                error={fieldValidity.international_passport_series}
                            />
                        </View>
                        <View style={styles.numberField}>
                            <ControlInput
                                name="international_passport_number"
                                label="Номер"
                                keyboardType="numeric"
                                mask="9999999"
                                maxLength={validationRules.international_passport_number.max_length}
                                onChange={handleInputChange}
                                value={values.international_passport_number}
                                error={fieldValidity.international_passport_number}
                            />
                        </View>
                    </View>
                    <DateFormGroup
                        label="Срок действия загранпаспорта"
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
                <View style={styles.formRow}>
                    <View style={styles.seriesField}>
                            <ControlInput
                                name="birth_certificate_series"
                                label="Серия"
                                mask="AA-АA"
                                translation={{
                                    '-': function(val) {
                                        if (val === '-') {
                                            return val;
                                        }
                                        return null
                                    }
                                }}
                                maxLength={validationRules.birth_certificate_series.max_length}
                                onChange={handleInputChange}
                                value={values.birth_certificate_series}
                                error={fieldValidity.birth_certificate_series}
                            />
                        </View>
                        <View style={styles.numberField}>
                            <ControlInput
                                name="birth_certificate_number"
                                label="Номер"
                                keyboardType="numeric"
                                mask="999999"
                                maxLength={validationRules.birth_certificate_number.max_length}
                                onChange={handleInputChange}
                                value={values.birth_certificate_number}
                                error={fieldValidity.birth_certificate_number}
                            />
                        </View>
                </View>
            );
        case 1:    
        default:
            return (
                <View style={styles.formRow}>
                    <View style={styles.seriesField}>
                        <ControlInput
                            name="civil_passport_series"
                            label="Серия"
                            keyboardType="numeric"
                            mask="9999"
                            maxLength={validationRules.civil_passport_series.max_length}
                            onChange={handleInputChange}
                            value={values.civil_passport_series}
                            error={fieldValidity.civil_passport_series}
                        />
                    </View>
                    <View style={styles.numberField}>
                        <ControlInput
                            name="civil_passport_number"
                            label="Номер"
                            mask="999999"
                            keyboardType="numeric"
                            maxLength={validationRules.civil_passport_number.max_length}
                            onChange={handleInputChange}
                            value={values.civil_passport_number}
                            error={fieldValidity.civil_passport_number}
                        />
                    </View>
                </View>
            );
    }
}