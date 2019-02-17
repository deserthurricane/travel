import React from 'react';
import { View, Picker } from 'react-native';
import fieldFactory from './FieldFactory';
import styles from '../styles';

class SelectAndroid extends React.Component {
    handleChange = (value, index) => {
        const { name, onChange } = this.props;
        if (onChange) {
            onChange(name, value);
        }
    };

    renderOptions = () => {
        const { options } = this.props;
        return options.map(({label, value}, index) => {
            return (
                <Picker.Item
                    key={index}
                    label={label}
                    value={value}
                />
            );
        }); 
    }

    render() {
        const {
            options,
            selectedValue,
            defaultValue,
            ...selectProps
        } = this.props;

        return (
            <View style={styles.selectAndroid}>
                <Picker
                    selectedValue={selectedValue || defaultValue}
                    onValueChange={this.handleChange}
                    mode="dialog"
                >
                    {this.renderOptions()}
                </Picker>
            </View>
        );
    }
}

export default fieldFactory(SelectAndroid);