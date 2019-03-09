import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Axios from 'axios';

export default class StartScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // 유저인포 호출해서 성공하면 로그인 되어 있기 때문에 곧바로 메인으로 보냄 아니라면 로그인창
  // 로그인 안된 상태에서 호출 시 data.data에는 mem관련 key가 없음.

  checkLogin = async () => {
    const { navigation } = this.props;
    const result = await Axios.get('http://api.crunchprice.com/member/get_mypage_info.php');
    console.log(JSON.stringify(result.data.data))
    if (JSON.stringify(result.data.data.memNm)) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('logIn');
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.norasPhoto}
          source={require('../assets/images/noras_ice_cream.jpg')}
        />
        <Text style={styles.title}> 더-싸지는 쇼핑 </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={this.checkLogin}
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
    elevation: 5,
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
