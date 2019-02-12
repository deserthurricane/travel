import * as React from 'react';
import { View, Text } from 'react-native';
import Label from './components/Label';
import Hint from './components/Hint';
import styles from '../styles';

/**
 * Фабрика для текстового поля ввода и селекта, обеспечивает необходимый внешний вид,
 * выводит название поля, текст ошибки
 */
function fieldFactory(Input) {
    class Field extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                focused: false,
                styles: styles.input,
            };
        }

        setStyles = () => {
            const { error, value, touched } = this.props;
            const { focused } = this.state; 
            const isInvalid = this.isInvalid();
            
            if (isInvalid) {
                return {
                    ...styles.input,
                    ...styles.invalid,
                };
            } else if (!error && touched && value) {
                return {
                    ...styles.input,
                    ...styles.valid,
                };
            } else if (focused) {
                return {
                        ...styles.input,
                        ...styles.focused,
                };
            } else {
                return styles.input;
            }
        }

        isInvalid = () => {
            const { error, touched } = this.props;
            return error && touched;
        };

        handleChange = (value) => {
            const { onChange } = this.props;
            onChange(value);
        }
        
        handleFocus = () => {
            this.setState({ focused: true });
        };

        handleBlur = (value) => {
            this.setState({ focused: false });
            
            const { onBlur } = this.props;
            if (onBlur) {
                onBlur(value);
            }
        };
        
        render() {   
            const {
                value,
                label,
                touched,
                error,
                defaultValue,
                handleChange,
                ...inputProps
            } = this.props;
            const inputStyles = this.setStyles();
            const isInvalid = this.isInvalid();

            return (
                <View style={styles.inputWrapper}>
                    {label && <Label>
                        {label}
                    </Label>}
                    <Input
                        {...inputProps}
                        style={inputStyles}
                        value={value}
                        defaultValue={defaultValue}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChangeText={this.handleChange}
                    />
                    <Hint>{isInvalid ? error : ' '}</Hint>
                </View>
            );
        }
    }
    
    return Field;
}

export default fieldFactory;