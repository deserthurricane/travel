import * as React from 'react';
import fieldFactory from 'components/fields/field-factory';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localValue: this.props.defaultValue || '',
        }
    }

    handleChange = (e) => {
        this.setState({
            localValue: itemValue
        });
        const { onChange } = this.props;
        if (onChange) {
            onChange(e);
        }
    };

    render() {
        const {
            options,
            renderOption,
            value,
            defaultValue,
            ...selectProps,
        } = this.props;
        const { localValue } = this.state;

        return (
            <Picker
                selectedValue={localValue}
                style={{height: 50, width: 100}}
                onValueChange={this.handleChange}
            >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
            // <select
            //     {...selectProps}
            //     value={resultValue}
            //     onChange={this.handleChange}
            // >
            //     {!resultValue && !defaultValue && <option value="" />}
            //     {options.map(renderOption)}
            // </select>
        );
    }
}

export default fieldFactory(Select);