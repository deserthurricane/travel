import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, Platform } from 'react-native';
import { Icon } from 'expo';

export default class ControlModal extends Component {
	state = {
		modalVisible: false,
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	handlePress = () => {
		if (this.props.onPress) {
			this.props.onPress();
		}
		this.setModalVisible(true);
	}

	render() {
		const { data, openText } = this.props;
		return (
			<View style={{ marginTop: 22 }}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						// do nothing
					}}
				>
					<View style={{ marginTop: 22 }}>
						<View>
							<TouchableHighlight
								onPress={() => {
									this.setModalVisible(!this.state.modalVisible);
								}}
							>
								<Icon.Ionicons
									name={Platform.OS === 'ios'
										? 'ios-close'
										: 'md-close'
									}
									size={26}
									style={{ marginBottom: 20 }}
									color={'skyblue'}
								/>
							</TouchableHighlight>
							<Text>{data}</Text>
						</View>
					</View>
				</Modal>

				<TouchableHighlight
					onPress={this.handlePress}
				>
					<Text>{openText}</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
