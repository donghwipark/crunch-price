import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import fakeData from './fakeData';

// 현재 배너와 열어본 상품을 여기에 함께 정의해 놓았음

const MainRecentlyOpened = () => (
  <View style={styles.primeContainer}>
    <FlatList
      data={fakeData}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.primeContainer}>
          <Image source={{ uri: item.image, width: wp('30%'), height: hp('30%') }} />
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </TouchableOpacity>
      )}
      numColumns={2}
      keyExtractor={(item) => item.name}

    />
    <View style={[styles.box, styles.box3]}>
      <ScrollView horizontal style={styles.container}>
        <Image style={styles.recommendedImages} source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: wp('70%'), height: hp('40%') }} />
        <Image style={styles.recommendedImages} source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: wp('70%'), height: hp('40%') }} />
        <Image style={styles.recommendedImages} source={{ uri: 'https://i.imgur.com/k1yVI.jpg', width: wp('70%'), height: hp('40%') }} />
      </ScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
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
});


export default MainRecentlyOpened;
/*
<View style={[styles.box, styles.box2]}>
      <View style={[styles.smallBox, styles.box3]}>
        <Image source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: 75, height: 80 }} />
        <Text>몽골진간장</Text>
        <Image source={{ uri: 'http://i.imgur.com/k1yVI.jpg', width: 75, height: 80 }} />
        <Text>몽골진간장</Text>
      </View>
    </View>
    */
