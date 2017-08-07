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
          style={{borderRadius: 7, padding: 10,  backgroundColor: '#F74A4A'}}
          onPress={() => (this.backButton())}>
          <Text style={{fontSize: 15, color:'#FFFF' }}>FIND IT</Text>
        </TouchableOpacity>
      
        <Text style={styles.header}>Ice Cream Choices</Text>
        <ListView
          style={{marginTop: 100}}
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
    return (
   
      <View style={styles.resultRow} >
    
        <Image source={{uri: result.image_url}}
          style={{width: 80, height: 80, justifyContent: 'flex-start'}} />
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={{fontWeight: 'bold'}}>{`${result.name}`}</Text>
          <Text>Rating: {`${result.rating}`}</Text>
          <Text>Phone: {`${result.display_phone}`}</Text>
        </View>
        <TouchableOpacity
          style={{borderRadius: 7, padding: 10,  backgroundColor: '#F74A4A'}}
          onPress={() => (this.fetchPlace(result))}>
          <Text style={{fontSize: 15, color:'#FFFF' }}>FIND IT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{borderRadius: 7, padding: 10,  backgroundColor: '#F74A4A'}}
          onPress={() => Linking.openURL(result.url)}>
          <Text style={{fontSize: 15, color:'#FFFF' }}>YELP IT</Text>
        </TouchableOpacity>
    </View >

    )
  }
}



const styles = StyleSheet.create({
  header:{
    textAlign: 'center',
    position: 'relative',
    top: 60,
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
