import React from 'react';
import { Text } from 'react-native';
import ControlInput from '../../components/form/fields/ControlInput';

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
                <ControlInput
                    name={dayName}
                    label="День"
                    keyboardType="numeric"
                    onChange={handleInputChange}
                    value={values[dayName]}
                    error={fieldValidity[dayName]}
                />
                <ControlInput
                    name={monthName}
                    label="Месяц"
                    keyboardType="numeric"
                    onChange={handleInputChange}
                    value={values[monthName]}
                    error={fieldValidity[monthName]}
                />
                <ControlInput
                    name={yearName}
                    label="Год"
                    keyboardType="numeric"
                    onChange={handleInputChange}
                    value={values[yearName]}
                    error={fieldValidity[yearName]}
                />
                <Text style={{color: 'red'}}>{dateError}</Text>
            </React.Fragment>
        );
    }
}