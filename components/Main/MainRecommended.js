import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MainRecommended = () => (
  <View style={styles.primeContainer}>
    <View style={[styles.box, styles.box1]}>
      <ScrollView horizontal style={styles.container}>
        <Image style={styles.recommendedImages} source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: wp('70%'), height: hp('40%') }} />
        <Image style={styles.recommendedImages} source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: wp('70%'), height: hp('40%') }} />
        <Image style={styles.recommendedImages} source={{ uri: 'https://i.imgur.com/k1yVI.jpg', width: wp('70%'), height: hp('40%') }} />
      </ScrollView>
    </View>

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
    backgroundColor: '#fff',
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
