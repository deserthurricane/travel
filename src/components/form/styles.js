import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formContainer: {
		paddingVertical: 20,
		paddingHorizontal: 10,
		backgroundColor: '#f0f0f0',
        borderRadius: 6
	},
    inputWrapper: {
        marginBottom: 10
    },
    input: {
        height: 40,
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        backgroundColor: '#fff',
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
    label: {
        marginBottom: 5
    },
    hint: {
        color: 'red'
    },
    radio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#fff',
        borderColor: 'skyblue',
        borderWidth: 1,
    },
    radioRight: {
        borderLeftWidth: 0,
        color: '#fff'
    },
    selected: {
        color: '#ffffff',
        backgroundColor: 'steelblue'
    },
    radioGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    radioList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomColor: 'skyblue',
        borderBottomWidth: 1
    },
    radioListItem: {
        borderBottomWidth: 0
    },
    selectIOS: {
        height: 40,
        paddingVertical: 10, 
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff', 
        borderColor: 'skyblue',
        borderWidth: 1,
        borderRadius: 4,
    },
    selectAndroid: {
        borderColor: 'skyblue',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
    },
    submitButton: {
        borderRadius: 4,
        backgroundColor: 'green',
        padding: 15,
    },
    submitLabel: {
        textAlign: 'center',
        color: '#fff'
    }
});

export default styles;