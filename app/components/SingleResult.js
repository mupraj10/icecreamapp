import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from 'react-native'

import MapView from 'react-native-maps';

class SingleResult extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: props.data,
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
    }

  }



  render() {
       console.log("in simple", this.state);
    return (
     <View style={styles.container}>
        <Text style={styles.paragraph}>
        
        </Text>
        
        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        />
      
      </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
module.exports = SingleResult

