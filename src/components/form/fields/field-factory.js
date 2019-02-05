import * as React from 'react';
import { fieldClassNames, FieldWrapper } from './styled';
import { process } from 'services/styles-utils.ts';
import Title from './components/title';
import Hint from './components/hint';
import ErrorHint from './components/error-hint';
import Icon, { StatusTypes } from './components/icon';

/**
 * Фабрика для текстового поля ввода и селекта, обеспечивает необходимый внешний вид,
 * выводит название поля, текст подсказки или ошибки
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
            const newActiveState = focused || !this.isInputValueEmpty();

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
                hint,
                error,
                subHint,
            } = this.props;

            if (this.isInvalid()) {
                return <ErrorHint>{error}</ErrorHint>;
            } else if (hint) {
                return <Hint subHint={subHint}>{hint}</Hint>;
            }

            return null;
        };
        
        render() {   
            const {
                className,
                value,
                label,
                touched,
                hint,
                error,
                subHint,
                required,
                disabled,
                isLoading,
                alwaysActiveTitle,
                defaultValue,
                inputRef,
                classic,
                ...inputProps,
            } = this.props;
            const { active } = this.state;
            const isInvalid = this.isInvalid();
            const showIcon = touched || isLoading;
            const activeTitle = alwaysActiveTitle || active
                || value && value.length > 0
                || defaultValue && defaultValue.length > 0;
            const classes = process(
                className,
                fieldClassNames.TextField,
                {
                    [fieldClassNames.TextFieldInvalid]: isInvalid,
                    [fieldClassNames.TextFieldDisabled]: disabled,
                    [fieldClassNames.TextFieldWithIcon]: showIcon,
                },
            );
            let iconStatus = StatusTypes.valid;

            if (error) {
                iconStatus = StatusTypes.invalid;
            }
            if (isLoading) {
                iconStatus = StatusTypes.loading;
            }

            return (
                <FieldWrapper>
                    <div className={classes} ref={(el) => this.containerElement = el}>
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
                        {showIcon && <Icon status={iconStatus} />}
                        <Title
                            input={inputProps.id || inputProps.name}
                            title={label}
                            required={required}
                            active={activeTitle}
                        />
                        {this.renderHint()}
                    </div>
                </FieldWrapper>
            );
        }
    }
    
    return Field;
}

export default fieldFactory;