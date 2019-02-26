import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class StartScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.norasPhoto}
          source={require('../assets/images/noras_ice_cream.jpg')}
        />
        <Text style={styles.title}> 더-싸지는 쇼핑 </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { navigation.navigate('Login'); }}
        >
          <View style={styles.borders}>
            <Text style={styles.startTitle}> 시작하기 </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(252, 192, 194)',
  },
  title: {
    flex: 1,
    marginTop: hp('9%'),
    padding: '5%',
    fontSize: 45,
    lineHeight: 55,
    color: 'white',
  },
  startBotton: {
    flex: 1,
    fontSize: 30,
  },
  norasPhoto: {
    position: 'absolute',
    width: wp(40),
    height: hp(40),
    marginTop: hp('30%'),
    marginLeft: wp('30%'),
  },
  button: {
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    marginLeft: wp('10%'),
    backgroundColor: 'white',
    borderRadius: 20,
    width: wp('80%'),
    height: hp('8%'),
  },
  borders: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
  startTitle: {
    textAlign: 'center',
    color: 'rgb(0, 122, 255)',
    lineHeight: 51,
    marginTop: hp('0%'),
    fontSize: 18,
    marginBottom: 50,
  },
});
