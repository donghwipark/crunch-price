import React from 'react';
import {
  AsyncStorage,
  Text,
  View,
} from 'react-native'

export default class CartScreen extends React.Component {
  static navigationOptions = {
    head: null,
  };

  render() {
    return (
    <View>
      <Text>Cart</Text>
    </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}