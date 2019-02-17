import React from 'react';
import Input from './Input';
import MaskedInput from './MaskedInput';

export class ControlInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            touched: false,
        };
    }

    componentDidMount() {
        /** Изменение состояния поля на touched при наличии initialValue */
        const { value } = this.props;
        if (value) {
            this.setState({
                touched: true,
            });
        }
    }

    handleChange = (value) => {
        const { name, onChange } = this.props;
        onChange(name, value);

        if (!this.state.touched) {
            this.setState({
                touched: true,
            });
        }
    }

    handleBlur = async (value) => {
        if (this.props.hasOwnProperty('onBlur')) {
            this.props.onBlur(value);
        }
    }

    render() {
        const { touched } = this.state;
        const { value, error, mask, inputRef, ...inputProps } = this.props;

        if (!mask) {
            return (
                <Input 
                    {...inputProps}
                    value={value}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    touched={touched}
                    error={error}
                    ref={inputRef}
                />
            );
        } else {
            return (
                <MaskedInput 
                    {...inputProps}
                    type="custom"
                    options={{
                        mask
                    }}
                    value={value || ''}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    touched={touched}
                    error={error}
                    ref={inputRef}
                />
            );
        }
    }
}

export default ControlInput;