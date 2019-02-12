import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, ScrollView, StyleSheet } from 'react-native';
import commonStyles from './styles';

export default class ControlModal extends Component {

	render() {
		const { title, data, modalVisible, onPress, children } = this.props;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType="slide"
					transparent={false}
					supportedOrientations={[
						'portrait', 
						'portrait-upside-down', 
						'landscape', 
						'landscape-left', 
						'landscape-right'
					]}
					visible={modalVisible}
					onRequestClose={() => {
						// do nothing
					}}
				>
					<View style={{ marginTop: 22 }}>
						<View style={styles.header}>
							<Text style={styles.title}>{title}</Text>
							<TouchableHighlight
								onPress={onPress}
							>
								<Text style={styles.close}>Закрыть</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.wrapper}>
							<Text>{data}</Text>
						</View>
						
					</View>
					<View style={styles.radioList}>
						<ScrollView 
							style={commonStyles.container} 
							contentContainerStyle={commonStyles.contentContainer}
						>
							{children}
						</ScrollView>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 10
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#999999',
		backgroundColor: '#f0f0f0',
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	title: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	close: {
		alignSelf: 'flex-end',
		fontSize: 18,
		fontWeight: 'bold',
		color: 'steelblue',
		textAlign: 'right'
	},
	radioList: {
		marginTop: -34
	}
});
