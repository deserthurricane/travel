import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // flex: 1,
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
    }
});

export default styles;