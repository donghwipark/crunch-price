import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';
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
    agreement: false,
    personalInfo: false,
    personalInfoOptional: false,
    delegatePersonalInfo: false,
    thirdPartyPersonalInfo: false,
    isCheckedAll: false,
  }

  onPressNextButton = () => {
    const { agreement, personalInfo } = this.state;
    const { navigation } = this.props;

    if (agreement && personalInfo) {
      navigation.navigate('SignUpTwo');
    } else {
      Alert.alert('약관에 동의해주세요');
    }
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
              onClick={() => {
                if (isCheckedAll) {
                  this.setState({
                    agreement: agreement ? false : agreement,
                    personalInfo: personalInfo ? false : personalInfo,
                    personalInfoOptional: personalInfoOptional ? false : personalInfoOptional,
                    delegatePersonalInfo: delegatePersonalInfo ? false : delegatePersonalInfo,
                    thirdPartyPersonalInfo: thirdPartyPersonalInfo ? false : thirdPartyPersonalInfo,
                    isCheckedAll: false,
                  });
                } else {
                  this.setState({
                    agreement: agreement ? true : !agreement,
                    personalInfo: personalInfo ? true : !personalInfo,
                    personalInfoOptional: personalInfoOptional ? true : !personalInfoOptional,
                    delegatePersonalInfo: delegatePersonalInfo ? true : !delegatePersonalInfo,
                    thirdPartyPersonalInfo: thirdPartyPersonalInfo ? true : !thirdPartyPersonalInfo,
                    isCheckedAll: true,
                  });
                }
              }
          }
              isChecked={isCheckedAll}
              rightText="크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다."
            />
          </View>
          <View style={{ borderWidth: 1, borderColor: 'black', margin: 10, marginTop: hp('2%') }} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'grey', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
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
          <Text onPress={() => { navigation.navigate('content1'); }} style={styles.contentText}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'grey', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
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
          <Text onPress={() => { navigation.navigate('content1'); }} style={styles.contentText}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'grey', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
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
          <Text onPress={() => { navigation.navigate('content1'); }} style={styles.contentText}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'grey', width: wp('90%'), height: hp('20%'), alignSelf: 'center', alignItems: 'center' }}>
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
          <Text onPress={() => { navigation.navigate('content1'); }} style={styles.contentText}>내용보기</Text>
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
          <Text onPress={() => { navigation.navigate('content1'); }} style={styles.contentText}>내용보기</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', width: wp('90%'), alignSelf: 'center' }}>
          <View style={{ marginTop: hp('2%') }}>
            <TouchableOpacity onPress={() => { navigation.replace('StartScreen'); }} style={styles.prevNextButton}>
              <Text style={{ alignSelf: 'center', justifyContent: 'center' }}>이전</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: hp('2%'), marginLeft: 'auto' }}>
            <TouchableOpacity onPress={this.onPressNextButton} style={styles.prevNextButton}>
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
  prevNextButton: {
    width: wp('44%'),
    height: hp('8%'),
    backgroundColor: 'rgb(162,222,161)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    width: wp('44%'),
    height: hp('8%'),
    backgroundColor: 'rgb(162,222,161)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 15,
    color: 'blue',
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
});


// 차일드 엘리먼트 세로 중앙으로 맞추는 법: flexDirection이 column이면 justiContent: 'center', row라면 alignItems: 'center'
// marginRight: 'auto'는 부모 뷰 맨 오른쪽으로 엘리먼트를 보낸다
