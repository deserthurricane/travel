import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import PassengerScreen from '../screens/passenger-screen/PassengerScreen';
import store from '../store';

const PassengerNavigator = createStackNavigator({
  Passenger: PassengerScreen,
});

export default class ConnectedPassengerNavigator extends React.Component {
  static router = PassengerNavigator.router;

  render() {
    return (
      <Provider store={store}>
        <PassengerNavigator navigation={this.props.navigation}/>
      </Provider>
    );
  }
}