import React from 'react';
import {Modal, Text, TouchableHighlight, View, Alert} from 'react-native';
import Radiobutton from './Radiobutton';
import styles from '../styles';

export default class SelectIOS extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleChange = (value) => {
    const { name, onChange } = this.props;
      onChange(name, value);
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
    const { selectedValue } = this.props;
    return (
      <View style={{marginTop: 20}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{marginTop: 22}}>
            <View style={{height: 500}}>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.radioList}>
                {this.renderRadioButtons()}
            </View>
          </View> 
        </Modal>

        <TouchableHighlight
          style={styles.selectIOS}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>{this.getSelectedOptionLabel()}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}