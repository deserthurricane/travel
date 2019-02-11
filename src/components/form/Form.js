import React from 'react';
import { View } from 'react-native';
import styles from './styles';

/**
 * Стандартная форма
 */
export default class Form extends React.Component {
    render() {
        return (
            <View style={styles.formContainer}>
                {this.props.children}
            </View>
        );
    }
}