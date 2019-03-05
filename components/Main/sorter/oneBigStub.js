import React from 'react';
import {
  Image,
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

// 현재 배너와 열어본 상품을 여기에 함께 정의해 놓았음
const oneBigStub = ({recentlyOpened}) => (
  <View style={styles.primeContainer}>
    <FlatList
      data={recentlyOpened}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.container}>
          <Image source={{ uri: item.mainImageUrl, width: wp('65%'), height: hp('35%') }} style={styles.recommendedImages} />
          <View>
            <Text>{item.goodsNm}</Text>
            <Text>{item.goodsUnitPrice1}</Text>
          </View>
        </TouchableOpacity>
      )}
      numColumns={1}
      keyExtractor={(item) => item.name}
    />
  </View>
);
const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: wp('80%'),
    height: hp('50%'),
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  recommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  sortingIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('85%'),
  },
});

export default oneBigStub;
