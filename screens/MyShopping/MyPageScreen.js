import React from 'react';
import {
  Text,
  Platform,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from 'react-native-vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Axios from 'axios';
import Emoji from 'react-native-emoji';

import { handleNumberToPrice } from '../../helper/helperFuncs';

// api: http://api.crunchprice.com/member/get_mypage_info.php 로그인된 상태에서 해당 회원의 정보를 불러오는 API
// res form: {data:{success, data:{...}}
// state에 저장 형태: response.data.data
// 주요 props: memNm 사용자명, reviewCount 리뷰 남긴 횟수, wishCount 찜 상품 수, mileage 포인트, memberFl 회원 종류

export default class MyPageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '마이 쇼핑',
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('cartWebScreen')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: wp('6.5%'), height: wp('8%'), marginRight: wp('3%') }}
            source={require('../../assets/images/trolley.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    };
  };

  state={
    userData: {},
    isLoaded: false,
    cancel: false,
    refund: false,
  }

  componentDidMount = async () => {
    this.testCookieRequest();
    console.log(this.state.userData);
  }

  testCookieRequest = async () => {
    const result = await Axios.get('http://api.crunchprice.com/member/get_mypage_info.php');
    await this.setState({
      userData: result.data.data,
      isLoaded: true,
    });
  };

  render() {
    const { userData, isLoaded, cancel, refund } = this.state;
    const { navigation } = this.props;
    if (!isLoaded) {
      return (<Text>loading</Text>);
    }
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
                  <Text style={{ fontSize: 20 }}>{userData.memNm}</Text>
                  <AntDesign name="right" style={{ fontSize: 20, color: 'rgb(209, 209, 214)', marginLeft: wp('1%') }} />
                </View>
                <Text style={{ color: 'rgb(142, 142, 147)' }}>{userData.memberFl === 'personal' ? '일반회원' : '사업자회원' }</Text>
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
        <View
          style={styles.middleButtonView}
        >
          <TouchableOpacity
            style={styles.middleButton}
            onPress={() => navigation.navigate('WebView', { page: 'mypage_goods_review.php' })}
          >
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>{userData.reviewCount}</Text>
              <Text style={styles.buttonText}>구매후기</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleButton}
            onPress={() => navigation.navigate('PokeList')}
          >
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>{userData.wishCount}</Text>
              <Text style={styles.buttonText}>찜한 상품</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.middleButton}>
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>19</Text>
              <Text style={styles.buttonText}>최근 본 상품</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.middleButton}
            onPress={() => navigation.navigate('WebView', { page: 'mileage.php' })}
          >
            <View style={styles.middleButtonTextView}>
              <Text style={styles.buttonText}>{handleNumberToPrice(Number(userData.mileage))}</Text>
              <Text style={styles.buttonText}>포인트</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{
          flex: 5, flexDirection: 'column', alignItems: 'center', marginTop: hp('2%'),
        }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('WebView', { page: 'order_list.php' })}
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
            onPress={() => this.setState({ cancel: !cancel })}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>취소/반품/교환 내역</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-down'
                      : 'md-arrow-down'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
            {cancel && (
              <View>
                <TouchableOpacity
                  style={styles.categoryTwo}
                  onPress={() => navigation.navigate('WebView', { page: 'order_list.php?mode=cancelRequest' })}
                >
                  <View style={styles.categoryListTwo}>
                    <Text style={styles.textTwo}>취소/반품/교환 신청 내역</Text>
                  </View>
                  <View style={styles.categoryListTwo}>
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
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryTwo}
                  onPress={() => navigation.navigate('WebView', { page: 'order_list.php?mode=cancel' })}
                >
                  <View style={styles.categoryListTwo}>
                    <Text style={styles.textTwo}>취소/반품/교환 처리 내역</Text>
                  </View>
                  <View style={styles.categoryListTwo}>
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
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ refund: !refund })}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Text style={styles.text}>환불/입금 내역</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-down'
                      : 'md-arrow-down'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
            { refund && (
            <View>
              <TouchableOpacity
                style={styles.categoryTwo}
                onPress={() => navigation.navigate('WebView', { page: 'order_list.php?mode=refundRequest' })}
              >
                <View style={styles.categoryListTwo}>
                  <Text style={styles.textTwo}>환불 신청 내역</Text>
                </View>
                <View style={styles.categoryListTwo}>
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
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryTwo}
                onPress={() => navigation.navigate('WebView', { page: 'order_list.php?mode=refund' })}
              >
                <View style={styles.categoryListTwo}>
                  <Text style={styles.textTwo}>환불/입금 처리 내역</Text>
                </View>
                <View style={styles.categoryListTwo}>
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
              </TouchableOpacity>
            </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('WebView', { page: 'deposit.php' })}
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
            onPress={() => navigation.navigate('WebView', { page: 'mileage.php' })}
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
            onPress={() => navigation.navigate('WebView', { page: 'mypage_qa.php' })}
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
            onPress={() => navigation.navigate('WebView', { page: 'mypage_goods_qa.php' })}
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
            onPress={() => navigation.navigate('WebView', { page: 'shipping.php' })}
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
  categoryTwo: {
    width: wp('88%'),
    marginLeft: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgb(209, 209, 214)',
    marginTop: 7,
  },
  categoryList: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  categoryListTwo: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 7,
  },
  textTwo: {
    fontSize: 12,
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
