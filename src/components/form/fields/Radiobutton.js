import React from 'react';
import { TouchableOpacity } from 'react-native';
import styles from '../styles';
import Label from './components/Label';

export default class Radiobutton extends React.Component {
    onPress = () => {
        const { value, onPress } = this.props;
        onPress(value);
    }

    render() {
        const { label, selected } = this.props;

        const radioStyles = selected 
            ? {
                ...styles.radio,
                ...styles.selected
            }
            : styles.radio; 

        return (
            <TouchableOpacity
                style={radioStyles}
                onPress={this.onPress}
            >
                <Label> {label} </Label>
            </TouchableOpacity>
        );
    }
}