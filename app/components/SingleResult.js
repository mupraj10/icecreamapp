import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity, 
  Image
} from 'react-native'

import MapView from 'react-native-maps';

class SingleResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.data,
      mapRegion: Object.assign({}, props.data.coordinates, {latitudeDelta: 0.0922, longitudeDelta: 0.0421 })
    }
     this.backButton = this.backButton.bind(this)

  }

  getInitialState() {
  return {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };
}
onRegionChange(region) {
  this.setState({ region });
}
 backButton() {
      let nav = this.props.navigator
      nav.push({
        ident: "Results",
        data: this.props.data
      })
  }

  render() {
       console.log("in simple", this.state);
       const result = this.state.results;
       const coordinates = result.coordinates

    return (
    

      <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize:18}}>{`${result.name}`}</Text>
        <Text style={styles.paragraph}>
          
          <Image source={{ uri: result.image_url }}
            style={{ width: 150, height: 150, justifyContent: 'flex-start' }} />
        </Text>

        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}>

          <MapView.Marker
            coordinate={coordinates}
            title={result.name}
          // description={marker.description}
          />

        </MapView>

        <TouchableOpacity
          style={{ borderRadius: 7, padding: 10, backgroundColor: '#F74A4A' }}
          onPress={() => (this.backButton())}>
          <Text style={{ fontSize: 10, color: '#FFFF' }}>FIND IT</Text>
        </TouchableOpacity>

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

