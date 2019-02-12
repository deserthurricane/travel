import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

export default class Radiobutton extends React.Component {
    onPress = () => {
        const { value, onPress } = this.props;
        onPress(value);
    }

    render() {
        const { label, selected, hideLeftBorder, hideBottomBorder } = this.props;

        let radioStyles = selected 
            ? {
                ...styles.radio,
                ...styles.selected
            }
            : styles.radio;
        if (hideBottomBorder) {
            radioStyles = Object.assign({}, styles.radioListItem, radioStyles);
        }
        if (hideLeftBorder) {
            radioStyles = Object.assign({}, styles.radioRight, radioStyles);
        } 

        return (
            <TouchableOpacity
                style={radioStyles}
                onPress={this.onPress}
            >
                <Text style={{
                    color: selected ? '#fff' : '#000'
                }}> 
                    {label} 
                </Text>
            </TouchableOpacity>
        );
    }
}