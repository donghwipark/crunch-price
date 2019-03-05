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

import fakeDatab from '../fakeData';
import { handleNumberToPrice } from '../../../helper/helperFuncs';
 
// 현재 배너와 열어본 상품을 여기에 함께 정의해 놓았음
const Grid = ({recentlyOpened}) => {
  return (
  <View style={styles.primeContainer}>
    <FlatList
      data={recentlyOpened}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.container}>
          <Image source={{ uri: item.mainImageUrl, width: wp('40%'), height: hp('25%') }} style={styles.recommendedImages} />
          <Text>{item.goodsNm}</Text>
          <Text />
          {
                    item.goodsUnitPrice1 > item.goodsUnitPrice10 ? (
                      <View>
                        <Text />
                        <Text style={{ fontSize: 9, textDecorationLine: 'line-through'}}>{`${handleNumberToPrice(Number(item.goodsPrice))}원`}</Text>
                        <Text style={{ fontSize: 7 }}>10개 이상 구매 시 할인가</Text>
                        <Text><Text style={{ fontSize: 9 }}>{`${handleNumberToPrice((Number(item.goodsUnitPrice1) - Number(item.goodsUnitPrice10))*10)}원`}</Text></Text>
                      </View>
                    )
                      : (
                        <View>
                          <Text />
                          <Text style={{ fontSize: 9 }}>{`${handleNumberToPrice(Number(item.goodsPrice))}원`}</Text>
                        </View>
                      )
                  }
        </TouchableOpacity>
      )}
      numColumns={2}
      keyExtractor={(item) => item.name}
    />
  </View>
)};

const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 10,
    width: wp('50%'),
    height: hp('40%'),
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

export default Grid;
