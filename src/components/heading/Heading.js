import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

export default class Heading extends React.Component {
	render() {
		return <Text {...this.props} style={styles.heading} />;
	}
}