import React from 'react';
import { Text } from 'react-native';
import styles from '../../styles';

export default class Label extends React.Component {
	render() {
		return <Text {...this.props} style={styles.label} />;
	}
}