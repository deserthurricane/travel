import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ControlModal from '../Modal';
import Radiobutton from './Radiobutton';
import styles from '../styles';

export default class SelectIOS extends React.Component {
	state = {
		modalVisible: false,
	};

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	handleChange = (value) => {
		const { name, onChange } = this.props;
		onChange(name, value);
		this.setModalVisible(false)
	}

	renderRadioButtons = () => {
		const { options, name, selectedValue } = this.props;

		return options.map((option, index) => {
			return (
				<Radiobutton
					key={index}
					name={name}
					label={option.label}
					value={option.value}
					selected={selectedValue === option.value}
					onPress={this.handleChange}
					hideTopBorder={true}
				/>
			);
		});
	}

	getSelectedOptionLabel = () => {
		const { selectedValue, options } = this.props;
		return options.filter((option) => {
			return option.value === selectedValue;
		})[0].label;
	}

	render() {
		const { modalVisible } = this.state;
		return (
			<View>
				<TouchableOpacity
					style={styles.selectIOS}
					onPress={() => {
						this.setModalVisible(true)
					}}
				>
					<Text>{this.getSelectedOptionLabel()}</Text>
				</TouchableOpacity>
				{modalVisible && 
					<ControlModal
						onPress={() => this.setModalVisible(false)}
						children={this.renderRadioButtons()}
					/>
				}
			</View>
		);
	}
}