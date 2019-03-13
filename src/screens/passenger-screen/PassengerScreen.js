import React from 'react';
import { ScrollView, View } from 'react-native';
import styles from './styles';
import Heading from '../../components/heading/Heading';
import PassengerForm from './PassengerForm';

export default class PassengerScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<View style={styles.container}>
				<ScrollView 
					style={styles.container} 
					contentContainerStyle={styles.contentContainer}
				>
					<Heading>Данные пассажиров</Heading>
					<PassengerForm/>
				</ScrollView>
			</View>
		);
	};
}
