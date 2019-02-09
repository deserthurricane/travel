import React from 'react';
import { Platform } from 'react-native';
import SelectAndroid from './SelectAndroid'; 
import SelectIOS from './SelectIOS';

export default class ControlSelect extends React.Component {
    render() {
        const {
            options,
            value,
            defaultValue,
            onChange,
            error
        } = this.props;

        if (Platform.OS === 'ios') {
            return (
                <SelectIOS 
                    name="document_type"
                    defaultValue={defaultValue}
                    options={options} 
                    selectedValue={value || defaultValue}
                    onChange={onChange}
                    error={error}
                />
            )
        } else {
            return (
                <SelectAndroid
                    name="document_type"
                    defaultValue={defaultValue}
                    options={options} 
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            );
        }
    }
}