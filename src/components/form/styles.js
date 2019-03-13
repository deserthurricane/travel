import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    formContainer: {
		paddingHorizontal: 10,
		backgroundColor: '#f4f3f3',
        borderRadius: 5
	},
    inputWrapper: {
        marginBottom: 10
    },
    input: {
        height: 44,
        paddingVertical: 12, 
        paddingHorizontal: 12, 
        backgroundColor: '#fff',
        borderColor: '#a6c6d1',
        borderWidth: 1,
        borderRadius: 4,
        color: 'black',
    },
    invalid: {
        borderColor: '#fd6120',
        backgroundColor: '#f9e9e2'
    },
    valid: {
        borderColor: '#a6c6d1',
    },
    label: {
        marginTop: 15,
        marginBottom: 5,
        fontSize: 12
    },
    hint: {
        color: '#fd6120',
        paddingVertical: 5,
    },
    radio: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        backgroundColor: '#fff',
        borderColor: '#a6c6d1',
        borderWidth: 1,
    },
    radioLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        color: '#fff'
    },
    radioRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 0,
        color: '#fff'
    },
    selected: {
        color: '#ffffff',
        backgroundColor: '#8c99ac'
    },
    radioGroup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    radioList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomColor: 'skyblue',
        borderBottomWidth: 1
    },
    radioListItem: {
        borderTopWidth: 0
    },
    selectIOS: {
        height: 44,
        paddingVertical: 12, 
        paddingHorizontal: 12,
        backgroundColor: '#fff', 
        borderColor: '#a6c6d1',
        borderWidth: 1,
        borderRadius: 4,
    },
    selectAndroid: {
        borderColor: '#a6c6d1',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 4,
    },
    submitButton: {
        borderRadius: 22,
        backgroundColor: '#f5a622',
        padding: 15,
        marginTop: 20,
        marginBottom: 20
    },
    disabledButton: {
        opacity: 0.5
    },
    submitLabel: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    }
});

export default styles;