import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

export default class Radiobutton extends React.Component {
    onPress = () => {
        const { value, onPress } = this.props;
        onPress(value);
    }

    render() {
        const { index, label, selected, type, hideTopBorder } = this.props;

        let radioStyles = selected 
            ? {
                ...styles.radio,
                ...styles.selected
            }
            : styles.radio;
        if (hideTopBorder) {
            radioStyles = Object.assign({}, styles.radioListItem, radioStyles);
        }
        if (type === "switcher") {
            radioStyles = (index === 0) ? 
                Object.assign({}, styles.radioLeft, radioStyles)
                : Object.assign({}, styles.radioRight, radioStyles);
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