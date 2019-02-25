import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class StartScreen extends React.Component {
  static navigationOptions = {
    title: null,  
  };

  render() {
    return (
    <View style={{flex:1}}>
      <Text style={{flex:1}}>Welcome to Crunch Price</Text>
      <Button
        onPress={() => {this.props.navigation.navigate('Main')}}
        title="Move to Index"
        color="#841584"
        style={{flex:1}}
      />
    </View>
    );
  }
}