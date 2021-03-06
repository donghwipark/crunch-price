import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  // Modal,
  View,
  Linking,
  Alert,
  FlatList,
  AsyncStorage,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Emoji from 'react-native-emoji';

import MainRecommended from '../components/Main/MainRecommended';
import MainRecentlyOpened from '../components/Main/MainRecentlyOpened';

// import MainBannerLinks from '../components/Main/MainBannerLinks';
// import fakeData from '../components/Main/fakeData';

// 템플릿 아이템 박스, Async, 헬퍼펑션
import { kakaotalkAsk, kakaotalkSellerCenter, noOpenedGoods } from '../helper/boxTemplate';
import { asyncStorageSet, asyncStorageGet } from '../helper/asyncHelper';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:
      Platform.OS === 'ios'
        ? (
          <Image
            style={{ width: '45%', height: '65%' }}
            source={require('../assets/images/crunch-logo.png')}
          />
        )
        : (
          <Image
            style={{ width: '70%', height: '55%', resizeMode: 'contain', marginLeft: 25 }}
            source={require('../assets/images/crunch-logo.png')}
          />
        ),
      headerLeft: (
        <Text />
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('cartWebScreen')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: wp('6.5%'), height: wp('8%'), marginRight: wp('3%') }}
            source={require('../assets/images/trolley.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    };
  };

  constructor() {
    super();
    this.state = {
      bannerData: [],
      bannerLoaded: false,
      // setModalVisible: false,
      recentlyOpened: [],
      openedProductsLoaded: false,
      isProductRemoved: false,
    };
  }

  async componentDidMount() {
    const banner = await Axios.get('http://api.crunchprice.com/design/crunch_banner_list.php');
    this.setState({ bannerData: banner.data.data, bannerLoaded: true });
    // 열어본 상품 listAsync
    // await asyncStorageSet('opened', JSON.stringify([1004020377, 1004036866, 1004020315, 100403988, 100405555])); // asyncstorage 추가 할 수 있는 펑션 필요. 최대길이는 10
    // console.log(openedProducts);
    await this.handleAsyncOpenedProducts();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handleAsyncOpenedProducts = async () => {
    const openedProducts = await (asyncStorageGet('openedProducts'));
    console.log(JSON.stringify(openedProducts))
    const productsArray = [];
    for (let i = 0; i < openedProducts.length; i += 1) {
      productsArray.push(Number(openedProducts[i]));
    }
    const receivedOpenedGoods = await Axios.get(`http://api.crunchprice.com/goods/recent_goods.php?todayGoodsNo=[${productsArray}]`);
    // console.log(JSON.stringify(receivedOpenedGoods));
    const processedOpenedResults = JSON.stringify(receivedOpenedGoods.data.data);
    this.setState({ recentlyOpened: JSON.parse(processedOpenedResults), openedProductsLoaded: true });
  }

  onPressLinking = async (URL) => {
    try {
      await Linking.openURL(URL);
    } catch {
      Alert.alert('인터넷 연결이 불안정합니다. 와이파이를 확인해주세요.');
    }
  }

  createTemplateBox = (data) => {
    const { navigation } = this.props;
    return (
      <View style={styles.primeContainer}>
        <View style={styles.kakaoBoxPrimeContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              // 홈 페이지 템플릿 박스에서 URL로 연결되는 경우라면 URL 링킹, 앱 내부 이동이라면 네비게이션 이벤트 적용
              <TouchableOpacity style={styles.kakaoBoxContainer} onPress={() => item.URL !== 1 ? this.onPressLinking(item.URL) : navigation.navigate('Category')}>
                <View style={{ marginTop: wp('10%') }}>
                  {typeof item.emoji === 'string'
                    ? <Emoji name={item.emoji} style={{ fontSize: 50, marginRight: wp('10%') }} />
                    : <Image source={item.emoji} style={{ width: wp('20%'), height: wp('20%'), marginRight: wp('5%') }} />}
                </View>
                <View alignItems="flex-end" marginTop={wp('10%')}>
                  <Text>{item.text1}</Text>
                  <Text>{item.text2}</Text>
                  <Text />
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'rgb(0, 122, 255)', fontWeight: 'bold' }}>{item.text3}</Text>
                    <Emoji name="point_right" />
                  </View>
                </View>
              </TouchableOpacity>

            )}
            numColumns={1}
            keyExtractor={item => item.text1}
          />
        </View>
      </View>
    );
  };

  onViewedProductRemoved = async () => {
    console.log('activated');
    const openedProducts = await (asyncStorageGet('openedProducts'));
    if (openedProducts) {
      const productsArray = [];
      for (let i = 0; i < openedProducts.length; i += 1) {
        productsArray.push(Number(openedProducts[i]));
      }
      // console.log(productsArray)
      const receivedOpenedGoods = await Axios.get(`http://api.crunchprice.com/goods/recent_goods.php?todayGoodsNo=[${productsArray}]`);
      // console.log(JSON.stringify(receivedOpenedGoods));
      const processedOpenedResults = JSON.stringify(receivedOpenedGoods.data.data);
      await this.setState({ recentlyOpened: JSON.parse(processedOpenedResults) });
      // console.log(this.state.recentlyOpened)
    } else {
      return null;
    }
    return 'anything';
  }

  render() {
    const {
      bannerData,
      bannerLoaded,
      // modalVisible,
      recentlyOpened,
      openedProductsLoaded,
      isProductRemoved,
    } = this.state;
    const { navigation } = this.props;
    // console.log(bannerData);
    if (!bannerLoaded && !openedProductsLoaded) {
      return (
        <Image source={require('../assets/images/crunchLoading.png')} />
      );
    }
    return (
      <View style={styles.primeContainer}>
        <NavigationEvents
          onWillFocus={() => {
            this.onViewedProductRemoved();
            console.log('onWillFocus');
          }}
        />
        <ScrollView vertical>
          <MainRecommended bannerData={bannerData} />
          {recentlyOpened.length === 0 ? this.createTemplateBox(noOpenedGoods) : <MainRecentlyOpened navigation={navigation} recentlyOpened={recentlyOpened} isProductRemoved={isProductRemoved} onViewedProductRemoved={this.onViewedProductRemoved} /> }
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: wp('5%'), marginBottom: hp('-2%'), fontFamily: 'NanumSquareRoundL' }}>크런치 프라이스에서,</Text>
          <MainRecommended bannerData={bannerData} />
          {this.createTemplateBox(kakaotalkAsk)}
          {this.createTemplateBox(kakaotalkSellerCenter)}
          <View style={{ marginLeft: 20, marginRight: 10, paddingBottom: 60 }}>
            <View style={styles.footerLine} />
            <Text style={styles.footerChar}>(주)크런치 컴퍼니는 결제정보의 중개서비스 또는 통신판매중개시스템의 제공자로서, 통신판매의 당사자가 아니며 상품의 주문, 배송 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</Text>
            <View style={styles.footerLine} />
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, textAlign: 'left' }}>
              <Text style={styles.footerChar} onPress={() => this.onPressLinking('http://www.crunchprice.com/service/company.php')}>회사소개</Text>
              <Text style={styles.footerDistint}>\</Text>
              <Text style={styles.footerChar} onPress={() => this.onPressLinking('http://www.crunchprice.com/service/agreement.php')}>이용약관</Text>
              <Text style={styles.footerDistint}>\</Text>
              <Text style={styles.footerChar} onPress={() => this.onPressLinking('http://www.crunchprice.com/service/private.php')}>개인정보취급방침</Text>
              <Text style={styles.footerDistint}>\</Text>
              <Text style={styles.footerChar} onPress={() => this.onPressLinking('http://www.crunchprice.com/service/guide.php')}>이용안내</Text>
              <Text style={styles.footerDistint}>\</Text>
              <Text style={styles.footerChar} onPress={() => this.onPressLinking('http://www.crunchprice.com/service/cooperation.php')}>광고/제휴 문의</Text>
            </View>
            <View>
              <Text style={styles.footerChar}>상호명: 주식회사 크런치컴퍼니</Text>
              <Text style={styles.footerChar}>대표: 김민준</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.footerChar}>메일 : </Text>
                <Text style={[styles.footerChar, styles.footerLink]} onPress={() => this.onPressLinking('mailto:contact@crunchprice.com')}>contact@crunchprice.com</Text>
              </View>
              <Text style={styles.footerChar}>통신판매업신고번호 : 제2018-서울강남-00963호</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.footerChar}>사업자신고번호 : </Text>
                <Text style={styles.footerChar}>209-87-01010 </Text>
                <Text style={[styles.footerChar, styles.footerLink]} onPress={() => this.onPressLinking('http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2098701010&apv_perm_no=')}>[사업자정보확인]</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.footerChar}>대표번호 : </Text>
                <Text style={[styles.footerChar, styles.footerLink]} onPress={() => this.onPressLinking('tel:070-4327-9792')}>070-4327-9792</Text>
              </View>
              <Text style={styles.footerChar}>주소 : 서울특별시 강남구 논현로 57길 30 지하 1층</Text>
              <Text style={styles.footerChar}>개인정보관리자 : 김민준</Text>
              <Text style={styles.footerChar}>건강기능식품 판매업 : 제 2018-0109112호</Text>
              <Text />
              <Text onPress={this.testCookieRequest} style={styles.footerChar}>copyright (c) CrunchPrice.com all rights reserved.</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  primeContainer: {
    backgroundColor: 'rgb(239, 239, 244)',
    flex: 1,
    flexDirection: 'column',
  },
  Container: {
    flex: 1,
  },
  Footer: {
    flex: 1,
  },
  startUpModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(239, 239, 244, 0.5)',
    elevation: 20,
    padding: 10,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    color: 'rgb(235, 235, 235)',
  },
  footerChar: {
    fontSize: 10,
    color: 'rgb(108, 108, 113)',
    fontFamily: 'NanumSquareRoundL',
  },
  footerDistint: {
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  footerLink: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  kakaoBoxPrimeContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
    
    borderRadius: 10,
    //width: wp('85%'),
    //height: hp('20%'),
    alignSelf: 'center',
    elevation: 10,
  },
  kakaoBoxContainer: {
    flex: 1,
    width: wp('84%'),
    height: hp('19%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    
  },
  recommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

/*
<Modal
          animationType="slide"
          transparent
          visible={modalVisible}
        >
          <View style={styles.startUpModal}>
            <Text>saaassdd</Text>
            <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
              <Text>close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={{marginLeft: 10, marginRight: 20, marginBottom: 50}}>
            <View style={styles.callKaKao}>
              <View style={{flex: 2, flexDirection: 'row', borderWidth: 0.5, borderColor: 'black'}}>
                <Image source={{uri:'', width: wp('10%'), height: hp('10%')}}></Image>
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end',marginTop: 25, marginRight: 40, borderWidth: 0.5, borderColor: 'black'}}>
            <Text>구매 회원님,</Text>
            <Text>카톡으로 편하게 문의하세요.</Text>
            <Text />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>구매자 전용 카카오톡 문의</Text>
            </View>
            </View>
          </View>
          <View style={styles.callKaKao}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Emoji
                  name='coffee'
                  size={1500}
                  style={{ marginBottom: hp(0), marginRight: wp(5) }}
                />
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end',marginTop: 25, marginRight: 40}}>
            <Text>손 쉽게 입점하세요.</Text>
            <Text>2분만에 입점신청 완료!</Text>
            <Text />
            <Text>카카오톡 판매자 센터 가기</Text>
            </View>
            </View>
          </View>
          </View>

*/


// 상품상세페이지 이동할 경우, 상세페이지는 웹뷰는 처리한다, 그 전에 상품 번호를 asyncstorage로 저장해서
