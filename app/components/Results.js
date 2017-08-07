import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Linking,
  TouchableOpacity
} from 'react-native'

import YelpApi from 'v3-yelp-api'
import secrets from '../../secrets';

class Results extends Component {
  constructor(props) {
    super(props)

    let dataStore = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2 })

    this.state = {
      results: dataStore.cloneWithRows(props.data.businesses)
    }
    this.fetchPlace = this.fetchPlace.bind(this)
    this.backButton = this.backButton.bind(this)
  }

 

  render() {

      //  console.log(this.state);
    return (
      
      <View>
      <TouchableOpacity
          style={{borderRadius: 10, justifyContent: 'flex-start', padding: 5,  top: 25, backgroundColor: '#C9ADB0'}}
          onPress={() => (this.backButton())}>
          <Text style={{fontSize: 15, color:'#FFFF' }}>Check Other Location</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Where To Go: </Text>
        

        <ListView
          style={{marginTop: 40}}
          initialListSize={10}
          dataSource={this.state.results}
          renderRow={(result) => { return this.renderResult(result)}}

        />
      </View>
    )
  }

  fetchPlace(result) {
      let nav = this.props.navigator
      let place = result
      nav.push({
        ident: "SingleView",
        data:result
      })
  }

   backButton() {
      let nav = this.props.navigator
      nav.push({
        ident: "Search"
      })
  }
    
  renderResult(result) {
    const placeImage = (result.image_url) ? (<Image source={{uri: result.image_url}} style={{width: 80, height: 80, justifyContent: 'flex-start'}} /> )
    : (<Image source={require('../../images/default.png')} style={{width: 80, height: 80, justifyContent: 'flex-start'}} />)

    return (
   
      <View style={styles.resultRow} >
    
        {placeImage}
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{`${result.name}`}</Text>
          <Text>Rating: {`${result.rating}`}</Text>
          <Text>Phone: {`${result.display_phone}`}</Text>
        </View>
        <TouchableOpacity
          style={{borderRadius: 7, padding: 10,  backgroundColor: '#CA7179'}}
          onPress={() => (this.fetchPlace(result))}>
          <Text style={{fontSize: 10, color:'#FFFF' }}>GO HERE!</Text>
        </TouchableOpacity>
        
   
    </View >

    )
  }
}



const styles = StyleSheet.create({
  header:{
    textAlign: 'center',
    position: 'relative',
    top: 30,
    fontSize: 30
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 20,
    padding: 5,
  }
});

module.exports = Results
