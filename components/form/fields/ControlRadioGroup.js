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
            touched: false,
        };
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

    render() {
        const {
            groupLabel,
            name,
            disabled,
            options,
            selectedValue,
            error, 
            inputRef
        } = this.props;

        const radioButtons = options.map((option, index) => {
            return (
                <Radiobutton
                    key={index}
                    index={index}
                    name={name}
                    label={option.label}
                    value={option.value}
                    selected={selectedValue === option.value}
                    disabled={disabled}
                    onPress={this.handleChange}
                    type="switcher"
                />
            );
        });

        return (
            <View>
                <Label>{groupLabel}</Label>
                <View ref={inputRef} style={styles.radioGroup}>
                    {radioButtons}
                </View>
                {!!error && <View style={{marginTop: -25}}>
                    <Hint>{error}</Hint>
                </View>}
            </View>
        );
    }
}

export default React.forwardRef((props, inputRef) => {
    return <ControlRadioGroup {...props} ref={inputRef} />});