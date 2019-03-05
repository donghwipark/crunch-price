import React from 'react';
import {
  Image,
  // Platform,
  ScrollView,
  StyleSheet,
  // Text,
  // TouchableOpacity,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MainRecommended = ({ bannerData }) => (
  <View style={styles.primeContainer}>

    <ScrollView horizontal style={styles.container}>
        <FlatList
horizontal
        data={bannerData}
        renderItem={({ item }) => (
        <TouchableOpacity style={styles.container} onPress={() => { Linking.openURL(item.bannerLink); }}>
          <Image source={{ uri: item.imgLink, width: wp('65%'), height: hp('35%') }} style={styles.recommendedImages} />
        </TouchableOpacity>
      )}
        numColumns={1}
        keyExtractor={(item, i) => i.toString()}
      />



      </ScrollView>


  </View>
);

// 차후 flatlist로 dynamic 하게 보일 예정

const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
  },
  recommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  box: {
    flex: 1,
  },
  box1: {
    backgroundColor: '#fff',
  },
  box2: {
    backgroundColor: '#fff',
  },
  box3: {
    backgroundColor: '#fff',
  },
  smallBox: {
    height: 100,
    width: 100,
  },
});


export default MainRecommended;


/*

{bannerData.map((item, i) => (
      <TouchableOpacity onPress={() => Alert.alert(item.bannerLink)}>
      <View key={item.imgLink}>
      <Image style={styles.recommendedImages} source={{uri: item.imgLink, width: wp('30%'), height: hp('30%')}} ></Image>
      </View>
      </TouchableOpacity>
      )
                  )}

Array [
  Object {
    "bannerLink": "/",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "https://pf.kakao.com/_UraTC",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "https://m.blog.naver.com/PostView.nhn?blogId=crunchcompany&amp;logNo=221232936626&amp;referrerCode=0&amp;searchKeyword=%EC%82%AC%EC%97%85%EC%9E%90",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "https://m.blog.naver.com/PostView.nhn?blogId=crunchcompany&amp;logNo=221292118666&amp;navType=tl",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "https://m.docs.google.com/forms/d/e/1FAIpQLScvbfnspzxPcwJagoBPezuXHnEnWOGzWRIH4H_3837tYwQ4qg/viewform",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "https://pf.kakao.com/_UraTC",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "https://pf.kakao.com/_xdnfxfj",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "링크1",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
  Object {
    "bannerLink": "테스트",
    "imgLink": "http://image.auction.co.kr/itemimage/15/d6/48/15d6486f56.jpg",
  },
]
*/
