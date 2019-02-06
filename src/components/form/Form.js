import React from 'react';
import { View } from 'react-native';

/**
 * Стандартная форма
 */
export default class Form extends React.Component {
    render() {
        return (
            <View style={styles.form}>
                {this.props.children}
            </View>
        );
    }
}