import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { CheckBox } from 'react-native-elements';

export default class SignUpScreenTwo extends React.Component {
  static navigationOptions = {
    title: '회원가입(정보입력)',
    headerStyle: {
      backgroundColor: 'rgb(244,226,212)',
    },
  };

  state = {
    id: '',
    userType: '',
    password: '',
    checkpassword: '',
    name: '',
    email: '',
    phoneNumber: '',
    recommendId: '',
    emailChecked: false,
    smsChecked: '',
  }

  render() {
    const { navigation } = this.props;
    const radio_props = [
      { label: '개인회원', value: '개인회원' },
      { label: '사업자회원', value: '사업자회원' },
    ];
    console.log(this.state.userType);
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          {/* image here */}
        </View>
        <View style={{ flex: 11 }}>
          <View style={{ flex: 1 }}>
            <View style={{ borderBottomWidth: 1, borderColor: 'grey' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: hp('0.8%'), marginLeft: wp('1%') }}>기본정보</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>회원종류</Text>
            <RadioForm
              radio_props={radio_props}
              buttonColor="grey"
              selectedButtonColor="grey"
              onPress={(value) => { this.setState({ userType: value }); }}
              initial={0}
              formHorizontal
              buttonSize={10}
              labelStyle={{ fontWeight: 'bold', marginRight: wp('5%') }}
              style={{ width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>아이디</Text>
            <TextInput
              onChangeText={text => this.setState({ id: text })}
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>비밀번호</Text>
            <TextInput
              onChangeText={text => this.setState({ password: text })}
              placeholder="  영문대/소문자, 숫자, 특수문자 총 2가지 이상"
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>비밀번호 확인</Text>
            <TextInput
              onChangeText={text => this.setState({ checkpassword: text })}
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>이름</Text>
            <TextInput
              onChangeText={text => this.setState({ name: text })}
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>이메일</Text>
            <TextInput
              onChangeText={text => this.setState({ recommendId: text })}
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={{ width: wp('70%'), marginRight: wp('1%') }}>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: -hp('2%') }}>
                <CheckBox
                  right
                  containerStyle={{ margin: -wp('1%'), marginLeft: -wp('2%'), marginRight: -wp('2%') }}
                  iconType="font-awesome"
                  checkedIcon="check-square-o"
                  uncheckedIcon="square-o"
                  checkedColor="grey"
                  onPress={() => this.setState({ emailChecked: !this.state.emailChecked })}
                  checked={this.state.emailChecked}
                />
                <Text style={{ fontWeight: 'bold' }}>정보/이벤트 메일 수신에 동의합니다.</Text>
              </View>
              <Text>* 아이디 비밀번호 찾기에 활용되므로 정확하게 입력해 주세요</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>휴대폰 번호</Text>
            <TextInput
              onChangeText={text => this.setState({ phoneNumber: text })}
              placeholder="  - 없이 입력하세요"
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <View style={{ width: wp('70%'), marginRight: wp('1%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -hp('1%') }}>
              <CheckBox
                right
                containerStyle={{ margin: -wp('1%'), marginLeft: -wp('8%'), marginRight: -wp('2%') }}
                iconType="font-awesome"
                checkedIcon="check-square-o"
                uncheckedIcon="square-o"
                checkedColor="grey"
                onPress={() => this.setState({ smsChecked: !this.state.smsChecked })}
                checked={this.state.smsChecked}
              />
              <Text style={{ fontWeight: 'bold' }}>정보/이벤트 SMS 수신에 동의합니다.</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ borderBottomWidth: 1, borderColor: 'grey' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: hp('0.8%'), marginLeft: wp('1%') }}>부가정보</Text>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: hp('5%') }}>
            <Text style={{ color: '#495057', marginLeft: wp('1%') }}>추천인 아이디</Text>
            <TextInput
              onChangeText={text => this.setState({ recommendId: text })}
              style={{ borderWidth: 0.6, borderColor: 'grey', height: hp('4.5%'), width: wp('70%'), marginRight: wp('1%') }}
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: 'rgb(83,66,51)', height: hp('7%'), width: wp('97%'), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>확인</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(244,226,212)',
  },
});
