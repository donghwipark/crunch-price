import React from 'react';
import {
  Text,
  Platform,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from 'react-native-vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Emoji from 'react-native-emoji';
import Colors from '../constants/Colors';

export default class MyPageScreen extends React.Component {
  static navigationOptions = {
    title: '마이 쇼핑',
    headerTitleStyle: {flex: 1, textAlign: 'center'},
    headerRight: (
      <TouchableOpacity
        onPress={console.log(1)}
      >
        <Icon
          name={
          Platform.OS === 'ios'
            ? 'ios-cart'
            : 'md-cart'
        }
          size={26}
          style={{ marginRight: wp('3%') }}
        />
      </TouchableOpacity>
    ),
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 0.3,
          borderBottomColor: 'rgb(209, 209, 214)',
        }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Emoji name="bust_in_silhouette" style={{ fontSize: wp('10%'), marginLeft: wp('3%'), marginRight: wp('3%') }} />
              <View style={{ justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 20 }}>김민준</Text>
                  <AntDesign name="right" style={{ fontSize: 20, color: 'rgb(209, 209, 214)', marginLeft: wp('1%') }} />
                </View>
                <Text style={{ color: 'rgb(142, 142, 147)' }}>일반 회원</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginRight: wp('1%') }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Emoji name="bell" style={{ fontSize: wp('4%'), padding: wp('1%'), alignItems: 'center' }} />
              <Text style={{ color: 'rgb(142, 142, 147)', fontSize: 15, padding: wp('1%') }}>알림내역</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Emoji name="gear" style={{ fontSize: wp('4%'), padding: wp('1%') }} />
              <Text style={{ color: 'rgb(142, 142, 147)', fontSize: 15, padding: wp('1%') }}>내정보관리</Text>
            </View>
          </View>
        </View>
        <View style={styles.middleButtonView}>
          <TouchableOpacity style={styles.middleButton}>
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>5</Text>
              <Text style={styles.buttonText}>구매후기</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.middleButton}>
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>12</Text>
              <Text style={styles.buttonText}>찜한 상품</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.middleButton}>
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>19</Text>
              <Text style={styles.buttonText}>최근 본 상품</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.middleButton}>
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>150,000</Text>
              <Text style={styles.buttonText}>포인트</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 5, flexDirection: 'column', alignItems: 'center', marginTop: hp('2%'),
        }}
        >
          <TouchableOpacity
            onPress={() => { console.log('주문목록/배송조회'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>주문목록/배송조회</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('취소/반품/교환 내역'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>취소/반품/교환 내역</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('환불/입금 내역'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>환불/입금 내역</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('쿠폰'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>쿠폰</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('포인트'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>포인트</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('1:1 문의 내역'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>1:1 문의 내역</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('나의 상품문의'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>나의 상품문의</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('배송지 관리'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>배송지 관리</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrow: {
    fontSize: 15,
  },
  category: {
    width: wp('90%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgb(209, 209, 214)',
    marginTop: 10,
  },
  categoryList: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  middleButtonView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  middleButton: {
    backgroundColor: 'rgb(93, 190, 142)',
    top: hp('1%'),
    width: wp('20%'),
    height: wp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  middleButtonTextView: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    padding: 2,
  },
});
