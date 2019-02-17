import React from 'react';
import { View } from 'react-native';
import ControlInput from '../../components/form/fields/ControlInput';
import DateFormGroup from './DateFormGroup';
import { validationRules, isDateBigger } from './helpers';
import styles from './styles';

export default function DocumentFormGroup(props) {
    const { handleInputChange, values, fieldValidity, inputRefs } = props;

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
                                placeholder="12"
                                mask="99"
                                maxLength={validationRules.international_passport_series.max_length}
                                onChange={handleInputChange}
                                value={values.international_passport_series}
                                error={fieldValidity.international_passport_series}
                                inputRef={inputRefs.international_passport_series}
                            />
                        </View>
                        <View style={styles.numberField}>
                            <ControlInput
                                name="international_passport_number"
                                label="Номер"
                                keyboardType="numeric"
                                placeholder="3456789"
                                mask="9999999"
                                maxLength={validationRules.international_passport_number.max_length}
                                onChange={handleInputChange}
                                value={values.international_passport_number}
                                error={fieldValidity.international_passport_number}
                                inputRef={inputRefs.international_passport_number}
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
                        inputRefs={inputRefs} 
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
                                placeholder="XI-ДЖ"
                                mask="**-**"
                                keyboardType="default"
                                autoCapitalize="characters"
                                maxLength={validationRules.birth_certificate_series.max_length}
                                onChange={handleInputChange}
                                value={values.birth_certificate_series}
                                error={fieldValidity.birth_certificate_series}
                                inputRefs={inputRefs.birth_certificate_series}
                                autoCapitalize="characters"
                            />
                        </View>
                        <View style={styles.numberField}>
                            <ControlInput
                                name="birth_certificate_number"
                                label="Номер"
                                keyboardType="numeric"
                                placeholder="123456"
                                mask="999999"
                                maxLength={validationRules.birth_certificate_number.max_length}
                                onChange={handleInputChange}
                                value={values.birth_certificate_number}
                                error={fieldValidity.birth_certificate_number}
                                inputRef={inputRefs.birth_certificate_number}
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
                            placeholder="1234"
                            mask="9999"
                            maxLength={validationRules.civil_passport_series.max_length}
                            onChange={handleInputChange}
                            value={values.civil_passport_series}
                            error={fieldValidity.civil_passport_series}
                            inputRef={inputRefs.civil_passport_series}
                        />
                    </View>
                    <View style={styles.numberField}>
                        <ControlInput
                            name="civil_passport_number"
                            label="Номер"
                            placeholder="567890"
                            mask="999999"
                            keyboardType="numeric"
                            maxLength={validationRules.civil_passport_number.max_length}
                            onChange={handleInputChange}
                            value={values.civil_passport_number}
                            error={fieldValidity.civil_passport_number}
                            inputRef={inputRefs.civil_passport_number}
                        />
                    </View>
                </View>
            );
    }
}