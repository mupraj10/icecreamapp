/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import { AppRegistry } from 'react-native'
import AppNavigator from './app/navigation/AppNavigator'

class IceCreamApp extends Component {
  render() {
    return (
          <AppNavigator
            initialRoute={{ident: "Search"}} />
    )
  }
}

AppRegistry.registerComponent('IceCreamApp', () => IceCreamApp);
