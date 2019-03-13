import React from 'react';
import { View } from 'react-native';
import styles from './styles';

/**
 * Контейнер для полей формы
 */
export default function Form(props) {
    return (
        <View style={styles.formContainer}>
            {props.children}
        </View>
    );
}