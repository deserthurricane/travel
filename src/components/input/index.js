import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';

export default class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false
        };
    }
    
    toggleFocusState = () => {
        this.setState({
            focused: !this.state.focused
        });
    }

    render() {  
        // const { onChange } = this.props;  
        const { focused } = this.state;
        return (
            <TextInput 
                // {...props}
                style={focused 
                    ? {
                        ...styles.input,
                        ...styles.focused
                    }
                    : styles.input
                }
                // onChange={onChange}
                onFocus={this.toggleFocusState}
                onBlur={this.toggleFocusState}
            />
        );
    }
}