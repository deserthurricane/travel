import React from 'react';
import { createAppContainer, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import MainTabNavigator from './MainTabNavigator';
import { isIOS } from '../utils/is';

/** Навигация с табами для iOS и боковым меню для Android */
const createMainNavigator = isIOS ? createBottomTabNavigator : createDrawerNavigator;

export default createAppContainer(createMainNavigator({
  Avia: {
    screen: MainTabNavigator,
    navigationOptions: {
        title: 'Авиа',
        [isIOS ? 'tabBarIcon' : 'drawerIcon']: ({ tintColor }) => (
          <Icon 
            name={`${isIOS ? 'ios' : 'md'}-airplane`} 
            size={20}
            color={tintColor}
          />
        ),
    }
  },
  Trains: {
    screen: MainTabNavigator,
    navigationOptions: {
        title: 'Поезда',
        [isIOS ? 'tabBarIcon' : 'drawerIcon']: ({ tintColor }) => (
          <Icon 
            name={`${isIOS ? 'ios' : 'md'}-train`} 
            size={20}
            color={tintColor}
          />
        )
    }
  },
  Hotels: {
    screen: MainTabNavigator,
    navigationOptions: {
        title: 'Отели',
        [isIOS ? 'tabBarIcon' : 'drawerIcon']: ({ tintColor }) => (
          <Icon 
            name={`${isIOS ? 'ios' : 'md'}-bed`} 
            size={20}
            color={tintColor}
          />
        )
    }
  },
  Buses: {
    screen: MainTabNavigator,
    navigationOptions: {
        title: 'Автобусы',
        [isIOS ? 'tabBarIcon' : 'drawerIcon']: ({ tintColor }) => (
          <Icon 
            name={`${isIOS ? 'ios' : 'md'}-bus`} 
            size={20}
            color={tintColor}
          />
        )
    }
  },
}));