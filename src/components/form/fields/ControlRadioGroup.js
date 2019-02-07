import React from 'react';
import { View } from 'react-native';
import Radiobutton from './Radiobutton';
import Label from './components/Label';
import Hint from './components/Hint';
import styles from '../styles';

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

    handleChange = (value) => {
        const { name, onChange } = this.props;
        onChange(name, value);
        if (!this.state.pristine) {
            this.setState({
                touched: true,
            });
        }
    }

    render() {
        const {
            groupLabel,
            name,
            disabled,
            options,
            selectedValue,
            error
        } = this.props;

        const radioButtons = options.map((option, index) => {
            return (
                <Radiobutton
                    key={index}
                    name={name}
                    label={option.label}
                    value={option.value}
                    selected={selectedValue === option.value}
                    disabled={disabled}
                    onPress={this.handleChange}
                />
            );
        });

        return (
            <View>
                <Label>{groupLabel}</Label>
                <View style={styles.radioGroup}>
                    {radioButtons}
                </View>
                <Hint>{error}</Hint>
            </View>
        );
    }
}

export default ControlRadioGroup;