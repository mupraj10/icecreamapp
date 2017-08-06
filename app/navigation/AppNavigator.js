import React, { Component } from 'react';
import { Navigator } from 'react-native-deprecated-custom-components'
import Search from '../components/Search'
import Results from '../components/Results'

class AppNavigator extends Component {

  renderScene(route, navigator) {
    var globalNavigatorProps = { navigator }

    switch(route.ident) {
      case "Search":
        return (
          <Search
            {...globalNavigatorProps} />
        )

      case "Results":
        return (
          <Results
            {...globalNavigatorProps}
            data = {route.data} />
        )
      case "SingleView":
        return (
          <SingleResult
            {...globalNavigatorProps}
            data = {route.data} />
        )
      default:
        return (
          <Text> {`What happened? ${route}`}></Text>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={this.props.initialRoute}
        ref="appNavigator"
        renderScene={this.renderScene}
        configureScene={(route) => ({ ...route.sceneConfig || Navigator.SceneConfigs.FloatFromRight })} />
    )
  }

}

module.exports = AppNavigator