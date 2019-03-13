import React from 'react';
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

        setStyles = () => {
            const isInvalid = this.isInvalid();
            
            if (isInvalid) {
                return {
                    ...styles.input,
                    ...styles.invalid,
                    ...this.props.style
                };
            } else {
                return {
                    ...styles.input,
                    ...this.props.style
                };
            }
        }

        isInvalid = () => {
            const { error, touched, invalidFormGroup } = this.props;
            return (error || invalidFormGroup) && touched;
        };

        handleChange = (value) => {
            const { onChange } = this.props;
            onChange(value.trim());
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
                inputRef,
                ...inputProps
            } = this.props;
            const inputStyles = this.setStyles();
            const isInvalid = this.isInvalid();

            return (
                <View ref={inputRef}>
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
                    {isInvalid && <Hint>{error}</Hint>}
                </View>
            );
        }
    }
    return React.forwardRef((props, ref) => {
        return <Field {...props} inputRef={ref} />;
    });
}

export default fieldFactory;