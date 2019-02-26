import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'signin',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={styles.loginLogo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.loginTitle}>로그인</Text>

        <View style={styles.loginInput}>
          <Text style={styles.loginInput}> 이메일 </Text>
          <View style={styles.buttoncontainer}>
            <TextInput
              style={styles.input}
              placeholder="이메일을 입력해주세요."
            />
          </View>
          <Text style={styles.loginInput}> 비밀번호 </Text>
          <View style={styles.buttoncontainer}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호는 4자 ~ 6자 사이로 입력해주세요."
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={() => { navigation.navigate('Main'); }}
          >
            <View>
              <Text style={styles.loginButton}> 로그인 </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: hp(1) }}>
          <View>
            <TouchableOpacity
              style={styles.findPassword}
              onPress={() => { console.log('비밀번호 찾기'); }}
            >
              <Text style={styles.underline}> 비밀번호를 잊으셨나요? </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.signup}
              onPress={() => { console.log('회원 가입'); }}
            >
              <Text style={styles.underline}> 회원 가입 </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: hp('8%') }}>
          <View style={styles.naverLogin}>

            <TouchableOpacity
              onPress={() => { console.log('네이버로 시작하기'); }}
            >
              <Text style={styles.socaialLogin}> 네이버로 시작하기 </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.facebookLogin}>
            <Image
              style={styles.socialLogo}
              source={require('../assets/images/facebook-logo.png')}
            />

            <TouchableOpacity
              onPress={() => { console.log('페이스북으로 시작하기'); }}
            >
              <Text style={styles.socaialLogin}> 페이스북으로 시작하기 </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(200, 194, 204)',
  },
  loginLogo: {
    marginLeft: wp('39%'),
    marginTop: hp('8%'),
  },
  loginTitle: {
    textAlign: 'center',
    marginTop: hp('3%'),
    fontSize: 16,
  },
  loginInput: {
    padding: '1%',
    fontSize: 18,
    marginTop: hp('1%'),
  },
  input: {
    marginLeft: wp(5),
    height: hp(6),
  },
  buttoncontainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
    backgroundColor: 'white',
    marginTop: hp(1),
    marginLeft: wp(-3),
    width: wp('102%'),
  },
  loginButton: {
    // marginLeft: wp(6),
    height: hp(7),
    lineHeight: 40,
    marginRight: wp(3),
    color: 'rgb(0, 122, 255)',
    textAlign: 'center',
  },
  findPassword: {
    position: 'absolute',
    marginLeft: wp(1),
  },
  signup: {
    position: 'absolute',
    right: wp('5%'),
  },
  underline: {
    textDecorationLine: 'underline',
  },
  naverLogin: {
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
    backgroundColor: 'rgb(30, 200, 0)',
    padding: 15,
    marginTop: hp(1),
  },
  facebookLogin: {
    borderBottomWidth: 1,
    borderBottomColor: '#adb5bd',
    backgroundColor: 'rgb(71, 90, 150)',
    padding: 15,
    marginTop: hp(1),
  },
  socialLogo: {
    position: 'absolute',
    width: 30,
    marginLeft: wp('4%'),
    marginTop: hp('1.5%'),
  },
  socaialLogin: {
    color: 'white',
    textAlign: 'center',
  }
});
