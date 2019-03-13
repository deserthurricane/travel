import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import commonStyles from './styles';

export default class ControlModal extends Component {

	render() {
		const { title, data, modalVisible, onPress, children } = this.props;
		return (
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
				presentationStyle="pageSheet"
				visible={modalVisible}
				onRequestClose={() => {
					// do nothing
				}}
			>
				<SafeAreaView style={{ flex: 1 }}>		
					<View>
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
				</SafeAreaView>
			</Modal>
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
		borderBottomColor: '#a6c6d1',
		backgroundColor: '#f4f3f3',
		paddingVertical: 20,
		paddingHorizontal: 10,
		paddingTop: 20
	},
	title: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	close: {
		alignSelf: 'flex-end',
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
		textAlign: 'right'
	},
	radioList: {
		marginTop: -34,
		flex: 1,
		borderBottomColor: '#a6c6d1',
        borderBottomWidth: 1
	}
});
