import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        height: 40,
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 4,
        color: 'black',
    },
    focused: {
        borderColor: 'steelblue',
    },
    invalid: {
        borderColor: 'red',
    },
    valid: {
        borderColor: 'green',
    },
});

export default styles;