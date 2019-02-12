import React from 'react';
import { Text, View } from 'react-native';
import Label from '../../components/form/fields/components/Label';
import ControlInput from '../../components/form/fields/ControlInput';
import styles from './styles';

const currentDate = Date.now();

export default class DateFormGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateError: '',
        };
    }

    componentDidUpdate(prevProps) {
        this.checkDateValidity(prevProps);
	}

    checkDateValidity = (prevProps) => {
        const dateProps = ['dayName', 'monthName', 'yearName'];
        const isDateChanged = dateProps.some((prop) => {
            return prevProps.values[prevProps[prop]] !== this.props.values[this.props[prop]];
        });
        const hasAllValues = dateProps.every((prop) => {
            return this.props.values[this.props[prop]];
        });
        if (isDateChanged && hasAllValues) {
            const { values, dayName, monthName, yearName, compareDateFn } = this.props;
            const inputDate = new Date(
                values[yearName],
                values[monthName],
                values[dayName] 
            ).getTime();
            const dateErrorMessage = compareDateFn(inputDate, currentDate);
            if (dateErrorMessage) {
                this.setState({
                    dateError: dateErrorMessage
                });
            } else {
                this.setState({
                    dateError: ''
                });
            }
        }
    }

    render() {
        const { 
            label,
            dayName, 
            monthName, 
            yearName, 
            values, 
            fieldValidity, 
            handleInputChange 
        } = this.props;
        const { dateError } = this.state;
        return (
            <React.Fragment>
                <Label>{label}</Label>
                <View style={styles.formRow}>
                    <View style={styles.dateField}>
                        <ControlInput
                            name={dayName}
                            keyboardType="numeric"
                            onChange={handleInputChange}
                            value={values[dayName]}
                            error={fieldValidity[dayName]}
                        />
                    </View>
                    <View style={styles.dateField}>
                        <ControlInput
                            name={monthName}
                            keyboardType="numeric"
                            onChange={handleInputChange}
                            value={values[monthName]}
                            error={fieldValidity[monthName]}
                        />
                    </View>
                    <View style={styles.dateField}>
                        <ControlInput
                            name={yearName}
                            keyboardType="numeric"
                            onChange={handleInputChange}
                            value={values[yearName]}
                            error={fieldValidity[yearName]}
                        />
                    </View>
                </View>
                <Text style={{color: 'red', marginBottom: 20}}>{dateError}</Text>
            </React.Fragment>
        );
    }
}