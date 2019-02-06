import * as React from 'react';
import { View } from 'react-native';
import { fieldClassNames, FieldWrapper } from './styled';
import { process } from 'services/styles-utils.ts';
import Label from './components/label';
import Hint from './components/hint';

/**
 * Фабрика для текстового поля ввода и селекта, обеспечивает необходимый внешний вид,
 * выводит название поля, текст ошибки
 */
function fieldFactory(Input) {
    class Field extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                active: false,
                focused: false,
            };
        }
        
        componentDidMount() {
            this.applyNewActiveState();
        }

        componentDidUpdate() {
            this.applyNewActiveState();
        }
        
        applyNewActiveState = () => {
            const { focused, active } = this.state;
            const newActiveState = focused /* || !this.isInputValueEmpty() */;

            if (active !== newActiveState) {
                this.setState({ active: newActiveState });
            }
        };

        isInvalid = () => {
            const { error, touched } = this.props;
            return error && touched;
        };
        
        handleFocus = (e, ...args) => {
            this.setState({ focused: true, active: true });
            
            const { onFocus } = this.props;
            if (onFocus) {
                onFocus(e, ...args);
            }
        };

        handleBlur = (e, ...args) => {
            const active = !!this.props.value;
            this.setState({ focused: false, active });
            
            const { onBlur } = this.props;
            if (onBlur) {
                onBlur(e, ...args);
            }
        };
        
        renderHint = () => {
            const {
                error,
            } = this.props;

            if (this.isInvalid()) {
                return <Hint>{error}</Hint>;
            }

            return null;
        };
        
        render() {   
            const {
                className,
                value,
                label,
                touched,
                error,
                required,
                disabled,
                isLoading,
                alwaysActiveTitle,
                defaultValue,
                inputRef,
                classic,
                ...inputProps,
            } = this.props;

            const isInvalid = this.isInvalid();
            const classes = process(
                className,
                fieldClassNames.TextField,
                {
                    [fieldClassNames.TextFieldInvalid]: isInvalid,
                    [fieldClassNames.TextFieldDisabled]: disabled,
                },
            );

            return (
                <View>
                    <div className={classes} ref={(el) => this.containerElement = el}>
                        <Label required={required}>
                            {label}
                        </Label>
                        <Input
                            {...inputProps}
                            ref={inputRef}
                            value={value}
                            defaultValue={defaultValue}
                            required={required}
                            disabled={disabled}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}
                            autoComplete="off"
                        />
                        {this.renderHint()}
                    </div>
                </View>
            );
        }
    }
    
    return Field;
}

export default fieldFactory;