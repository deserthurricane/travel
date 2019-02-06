import React from 'react';
import { View } from 'react-native';
import Radiobutton from './radiobutton';
import { RadioGroupLabel } from './components/Label';
import Hint from './components/hint';

class ControlRadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pristine: true,
            touched: false,
        };
    }

    componentDidMount() {
        /** Валидация initialValue, изменение состояния поля на touched */
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
        if (this.state.pristine) {
            this.setState({
                pristine: false,
                touched: true,
            });
        }
    }

    renderHint = () => {
        const { error } = this.props;

        if (error) {
            return <Hint>{error}</Hint>;
        }

        return null;
    };

    render() {
        const {
            groupLabel,
            name,
            componentStyle,
            disabled,
            options,
            selectedValue,
        } = this.props;

        const radioButtons = options.map((option, index) => {
            return (
                <Radiobutton
                    key={index}
                    componentStyle={componentStyle}
                    name={name}
                    label={option.label}
                    value={option.value}
                    checked={selectedValue === option.value}
                    disabled={disabled}
                    onChange={this.handleChange}
                />
            );
        });

        return (
            <View>
                <RadioGroupLabel text={groupLabel} />
                {radioButtons}
                {this.renderErrorHint()}
            </View>
        );
    }
}

export default ControlRadioGroup;