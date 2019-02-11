import React from 'react';
import { Platform, View } from 'react-native';
import SelectAndroid from './SelectAndroid'; 
import SelectIOS from './SelectIOS';
import Label from './components/Label';

export default class ControlSelect extends React.Component {
    render() {
        const {
            options,
            selectedValue,
            defaultValue,
            onChange,
            error,
            name,
            label
        } = this.props;

        if (Platform.OS === 'ios') {
            return (
                <View>
                    <Label>
                        {label}
                    </Label>
                    <SelectIOS 
                        name={name}
                        defaultValue={defaultValue}
                        options={options} 
                        selectedValue={selectedValue || defaultValue}
                        onChange={onChange}
                        error={error}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <Label>
                        {label}
                    </Label>
                    <SelectAndroid
                        name={name}
                        defaultValue={defaultValue}
                        options={options} 
                        selectedValue={selectedValue}
                        onChange={onChange}
                        error={error}
                    />
                </View>
            );
        }
    }
}