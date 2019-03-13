import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import RwayScreen from '../screens/rway';
import store from '../store';

const RwayNavigator = createStackNavigator({
    StartScreen: RwayScreen,
});

export default class ConnectedRwayNavigator extends React.Component {
    static router = RwayNavigator.router;
  
    render() {
    console.log(store.getState());
      return (
        <Provider store={store}>
          <RwayNavigator navigation={this.props.navigation}/>
        </Provider>
      );
    }
  }