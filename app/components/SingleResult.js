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

import call from 'react-native-phone-call'

class SingleResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: props.data,
      mapRegion: Object.assign({}, props.data.coordinates, {latitudeDelta: 0.005, longitudeDelta: 0.005 })
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
        ident: "Search",
      })
  }

linkToMaps(lat, lon) {
  const rla = 40.7049948;
  const rlo = -74.0089752;
  const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${lat},${lon}&dirflg=d`;
  return Linking.openURL(url);
}



  render() {
      //  console.log("in simple", this.state);
       const result = this.state.results;
       const coordinates = result.coordinates;
       const lat = coordinates.latitude;
       const long = coordinates.longitude;
       const numberPlus = result.phone.toString();
       const number = numberPlus.slice(2);
       console.log(typeof (number), console.log(number));

       const phoneArgs = {
         number: '3479678580',
         prompt: true
       };

    const openOrClosed = (result.is_closed) ? (<Image source={require('../../images/closed.png')} style={{height: 50, width: 50}} />) : 
    (<Image source={require('../../images/open.png')} style={{height: 50, width: 50}} />)

     const placeImage = (result.image_url) ? (<Image source={{uri: result.image_url}} style={{width: 80, height: 80, justifyContent: 'flex-start'}} /> )
    : (<Image source={require('../../images/default.png')} style={{width: 80, height: 80, justifyContent: 'flex-start'}} />)

    return (
    

      <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize:18}}>{`${result.name}`}</Text>
      {openOrClosed}
      <Text style={{fontWeight: 'bold', fontSize:14}}>{`${result.location.display_address[0]}`}</Text>
            <Text style={{fontWeight: 'bold', fontSize:14}}>{`${result.display_phone}`}</Text>

      
      
        <Text style={styles.paragraph}>
          
          {placeImage}
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

<View style={styles.button}>

          <TouchableOpacity
            onPress={() => this.backButton()}>
            <Image source={require('../../images/cone.png')} style={{ height: 50, width: 50 }} />
          </TouchableOpacity>

        <TouchableOpacity
          onPress={() => (this.linkToMaps(lat, long))}>
          <Image source={require('../../images/directions.png')} style={{height: 50, width: 50}} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(result.url)}>
          <Image source={require('../../images/yelp-icon.png')} style={{height: 50, width: 50}} />
        </TouchableOpacity>

        </View>
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
  button:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding:10
  }
});
module.exports = SingleResult

