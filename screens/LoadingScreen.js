import React from 'react';
import {
//   Image,
//   Platform,
//   ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class LoadingScreen extends React.Component {
    static navigationOptions = {
      title: null,
    };

    render() {
      const { navigation } = this.props
      return (
        <View style={styles.container}>
          <View style={styles.titleMargin}>
            <Text style={styles.title}>더-싸지는 쇼핑</Text>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(93, 190, 142)',
  },
  title: {
    fontSize: 40,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 10 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  titleMargin: {
    marginTop: hp('30%'),
  },
});
