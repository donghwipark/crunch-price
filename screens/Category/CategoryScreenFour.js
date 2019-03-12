import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
  FlatList,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { openedItemAsync } from '../../helper/helperFuncs';

export default class CategoryScreenFour extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name'),
    headerRight: (
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: wp('6.5%'), height: wp('8%'), marginRight: wp('3%'), marginBottom: hp('1%') }}
          source={require('../../assets/images/trolley.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
  });

  state = {
    sortingType: 'focused',
    searchInfo: '',
    page: 1,
    cateCd: null,
    category: '',
    listUri: require('../../assets/images/list.png'),
    gridUri: require('../../assets/images/grid.png'),
    oneUri: require('../../assets/images/oneAfter.png'),
  };

  componentDidMount = async () => {
    const { navigation } = this.props;
    await this.setState({ cateCd: navigation.getParam('cateCd') });
    this.updateSearch();
  }


  onPressList = () => {
    this.setState({
      listUri: require('../../assets/images/listAfter.png'),
      gridUri: require('../../assets/images/grid.png'),
      oneUri: require('../../assets/images/one.png'),
    });
    this.setState({
      sortingType: 'list',
    });
  }

  onPressGrid = () => {
    this.setState({
      listUri: require('../../assets/images/list.png'),
      gridUri: require('../../assets/images/gridAfter.png'),
      oneUri: require('../../assets/images/one.png'),
    });
    this.setState({
      sortingType: 'grid',
    });
  }

  onPressFocused = () => {
    this.setState({
      oneUri: require('../../assets/images/oneAfter.png'),
      listUri: require('../../assets/images/list.png'),
      gridUri: require('../../assets/images/grid.png'),
    });
    this.setState({
      sortingType: 'focused',
    });
  }


  onSelection = async (item) => {
    const { navigation } = this.props
    const getItem = await AsyncStorage.getItem('recentlyViewedItems');
    if (getItem === null) {
      const array = [];
      array.push(item);
      await AsyncStorage.setItem('recentlyViewedItems', JSON.stringify(array));
    } else {
      let getItemArray = JSON.parse(getItem);
      getItemArray = new Set(getItemArray);
      getItemArray = Array.from(getItemArray);
      getItemArray.push(item);
      await AsyncStorage.setItem('recentlyViewedItems', JSON.stringify(getItemArray));
    }
    await openedItemAsync(item);
    navigation.navigate('WebView', { goodsNo: item[1] });
  }

  onSelectCategory = (num, name) => {
    console.log('on select the list', name, num);
    const { navigation } = this.props;
    axios
      .get('http://api.crunchprice.com/category/get_category_counts.php', {
        params: {
          cateCd: num,
        },
      })
      .then(response => response.data.data)
      .then((response) => {
        if (response.result === 'fail') {
          this.setState({ cateCd: num });
          this.updateSearch();
        }
        navigation.navigate('CategoryTwo', { cateCd: num, name, category: response });
      });
  }


  updateSearch = async () => {
    const { cateCd } = this.state;
    axios
      .get('http://api.crunchprice.com/goods/get_category_goods.php', {
        params: {
          page: '1',
          cateCd,
        },
      })
      .then((response) => {
        const { length } = response.data.data;
        if (length > 0) {
          const itemsInfo = [];
          for (let i = 0; i < length; i++) {
            const produceInfo = [];
            produceInfo.push(response.data.data[i].goodsNm);
            produceInfo.push(response.data.data[i].goodsNo);
            produceInfo.push(response.data.data[i].mainImageUrl);
            produceInfo.push(response.data.data[i].goodsUnitPrice10);
            produceInfo.push(response.data.data[i].goodsUnitPrice1);
            itemsInfo.push(produceInfo);
          }
          return itemsInfo;
        }
        // name response.data.data[0].goodsNm
        // key response.data.data[0].goodsNo
        // image  response.data.data[0].mainImageUrl
        // 10th price response.data.data[0].goodsUnitPrice10
        // 1th price response.data.data[0].goodsUnitPrice1
      })
      .then((result) => {
        this.setState({ searchInfo: result });
        this.setState({ page: 1 });
      })
      .catch((error) => {
        console.error(error);
      });
    // await AsyncStorage.removeItem('search')
  };

  makeRemoteRequest = async (val) => {
    const { cateCd, searchInfo, page } = this.state;
    let num = Number(page);
    num += 1;
    this.setState({ page: num });
    if (val.distanceFromEnd > 0) {
      axios
        .get('http://api.crunchprice.com/goods/get_category_goods.php', {
          params: {
            page,
            cateCd,
          },
        })
        .then((response) => {
          const { length } = response.data.data;
          if (length > 0) {
            const itemsInfo = [];
            for (let i = 0; i < length; i += 1) {
              const produceInfo = [];
              produceInfo.push(response.data.data[i].goodsNm);
              produceInfo.push(response.data.data[i].goodsNo);
              produceInfo.push(response.data.data[i].mainImageUrl);
              produceInfo.push(response.data.data[i].goodsUnitPrice10);
              produceInfo.push(response.data.data[i].goodsUnitPrice1);
              itemsInfo.push(produceInfo);
            }
            return itemsInfo;
          }
        })
        .then((result) => {
          this.setState({ searchInfo: [...searchInfo, ...result] });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  checkLengthOnGrid = (description) => {
    const arrangedDescription = `${description.slice(0, 35)}...`;
    return arrangedDescription;
  }

  render() {
    const { navigation } = this.props;
    const { sortingType, searchInfo, listUri, gridUri, oneUri } = this.state;
    const itemInfo = searchInfo || navigation.getParam('result');
    const category = navigation.getParam('category');
    const oneBigStub = (
      <View style={styles.onePrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.oneContainer}
              onPress={() => this.onSelection(item)}
            >
              <Image source={{ uri: item[2] }} style={styles.oneRecommendedImages} />
              <Image
                source={require('../../assets/images/heart.png')}
                style={{ position: 'absolute',
                  resizeMode: 'contain',
                  width: wp('20%'),
                  height: hp('20%'),
                  alignItems: 'center',
                  marginLeft: wp('72%'),
                  marginTop: hp('26%'),
                }}
              />
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', margin: wp('3%'),
              }}
              >
                <Text style={{ fontSize: 14, color: 'rgb(46,57,67)' }}>{item[0]}</Text>
                <Text style={{ fontSize: 17.2, fontWeight: 'bold', color: 'rgb(46, 57, 67)', marginTop: 10, marginBottom: 10 }}>
                  {Number(item[3]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' - '}
                  {Number(item[4]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' 원'}
                </Text>
                <View />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgb(255,127,61)', padding: 8 }}>
                    <Text style={{ fontSize: 10, color: 'rgb(255,255,255)', marginLeft: wp('1%'), marginRight: wp('1%') }}>
                      0/00 까지 배송
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ alignItems: 'center', marginLeft: wp('1%'), marginRight: wp('1%'), justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgb(242,242,242)', padding: 8, marginLeft: wp('1.5%') }}>
                    <Text style={{ fontSize: 10, color: 'rgb(102,102,102)', marginLeft: wp('1%'), marginRight: wp('1%') }}>
                      무료배송
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
          refreshing={false}
          legacyImplementation={false}
          onRefresh={() => console.log('done')}
          onEndReachedThreshold={0.5}
          onEndReached={distanceFromEnd => this.makeRemoteRequest(distanceFromEnd)}
          ListFooterComponent={() => <ActivityIndicator animating size="large" />}
          key={(item, index) => index.toString()}
        />
      </View>
    );
    const grid = (
      <View style={styles.gridPrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gridContainer}
              onPress={() => this.onSelection(item)}
            >
              <View>
                <Image source={{ uri: item[2], width: wp('45%'), height: hp('27%') }} style={styles.gridRecommendedImages} />
                <Image
                  source={require('../../assets/images/heart.png')}
                  style={{ position: 'absolute',
                    resizeMode: 'contain',
                    width: wp('15%'),
                    height: hp('15%'),
                    alignItems: 'center',
                    marginLeft: wp('34%'),
                    marginTop: hp('10%'),
                  }}
                />
              </View>
              <View style={{ flex: 1, margin: wp('2%'), alignItems: 'stretch', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 10, color: 'rgb(46,57,67)' }}>
                  {
                    this.checkLengthOnGrid(item[0])
                  }
                </Text>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'rgb(46,57,67)' }}>
                  {Number(item[3]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' - '}
                  {Number(item[4]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' 원'}
                </Text>
                <View />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgb(255,127,61)', padding: 8 }}>
                    <Text style={{ fontSize: 10, color: 'rgb(255,255,255)', marginLeft: wp('1%'), marginRight: wp('1%') }}>
                      0/00 까지 배송
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ alignItems: 'center', marginLeft: wp('1%'), marginRight: wp('1%'), justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgb(242,242,242)', padding: 8, marginLeft: wp('1.5%') }}>
                    <Text style={{ fontSize: 10, color: 'rgb(102,102,102)', marginLeft: wp('1%'), marginRight: wp('1%') }}>
                      무료배송
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          refreshing={false}
          legacyImplementation={false}
          onRefresh={() => console.log('done')}
          onEndReachedThreshold={0.5}
          onEndReached={distanceFromEnd => this.makeRemoteRequest(distanceFromEnd)}
          ListFooterComponent={() => <ActivityIndicator animating size="large" />}
          keyExtractor={(_, i) => i}
        />
      </View>
    );
    const list = (
      <View style={styles.listPrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listContainer}
              onPress={() => this.onSelection(item)}
            >
              <View>
                <Image source={{ uri: item[2], width: wp('25%'), height: hp('15%') }} style={styles.listRecommendedImages} />
              </View>
              <View style={{ flex: 1, margin: wp('4%'), flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 11, color: 'rgb(46,57,67)' }}>{item[0]}</Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'rgb(46,57,67)' }}>
                  {Number(item[3]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' - '}
                  {Number(item[4]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  {' 원'}
                </Text>
                <View />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgb(255,127,61)', padding: 6 }}>
                      <Text style={{ fontSize: 8, color: 'rgb(255,255,255)', marginLeft: wp('2%'), marginRight: wp('2%') }}>
                        0/00 까지 배송
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center', marginLeft: wp('2%'), justifyContent: 'center', borderRadius: 15, backgroundColor: 'rgb(242,242,242)', padding: 6 }}>
                      <Text style={{ fontSize: 8, color: 'rgb(102,102,102)', marginLeft: wp('2%'), marginRight: wp('2%') }}>
                        무료배송
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Image
                      source={require('../../assets/images/heart.png')}
                      style={{
                        resizeMode: 'contain',
                        width: wp('8%'),
                        height: hp('4%'),
                        alignItems: 'center',
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
          refreshing={false}
          legacyImplementation={false}
          onRefresh={() => console.log('done')}
          onEndReachedThreshold={0.5}
          onEndReached={distanceFromEnd => this.makeRemoteRequest(distanceFromEnd)}
          ListFooterComponent={() => <ActivityIndicator animating />}
          key={(item, h) => h.toString()}
        />
      </View>
    );

    return (
      <View style={styles.primeContainer}>
        <FlatList
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          horizontal
          data={category}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.onSelectCategory(item.cateCd, item.cateNm)}
              style={{ marginLeft: wp('3%'),
              }}
            >
              <View style={{
                flexDirection: 'row',
                backgroundColor: 'rgb(242, 242, 242)',
                padding: 10,
                marginLeft: wp('1%'),
                marginRight: wp('1%'),
                borderRadius: 11,
              }}
              >
                <Text style={{ fontSize: 10, color: 'rgb(102.102.102)' }}>
                  {item.cateNm}
                </Text>
                <Text style={{ fontSize: 10, color: 'rgb(102.102.102)', marginLeft: wp('0.5%') }}>
                  {item.cateCount}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
          key={item => item.cateCd.toString()}
        />
        <View style={styles.sortingIcons}>
          <TouchableOpacity onPress={this.onPressList}>
            <Image
              source={listUri}
              resizeMode="contain"
              style={{ width: wp('3%'), height: hp('3%'), padding: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPressGrid}
          >
            <Image
              source={gridUri}
              resizeMode="contain"
              style={{ width: wp('3%'), height: hp('3%'), padding: 10, marginLeft: wp('1.5%') }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressFocused}>
            <Image
              source={oneUri}
              resizeMode="contain"
              style={{ width: wp('3%'), height: hp('3%'), padding: 10, marginLeft: wp('1.5%') }}
              onPress={this.onPressFocused}
            />
          </TouchableOpacity>
        </View>
        {sortingType === 'grid' ? grid : sortingType === 'list' ? list : oneBigStub}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
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
  sortingIcons: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: wp('95%'),
  },
  gridPrimeContainer: {
    flex: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: hp('1%') },
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: wp('48%'),
    margin: 5,
    position: 'relative',
    height: hp('30%'),
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  gridRecommendedImages: {
    width: wp('48%'),
    height: hp('20%'),
    alignSelf: 'center',
  },
  listPrimeContainer: {
    flex: 10,
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: hp('1%') },
    overflow: 'hidden',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: wp('92%'),
    marginBottom: hp('2%'),
    // height: hp('18%'),
    overflow: 'hidden',
    borderRadius: 10,
  },
  listRecommendedImages: {
    alignSelf: 'center',
    width: wp('35%'),
  },
  onePrimeContainer: {
    flex: 10,
    alignItems: 'center',
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowColor: 'rgb(100,100,100)',
    shadowOffset: { width: 0, height: hp('0.4%') },
  },
  oneContainer: {
    backgroundColor: '#fff',
    width: wp('90%'),
    borderWidth: 0.5,
    borderColor: 'rgb(240,240,240)',
    borderRadius: 8,
    marginTop: hp('2%'),
    position: 'relative',
    overflow: 'hidden',
  },
  oneRecommendedImages: {
    alignSelf: 'center',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    width: wp('90%'),
    height: hp('40%'),
  },
});
