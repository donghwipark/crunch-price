import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/AntDesign';
import { CheckBox } from 'react-native-elements';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {

      title: 'Home',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
  }

  state = {
    acceptAll: false,
    agreement: false,
    personalInfo: false,
    personalInfoOptional: false,
    delegatePersonalInfo: false,
    thirdPartyPersonalInfo: false,
    isCheckedAll: false,
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={{flex: 1, marginTop: 20, alignItems: 'center', marginBottom: 50}}>
          <Progress.Bar progress={0} width={wp('80%')} height={hp('2%')} />
        </View>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <CheckBox
            title='Click Here'
            checked={this.state.isCheckedAll}
          />
          <Text>크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다.</Text>
          
        </View>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <CheckBox
            title='Click Here'
            checked={this.state.isCheckedAll}
          />
          <Text>크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다.</Text>
          
        </View>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <CheckBox
            title='Click Here'
            checked={this.state.isCheckedAll}
          />
          <Text>크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다.</Text>
          
        </View>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <CheckBox
            title='Click Here'
            checked={this.state.isCheckedAll}
          />
          <Text>크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다.</Text>
          
        </View>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <CheckBox
            title='Click Here'
            checked={this.state.isCheckedAll}
          />
          <Text>크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다.</Text>
          
        </View>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <CheckBox
            title='Click Here'
            checked={this.state.isCheckedAll}
          />
          <Text>크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다.</Text>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
