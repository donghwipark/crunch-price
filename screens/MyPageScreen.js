import React from 'react';
import {
  Text,
  Platform,
  View,
  TouchableHighlight
} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default class MyPageScreen extends React.Component {
  static navigationOptions = {
    title: 'My Page',
    headerRight: (
      <TouchableHighlight 
        onPress={console.log(1)}
      >
        <View>
          <Icon
            name={
              Platform.OS === 'ios'
                ? `ios-cart`
                : 'md-cart'
            }
            size={26}
            style={{ marginBottom: -3 }}
            color={Colors.tabIconSelected}
          />
        </View>
      </TouchableHighlight>    
    )
  };

  render() {
    return (
      <View>
        <Text>My Page</Text>
      </View>
    )
  }
}
