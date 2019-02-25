import React from 'react';
import {
  ScrollView, StyleSheet, Text, Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Category',
    headerRight: (
      <Icon
        name={
          Platform.OS === 'ios'
            ? 'ios-cart'
            : 'md-cart'
        }
        size={26}
        style={{ marginBottom: -3 }}
        color={Colors.tabIconSelected}
      />
    ),
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>ScrollView here</Text>
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
