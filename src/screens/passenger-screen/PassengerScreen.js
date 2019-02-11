import React from 'react';
import {
  ScrollView,
  View,
  Dimensions
} from 'react-native';
import styles, {portraitStyles, landscapeStyles} from './styles';
import Heading from '../../components/heading/Heading';
import PassengerForm from './PassengerForm';
export default class PassengerScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	state = {
		screen: Dimensions.get('window')
	};

	getOrientation() {
		if (this.state.screen.width > this.state.screen.height) {
			return 'LANDSCAPE';
		} else {
			return 'PORTRAIT';
		}
	}

	getStyle() {
		if (this.getOrientation() === 'LANDSCAPE') {
			return landscapeStyles;
		} else {
			return portraitStyles;
		}
	}

	onLayout = () => {
		this.setState({ screen: Dimensions.get('window') });
	}

	render() {
		const layoutStyle = this.getStyle();
		const mergedStyles = {
			...styles,
			...layoutStyle
		};

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
