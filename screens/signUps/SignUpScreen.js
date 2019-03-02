import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/AntDesign';
// import { CheckBox } from 'react-native-elements';
import CheckBox from 'react-native-check-box';

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'rgb(244,226,212)',
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
    const { navigation } = this.props;
    const { agreement, personalInfo, personalInfoOptional, delegatePersonalInfo, thirdPartyPersonalInfo, isCheckedAll } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: 20, marginBottom: hp('3%') }}>
          <View style={{ alignItems: 'center', marginBottom: hp('5%') }}>
            <Progress.Bar progress={0} width={wp('80%')} height={hp('2%')} />
          </View>
          <View style={{ marginLeft: wp('2%') }}>
            <CheckBox
              style={{ fontSize: 15 }}
              onClick={() => {
                this.setState({
                  agreement: agreement ? true : !agreement,
                  personalInfo: personalInfo ? true : !personalInfo,
                  personalInfoOptional: personalInfoOptional ? true : !personalInfoOptional,
                  delegatePersonalInfo: delegatePersonalInfo ? true : !delegatePersonalInfo,
                  thirdPartyPersonalInfo: thirdPartyPersonalInfo ? true : !thirdPartyPersonalInfo,
                  isCheckedAll: isCheckedAll ? true : !isCheckedAll,
                });
              }
          }
              isChecked={isCheckedAll}
              rightText="크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다."
            />
          </View>
          <View style={{ borderWidth: 1, borderColor: 'black', margin: 10, marginTop: hp('2%') }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'black', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
          <CheckBox
            
            onClick={() => {
              this.setState({
                agreement: !agreement,
              });
            }
          }
            isChecked={agreement}
          />
          <Text style={{ fontSize: 15 }}> (필수) 이용약관</Text>
          <Text style={{ fontSize: 20, color: 'blue', marginLeft: 'auto' }}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'black', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
          <CheckBox
            
            onClick={() => {
              this.setState({
                personalInfo: !personalInfo,
              });
            }
          }
            isChecked={personalInfo}
          />
          <Text style={{ fontSize: 15 }}> (필수) 개인정보 수집 및 이용</Text>
          <Text style={{ fontSize: 20, color: 'blue', marginLeft: 'auto' }}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.8, borderBottomColor: 'black', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
          <CheckBox

            onClick={() => {
              this.setState({
                personalInfoOptional: !personalInfoOptional,
              });
            }
          }
            isChecked={personalInfoOptional}
          />
          <Text style={{ fontSize: 15 }}> (선택) 개인정보 수집 및 이용</Text>
          <Text style={{ fontSize: 20, color: 'blue', marginLeft: 'auto' }}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'black', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
          <CheckBox
            
            onClick={() => {
              this.setState({
                delegatePersonalInfo: !delegatePersonalInfo,
              });
            }
          }
            isChecked={delegatePersonalInfo}
          />
          <Text style={{ fontSize: 15 }}> (선택) 개인정보 수집위탁</Text>
          <Text style={{ fontSize: 20, color: 'blue', marginLeft: 'auto' }}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'grey', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
          <CheckBox

            onClick={() => {
              this.setState({
                thirdPartyPersonalInfo: !thirdPartyPersonalInfo,
              });
            }
          }
            isChecked={thirdPartyPersonalInfo}
          />
          <Text style={{ fontSize: 15 }}> (선택) 개인정보 제 3 자 제공</Text>
          <Text style={{ fontSize: 20, color: 'blue', marginLeft: 'auto' }}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', width: wp('90%'), alignSelf: 'center' }}>
          <View style={{ marginTop: hp('2%') }}>
            <TouchableOpacity style={{ width: wp('44%'), height: hp('8%'), backgroundColor: 'rgb(162,222,161)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ alignSelf: 'center', justifyContent: 'center' }}>이전</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: hp('2%'), marginLeft: 'auto' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('SignUpTwo'); }} style={{ width: wp('44%'), height: hp('8%'), backgroundColor: 'rgb(83,66,51)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ alignSelf: 'center', justifyContent: 'center', color: 'white' }}>다음</Text>
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
    backgroundColor: 'rgb(244,226,212)',
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


// 차일드 엘리먼트 세로 중앙으로 맞추는 법: flexDirection이 column이면 justiContent: 'center', row라면 alignItems: 'center'
// marginRight: 'auto'는 부모 뷰 맨 오른쪽으로 엘리먼트를 보낸다
