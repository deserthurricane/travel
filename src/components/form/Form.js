import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import KeyboardShift from '../../components/KeyboardShift';

/**
 * Стандартная форма
 */
export default class Form extends React.Component {
    render() {
        return (
            <KeyboardShift>
				{() => (
                    <View style={styles.formContainer}>
                        {this.props.children}
                    </View>
                )}
            </KeyboardShift>
        );
    }
}