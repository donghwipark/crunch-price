import React from 'react';
import { ScrollView, StyleSheet, Text,   Platform} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: 'SearchStackScreen',
    headerRight: (
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
    )
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Search</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
