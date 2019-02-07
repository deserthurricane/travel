import React from 'react';
import Select from './Select'; 

export default class ControlSelect extends React.Component {
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
            ...selectProps
        } = this.props;
        const { localValue } = this.state;

        return (
            <Select
                selectedValue={localValue}
                style={{height: 50, width: 100}}
                onValueChange={this.handleChange}
            >
                <Select.Item label="Java" value="java" />
                <Select.Item label="JavaScript" value="js" />
            </Select>
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