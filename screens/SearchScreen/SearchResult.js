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
import { SearchBar } from 'react-native-elements';
import { Feather, SimpleLineIcons, FontAwesome } from 'react-native-vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SearchResult extends React.Component {
  state = {
    sortingType: 'focused',
    beforeSearch: null,
    search: null,
    searchInfo: '',
    page: 1,
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ searchInfo: navigation.getParam('result') });
    this.setState({ search: navigation.getParam('search') });
  }

  onPressList = () => {
    this.setState({
      sortingType: 'list',
    });
  }

  onPressGrid = () => {
    this.setState({
      sortingType: 'grid',
    });
  }

  onPressFocused = () => {
    this.setState({
      sortingType: 'focused',
    });
  }

  onSelection = async (item) => {
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
  }

  updateSearch = async () => {
    const { beforeSearch } = this.state;
    const search = beforeSearch;
    axios
      .get('http://api.crunchprice.com/goods/get_search_word_goods.php', {
        params: {
          page: '1',
          searchWords: search,
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

    if (search.length > 0) {
      const getItem = await AsyncStorage.getItem('search');
      if (getItem === null) {
        const array = [];
        array.push(search);
        await AsyncStorage.setItem('search', JSON.stringify(array));
      } else {
        let getItemArray = JSON.parse(getItem);
        getItemArray = new Set(getItemArray);
        getItemArray = Array.from(getItemArray).slice(-9);
        getItemArray.push(search);
        await AsyncStorage.setItem('search', JSON.stringify(getItemArray));
      }
    }
  };

  makeRemoteRequest = async (val) => {
    const { search, searchInfo, page } = this.state;
    let num = Number(page);
    num += 1;
    this.setState({ page: num });
    if (val.distanceFromEnd > 0) {
      axios
        .get('http://api.crunchprice.com/goods/get_search_word_goods.php', {
          params: {
            page,
            searchWords: search,
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
    if (description.length > 38) {
      return (
        `${description.slice(0, 35)}...`
      );
    }
    return description;
  }

  render() {
    const { navigation } = this.props;
    const { sortingType, searchInfo, search, beforeSearch } = this.state;
    const itemInfo = searchInfo || navigation.getParam('result');
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
              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', margin: wp('2.5%'),
              }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item[0]}</Text>
                <Text style={{ fontSize: 16, textDecorationLine: 'line-through', color: 'rgb(197,197,197)', marginTop: 5 }}>{Number(item[4])}</Text>
                <Text style={{ fontSize: 15, marginTop: 5 }}>10개 이상 구매 시 할인가</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>
                  {Number(item[3])}
                  {'원'}
                </Text>

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
              <Image source={{ uri: item[2], width: wp('45%'), height: hp('25%') }} style={styles.gridRecommendedImages} />
              <View style={{ margin: wp('1.25%') }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {
                    this.checkLengthOnGrid(item[0])
                  }
                </Text>
                <Text style={{ fontSize: 12, textDecorationLine: 'line-through', color: 'rgb(197,197,197)', marginTop: 3, marginBottom: 3 }}>{Number(item[4])}</Text>
                <Text style={{ fontSize: 12 }}>10개 이상 구매 시 할인가</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {Number(item[3])}
                  {'원'}
                </Text>
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
              <Image source={{ uri: item[2], width: wp('25%'), height: hp('15%') }} style={styles.listRecommendedImages} />
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'stretch' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10, marginRight: 10 }}>{item[0]}</Text>
                <Text />
                <Text style={{ fontSize: 12, color: 'rgb(136,136,136)', textDecorationLine: 'line-through' }}>{Number(item[4])}</Text>
                <Text style={{ fontSize: 14 }}>10개 이상 구매 시 할인가</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16 }}>
                  {Number(item[3])}
                  {'원'}
                </Text>
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
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder="검색어 입력"
          onSubmitEditing={this.updateSearch}
          onChangeText={val => this.setState({ beforeSearch: val })}
          value={beforeSearch}
          style={{ position: 'relative' }}
        />
        <View style={styles.sortingIcons}>
          <Feather
            name="list"
            size={26}
            style={{ padding: 2 }}
            onPress={this.onPressList}
          />
          <SimpleLineIcons
            name="grid"
            size={20}
            style={{ padding: 2 }}
            onPress={this.onPressGrid}
          />
          <FontAwesome
            name="square-o"
            size={26}
            style={{ padding: 2 }}
            onPress={this.onPressFocused}
          />
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: wp('95%'),
  },
  gridPrimeContainer: {
    flex: 10,
    backgroundColor: 'rgb(222,222,222)',
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: wp('50%'),
    margin: 5,
    height: hp('40%'),
    borderRadius: 10,
  },
  gridRecommendedImages: {
    margin: wp('1.25%'),
    borderRadius: 10,
  },
  listPrimeContainer: {
    flex: 10,
    alignItems: 'center',
    backgroundColor: 'rgb(222,222,222)',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: wp('95%'),
    // height: hp('18%'),
    marginTop: hp('1.5%'),
    borderRadius: 10,
  },
  listRecommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  onePrimeContainer: {
    flex: 10,
    alignItems: 'center',
    backgroundColor: 'rgb(222,222,222)',
  },
  oneContainer: {
    backgroundColor: '#fff',
    width: wp('90%'),
    borderRadius: 10,
    marginTop: hp('2.5%'),
    position: 'relative',
  },
  oneRecommendedImages: {
    marginLeft: wp('2.5%'),
    // marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    // marginTop: 10,
    // marginBottom: 10,
    resizeMode: 'contain',
    width: wp('85%'),
    height: hp('50%'),

  },
});
