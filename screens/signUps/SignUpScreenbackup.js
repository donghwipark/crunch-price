import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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
    isCheckedAll: false,
    checked:[false,false,false,false,false],
    agreements: [
      { id: 0, text1: '(필수) 이용약관', isChecked: false },
      { id: 1, text1: '(필수) 개인정보 수집 및 이용', isChecked: false },
      { id: 2, text1: '(선택) 개인정보 수집 및 이용', isChecked: false },
      { id: 3, text1: '(선택) 개인정보 수집위탁', isChecked: false },
      { id: 4, text1: '(선택) 개인정보 제 3 자 제공', isChecked: false },
    ],
    isCheckBoxChanged: 0,
  }

  handleAllChecked = (event) => {
    let agreements = this.state.agreements
    agreements.forEach(item => item.isChecked = event.nativeEvent.isChecked) 
    this.setState({agreements: agreements})
  }

  handleCheckChieldElement = (event) => {
    let agreements = this.state.agreements
    console.log(event)
    agreements.forEach(item => {
       if (item.isChecked === event.nativeEvent.value)
       item.isChecked =  event.nativeEvent.isChecked
    })
    this.setState({agreements: agreements})
  }

  checkBoxToggle = () => {
    const prev = checked[item.id]
    const curr = !prev
    this.setState({...agreements, checked: checked[item.id] = curr })
    console.log(checked)
  }

  checkBoxChanged = function(){
    this.setState({
      isCheckBoxChanged: this.state.isCheckBoxChanged + 1
    });
  }

  render() {
    const { navigation } = this.props;
    const { checked, isCheckedAll, agreements, isCheckBoxChanged, a } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: 20, marginBottom: hp('2%') }}>
          <View style={{ alignItems: 'center', marginBottom: hp('10%') }}>
            <Progress.Bar progress={0} width={wp('80%')} height={hp('2%')} />
          </View>
          <View style={{ marginLeft: wp('2%') }}>
            <CheckBox
              onClick={
                this.handleAllChecked
              
          }
              isChecked={isCheckedAll}
              rightText="크런치 프라이스의 모든 약관을 확인하고 전체 동의합니다."
            />
          </View>
          <View style={{ borderWidth: 1, borderColor: 'black', margin: 10, marginTop: hp('5%') }} />
        </View>
        <View>
        <FlatList
         data={agreements}
        renderItem={({item, i}) => (
        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 0.4, borderBottomColor: 'black', width: wp('90%'), height: hp('10%'), alignSelf: 'center', alignItems: 'center' }}>
        <CheckBox
          onClick={() => {
            const prev = checked[item.id]
            const curr = !prev
            let id = item.id
            this.setState({...agreements, checked: checked[item.id] = !checked[item.id] })
            this.checkBoxChanged()
            console.log(checked)
            console.log(isCheckBoxChanged)
          
        }
      }
          isChecked={checked[item.id]}
        />
        
        <Text style={{ fontSize: 15 }}>{item.text1}</Text>
        <Text style={{ fontSize: 20, color: 'blue', marginLeft: 'auto' }}>내용보기</Text>
        </View>)}
        />
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
