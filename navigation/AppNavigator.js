import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

const navTabs = {
  Passengers: 'Пассажиры'
}
export default createAppContainer(createDrawerNavigator({
  [navTabs.Passengers]: MainTabNavigator,
}));