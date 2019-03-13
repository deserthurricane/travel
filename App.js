import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default class App extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAvoidingView 
					style={{ flex: 1 }} 
					behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				>
					<AppNavigator/>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}