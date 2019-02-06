import React from 'react';
import Input from './Input';
import MaskedInput from 'components/fields/masked-field/index';

export class ControlInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pristine: true,
            touched: false,
        };
    }

    componentDidMount() {
        /** Изменение состояния поля на touched при наличии initialValue */
        const { value } = this.props;
        if (value) {
            this.setState({
                pristine: false,
                touched: true,
            });
        }
    }

    handleChange = (e) => {
        this.props.onChange(e);
        if (!this.state.pristine) {
            this.setState({
                touched: true,
            });
        }
    }

    handleBlur = async (e) => {
        /** Показ тултипов, задается в родительском компоненте */
        if (this.props.hasOwnProperty('onBlur')) {
            this.props.onBlur(e);
        }
        /**
         * Срабатывает только при первом onblur, для 
         * валидации впервые введенного в поле значения 
         * и для изменения свойства pristine 
         */
        if (this.props.value && this.state.pristine) {
            this.setState({
                pristine: false,
                touched: true,
            });
        }
    }

    render() {
        const { touched } = this.state;
        const { value, error, mask, ...inputProps } = this.props;

        if (!mask) {
            return (
                <Input 
                    {...inputProps}
                    value={value || ''}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    touched={touched}
                    error={error}
                />
            );
        } else {
            return (
                <MaskedInput 
                    {...inputProps}
                    mask={mask}
                    value={value || ''}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    touched={touched}
                    error={error}
                />
            );
        }
    }
}

export default ControlInput;