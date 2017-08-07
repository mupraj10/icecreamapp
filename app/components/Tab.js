import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Tab} from 'react-native';
import YelpApi from 'v3-yelp-api'
import secrets from '../../secrets';

class Search extends Component {
  state = {
    position: ''
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
      },
      (error) => alert(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

fetchData() {
    const credentials = {
      appId: process.env.YELP_CLIENT_ID,
      appSecret: process.env.YELP_CLIENT_SECRET
    }

    // console logging the actual object YelpApi led to the solve
    const yelp = new YelpApi(credentials)

    let lat = this.state.position.coords.latitude
    let lng = this.state.position.coords.longitude

    let latlng = String(lat) + "," + String(lng)
    let params = {
      term: 'ice cream',
      location: latlng,
      limit: '30',
    }

    let nav = this.props.navigator

  //   return yelp.search(params)
  //   .then(data => console.log(data))
  //   .catch(err => err)
  // }
  console.log(params);
    return yelp.search(params)
    .then((searchResults) => {
      nav.push({
        ident: "Results",
        data: searchResults
      })
    })
    .catch(err => err)
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>
          Ice Creamy 
        </Text>
        <Image source={require('../../images/icecream.jpeg')} style={{height: 400, width: 300}}/>
        <TouchableOpacity
          style={{borderRadius: 7,padding: 10,  backgroundColor: '#F7C9DD'}}
          onPress={this.fetchData.bind(this)}>
          <Text style={{fontSize: 15}}>Find Me Ice Cream!</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    marginBottom: 30
  }
});

module.exports = Search