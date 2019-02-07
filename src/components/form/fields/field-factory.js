import * as React from 'react';
import { View } from 'react-native';
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

        // componentDidUpdate() {

        //     // await this.applyNewActiveState();
        // }
        
        // applyNewActiveState = () => {
        //     const { focused } = this.state;
        //     const newActiveState = focused /* || !this.isInputValueEmpty() */;

        //     if (active !== newActiveState) {
        //         this.setState({ active: newActiveState });
        //     }
        // };

        setStyles = () => {
            const { error, value } = this.props;
            const { focused } = this.state; 
            if (error) {
                return {
                    ...styles.input,
                    ...styles.invalid,
                };
            } else if (!error && value) {
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
            this.props.onChange(value);
        }
        
        handleFocus = () => {
            this.setState({ focused: true });
            
            // const { onFocus } = this.props;
            // if (onFocus) {
            //     onFocus(e, ...args);
            // }
        };

        handleBlur = (e, ...args) => {
            // const active = !!this.props.value;
            this.setState({ focused: false });
            
            // const { onBlur } = this.props;
            // if (onBlur) {
            //     onBlur(e, ...args);
            // }
        };
        
        render() {   
            const {
                value,
                label,
                touched,
                error,
                required,
                disabled,
                isLoading,
                defaultValue,
                inputRef,
                classic,
                handleChange,
                ...inputProps
            } = this.props;

            const isInvalid = this.isInvalid();
            // const classes = process(
            //     className,
            //     fieldClassNames.TextField,
            //     {
            //         [fieldClassNames.TextFieldInvalid]: isInvalid,
            //         [fieldClassNames.TextFieldDisabled]: disabled,
            //     },
            // );

            const inputStyles = this.setStyles();

            return (
                <View>
                    <Label required={required}>
                        {label}
                    </Label>
                    <Input
                        {...inputProps}
                        style={inputStyles}
                        ref={inputRef}
                        value={value}
                        defaultValue={defaultValue}
                        required={required}
                        disabled={disabled}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChangeText={this.handleChange}
                    />
                    <Hint>{error}</Hint>
                </View>
            );
        }
    }
    
    return Field;
}

export default fieldFactory;