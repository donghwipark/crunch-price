import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { handleNumberToPrice } from '../../helper/helperFuncs';

export default class MainRecentlyOpened extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyOpened: [],
    };
  }

  async componentDidMount() {
    const { recentlyOpened } = this.props;
    await this.setState({ recentlyOpened });
  }

  onPressMoreDetails = () => {
    const { navigation } = this.props;
    const { recentlyOpened } = this.state;
    navigation.navigate('OpenedList', {
      recentlyOpened,
    });
  }


  render() {
    const { recentlyOpened } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.primeContainer}>
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: '-2%' }}>
          <Text style={{ alignSelf: 'flex-start', marginLeft: 20, fontSize: 13 }}>확인하신 상품들</Text>
          <Text onPress={this.onPressMoreDetails} style={{ marginLeft: 'auto', marginRight: 10, fontSize: 13, color: 'blue' }}>더 보기</Text>
        </View>
        <ScrollView horizontal style={styles.container}>
          <FlatList
            horizontal
            data={recentlyOpened}
            renderItem={({ item }) => (
              <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { item })} style={{ backgroundColor: 'white', width: wp('32%'), height: hp('26%'), borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                  <Image source={{ uri: item.mainImageUrl, width: wp('32%'), height: hp('15%') }} style={styles.recommendedImages} />
                  <Text style={{ fontSize: 9 }} numberOfLines={2}>{item.goodsNm}</Text>
                  {
                    item.goodsUnitPrice1 > item.goodsUnitPrice10 ? (
                      <View>
                        <Text />
                        <Text style={{ fontSize: 9, textDecorationLine: 'line-through' }}>{`${handleNumberToPrice(Number(item.goodsPrice))}원`}</Text>
                        <Text style={{ fontSize: 7 }}>10개 이상 구매 시 할인가</Text>
                        <Text><Text style={{ fontSize: 9 }}>{`${handleNumberToPrice((Number(item.goodsUnitPrice1) - Number(item.goodsUnitPrice10)) * 10)}원`}</Text></Text>
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

              </View>
            )}
            numColumns={1}
            keyExtractor={(item) => item.name}
          />
        </ScrollView>
      </View>
    );
  }

  /*
  <Text>{item.goodsUnitPrice1}</Text>
    {sortingType === 'grid'? (
      <Grid />
     ) : sortingType === 'list'? (
       <List />
     ) : (
       <Focused />
     )}
*/
}
const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  recommendedImages: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  sortingIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('95%'),
  },
});
/*
[
    {
        "goodsNo":"1004020377",
        "cateCd":"004025010014",
        "scmNo":"1163","brandCd":"",
        "goodsNmFl":"d","goodsNmMain":"",
        "goodsNmList":"",
        "goodsNm":"레인OK 마이티2 초발수 메탈 하이브리드와이퍼 SET",
        "mileageFl":"c","goodsPriceString":"",
        "optionName":"옵션선택",
        "optionValue":"",
        "stockFl":"n",
        "goodsModelNo":"",
        "onlyAdultFl":"n",
        "orderCnt":0,"makerNm":"",
        "shortDescription":"",
        "imageStorage":"url",
        "imagePath":"",
        "goodsCd":"",
        "soldOutFl":"n",
        "soldOut":"n",
        "orderPossible":"y",
        "goodsPrice":"31900.00",
        "goodsUnitPrice1":"31900.00",
        "goodsUnitPrice2":"31581.00",
        "goodsUnitPrice3":"31262.00",
        "goodsUnitPrice4":"30943.00",
        "goodsUnitPrice5":"30624.00",
        "goodsUnitPrice6":"30305.00",
        "goodsUnitPrice7":"29986.00",
        "goodsUnitPrice8":"29667.00",
        "goodsUnitPrice9":"29348.00",
        "goodsUnitPrice10":"29029.00",
        "fixedPrice":"0.00",
        "mileageGoods":"0.00",
        "mileageGoodsUnit":"percent",
        "goodsIconStartYmd":null,
        "goodsIconEndYmd":null,
        "goodsIconCdPeriod":null,
        "goodsIconCd":null,
        "hitCnt":"1",
        "goodsDiscountFl":"n",
        "goodsDiscount":"0.00",
        "goodsDiscountUnit":"percent",
        "optionFl":"y",
        "sort":"00000",
        "mainImageUrl":"https://shop-phinf.pstatic.net/20181217_92/jscom496_1545028141430APKRf_JPEG/101018_1.jpg?type=m510",
        "minPrice":"29029",
        "maxPrice":"31900"
    },
    {"goodsNo":"1004036866",
    "cateCd":"006003007",
    "scmNo":"748",
    "brandCd":"","goodsNmFl":"d",
    "goodsNmMain":"",
    "goodsNmList":"",
    "goodsNm":"오레가모 포테이토 크리스프 와사비맛 12g_수입과자",
    "mileageFl":"c",
    "goodsPriceString":"",
    "optionName":"",
    "optionValue":"",
    "stockFl":"n",
    "goodsModelNo":"",
    "onlyAdultFl":"n",
    "orderCnt":0,
    "makerNm":"",
    "shortDescription":"",
    "imageStorage":"url",
    "imagePath":"",
    "goodsCd":"",
    "soldOutFl":"n",
    "soldOut":"n",
    "orderPossible":"y",
    "goodsPrice":"100.00",
    "goodsUnitPrice1":"100.00",
    "goodsUnitPrice2":"100.00",
    "goodsUnitPrice3":"100.00",
    "goodsUnitPrice4":"100.00",
    "goodsUnitPrice5":"100.00",
    "goodsUnitPrice6":"100.00",
    "goodsUnitPrice7":"100.00",
    "goodsUnitPrice8":"100.00",
    "goodsUnitPrice9":"100.00",
    "goodsUnitPrice10":"100.00",
    "fixedPrice":"0.00",
    "mileageGoods":"0.00",
    "mileageGoodsUnit":"percent",
    "goodsIconStartYmd":null,
    "goodsIconEndYmd":null,
    "goodsIconCdPeriod":null,
    "goodsIconCd":null,
    "hitCnt":0,
    "goodsDiscountFl":"n",
    "goodsDiscount":"0.00",
    "goodsDiscountUnit":"percent",
    "optionFl":"n",
    "sort":"00001",
    "mainImageUrl":"https://shop-phinf.pstatic.net/20190214_210/sjcluster_15501260390330RKfM_JPEG/107491_1.jpg?type=m510",
    "minPrice":"100.00",
    "maxPrice":"100.00"
  }
];

*/
