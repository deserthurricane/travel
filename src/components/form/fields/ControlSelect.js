import React from 'react';
import { Platform } from 'react-native';
import SelectAndroid from './SelectAndroid'; 
import SelectIOS from './SelectIOS';

export default class ControlSelect extends React.Component {
    render() {
        const {
            options,
            selectedValue,
            defaultValue,
            onChange,
            error,
            name
        } = this.props;

        if (Platform.OS === 'ios') {
            return (
                <SelectIOS 
                    name={name}
                    defaultValue={defaultValue}
                    options={options} 
                    selectedValue={selectedValue || defaultValue}
                    onChange={onChange}
                    error={error}
                />
            )
        } else {
            return (
                <SelectAndroid
                    name={name}
                    defaultValue={defaultValue}
                    options={options} 
                    selectedValue={selectedValue}
                    onChange={onChange}
                    error={error}
                />
            );
        }
    }
}