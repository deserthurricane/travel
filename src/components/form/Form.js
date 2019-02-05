import React from 'react';
import { View } from 'react-native';

/**
 * Стандартная форма
 */
export default class Form extends React.Component {
    render() {
        const {
            children,
            name,
            onReset,
            onSubmit,
            ...otherProps,
        } = this.props;

        return (
            <View
                {...otherProps}
                name={name}
                onSubmit={onSubmit}
                // noValidate={true}
                // autoComplete="off"
                // autoCorrect="off"
            >
                {children}
            </View>
        );
    }
}