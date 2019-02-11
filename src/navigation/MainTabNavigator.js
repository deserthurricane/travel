import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import PassengerScreen from '../screens/passenger-screen/PassengerScreen';

const PassengerStack = createStackNavigator({
  Passenger: PassengerScreen,
});

PassengerStack.navigationOptions = {
  tabBarLabel: 'Passenger',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-person`
          : 'md-person'
      }
    />
  ),
};

export default createBottomTabNavigator({
  PassengerStack,
});
