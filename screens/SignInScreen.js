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

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'signin',  
  };

  render() {
    return (
    <View style={{flex:1}}>
      <Text style={{flex:1}}>Welcome to Crunch Price</Text>
      <Button
        onPress={() => {this.props.navigation.navigate('Main')}}
        title="SignInPlease"
        color="#841584"
        style={{flex:1}}
      />
    </View>
    );
  }
}