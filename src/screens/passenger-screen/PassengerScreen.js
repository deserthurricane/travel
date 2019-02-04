import React from 'react';
// import { connect } from 'redux';
import {
  ScrollView,
  View,
} from 'react-native';
import styles from './styles';
import Heading from '../../components/heading/Heading';
import Input from '../../components/form/input/index';

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
					<Input 
						placeholder="Тест"
					/>
					{/* <PassengerForm/> */}
				</ScrollView>
			</View>
		);
	};
}
