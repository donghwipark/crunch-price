import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Image,
  AsyncStorage,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Entypo } from 'react-native-vector-icons';

const { width } = Dimensions.get('window');
const photos = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '검색',
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

  scrollX = new Animated.Value(0);

  state = {
    recentSearch: [],
    popularSearch: [],
    search: [],
    getRecentlyViewedItems: [],
  };

  onClickList = async (clickedList) => {
    await this.setState({ search: clickedList });
    this.updateSearch();
  }

  updateSearch = async () => {
    const { search } = this.state;
    const { navigation } = this.props;
    navigation.navigate('Result', { search });
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
      await AsyncStorage.getItem('search').then((res) => {
        const getResult = JSON.parse(res);
        this.setState({ recentSearch: getResult.reverse() });
      });
    }
  };

  onDeleteSearchedList = async (val) => {
    const { recentSearch } = this.state;
    const filterResult = recentSearch;
    filterResult.splice(filterResult.indexOf(val), 1);
    await this.setState({ recentSearch: filterResult });

    // delete the val from here with async option
    const getItem = await AsyncStorage.getItem('search');
    const getItemArray = JSON.parse(getItem);
    getItemArray.splice(filterResult.indexOf(val), 1);
    await AsyncStorage.setItem('search', JSON.stringify(getItemArray));
  }

  componentDidMount = async () => {
    await axios
      .get('http://api.crunchprice.com/goods/get_popular_search.php')
      .then((res) => {
        const result = res.data;
        this.setState({ popularSearch: result.data });
      });

    await AsyncStorage.getItem('search').then((res) => {
      const getResult = JSON.parse(res);
      this.setState({ recentSearch: getResult.reverse() });
    });

    await AsyncStorage.getItem('recentlyViewedItems').then((res) => {
      let recentlyViewedItems = JSON.parse(res);
      recentlyViewedItems = recentlyViewedItems.slice(-10);
      this.setState({ getRecentlyViewedItems: recentlyViewedItems.reverse() });
      AsyncStorage.SetItem('recentlyViewedItems', JSON.stringify(recentlyViewedItems))
    });
  };

  render() {
    const position = Animated.divide(this.scrollX, width);
    const { search, popularSearch, recentSearch, getRecentlyViewedItems } = this.state;
    let i = 0;
    let h = 0;
    // need to put the number of the values and the +2 to calculate the height of the tables
    return (
      <View style={styles.page}>
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder="검색어 입력"
          onClear={this.search}
          onSubmitEditing={this.updateSearch}
          onChangeText={val => this.setState({ search: val })}
          value={search}
          style={{ position: 'relative' }}
        />
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ flexDirection: 'row', padding: 5 }}>
            {photos.map((_, i) => {
              // the _ just means we won't use that parameter
              const opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
                outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
                // inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
                // outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
                extrapolate: 'clamp', // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
              });
              return (
                <Animated.View // we will animate the opacity of the dots so use Animated.View instead of View here
                  key={_.id} // we will use i for the key because no two (or more) elements in an array will have the same index
                  style={{
                    opacity,
                    height: 10,
                    width: 10,
                    backgroundColor: '#595959',
                    margin: 8,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
          <View
            // this will bound the size of the ScrollView to be a square because
            // by default, it will expand regardless if it has a flex value or not
            style={{
              width: wp('100%'),
              height: hp('60%'),
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: hp('1%') },
            }}
          >
            <ScrollView
              horizontal
              pagingEnabled // animates ScrollView to nearest multiple of it's own width
              showsHorizontalScrollIndicator={false}
              // the onScroll prop will pass a nativeEvent object to a function
              onScroll={Animated.event(
                // Animated.event returns a function that takes an array where the first element...
                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }], // ... is an object that maps any nativeEvent prop to a variable
              )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
              scrollEventThrottle={16}
              contentContainerStyle={{ flexDirection: 'row' }}
            >
              <View
                style={{
                  width: wp('90%'),
                  marginLeft: wp('5%'),
                  height: hp('55%'),
                  borderRadius: 10,
                  backgroundColor: 'rgb(239, 239, 244)',
                  elevation: 10,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 0.3,
                    borderColor: 'rgb(239, 239, 244)',
                  }}
                >
                  <Text
                    style={styles.explainText} // we will use i for the key because no two (or more) elements in an array will have the same index
                  >
                    인기 검색어
                  </Text>
                </View>
                {popularSearch.map((result) => {
                  i += 1;
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => { this.onClickList(result.keyword); }}
                      style={{
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: 'rgb(239, 239, 244)',
                        backgroundColor: 'white',
                        height: hp('5%'),
                        width: wp('90%'),

                      }}
                    >
                      <Text style={{ margin: 10 }}>
                        {' '}
                        {i}
                        {' '}
                        {' '}
                        {result.keyword}
                        {' '}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <View style={styles.bottom}>
                  <Text style={styles.explainText}>저장기능 끄기</Text>
                </View>
              </View>

              <View
                style={{
                  width: wp('90%'),
                  height: hp('60%'),
                  marginLeft: wp('10%'),
                  borderRadius: 10,
                  backgroundColor: 'rgb(239, 239, 244)',

                }}
              >
                <View
                  style={{
                    borderBottomWidth: 0.3,
                    borderColor: 'rgb(239, 239, 244)',
                  }}
                >
                  <Text style={styles.explainText}>최근 검색어</Text>
                </View>
                {recentSearch.map((result) => {
                  h += 1;
                  if (h <= 10) {
                    return (
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          key={h}
                          onPress={() => { this.onClickList(result); }}
                          style={{
                            borderLeftWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: 'rgb(239, 239, 244)',
                            backgroundColor: 'white',
                            height: hp('5%'),
                            width: wp('80%'),
                          }}
                        >
                          <Text style={{ margin: 10 }}>
                            {' '}
                            {h}
                            {' '}
                            {' '}
                            {result}
                            {' '}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgb(239, 239, 244)',
                            height: hp('5%'),
                            width: wp('10%'),
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                          onPress={() => this.onDeleteSearchedList(result)}
                        >
                          <Entypo name="circle-with-cross" style={{ color: 'grey' }} size={13} />
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
                <View style={styles.bottom}>
                  <Text style={styles.explainText}>업데이트</Text>
                </View>
              </View>

              <View
                style={{
                  width: wp('90%'),
                  marginLeft: wp('10%'),
                  marginRight: hp('3%'),
                  borderRadius: 10,
                  backgroundColor: 'rgb(239, 239, 244)',
                  height: hp('60%'),
                  marginBottom: 50,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 0.3,
                    borderColor: 'rgb(239, 239, 244)',
                  }}
                >
                  <Text
                    style={styles.explainText}
                  >
                    최근 본 상품
                  </Text>
                </View>
                <View style={{ height: hp('50%') }}>
                  <ScrollView>
                    {getRecentlyViewedItems.map(result => (
                      <TouchableOpacity
                        key={result[1]}
                        style={{
                          position: 'relative',
                          borderLeftWidth: 1,
                          borderRightWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: 'rgb(239, 239, 244)',
                          backgroundColor: 'white',
                          height: hp('15%'),
                          width: wp('90%'),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <View style={{ margin: wp('3%'), width: wp('60%'), flexDirection: 'column', justifyContent: 'space-between' }}>
                          <Text style={{ fontSize: 14 }}>
                            {result[0]}
                          </Text>
                          <Text style={{ marginBottom: hp('2%'), fontSize: 14, color: 'grey' }}>
                            {`${Number(result[3])}원~`}
                          </Text>
                        </View>
                        <Image source={{ uri: result[2] }} style={{ flex: 1 }} resizeMode="contain" />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Text style={styles.explainText}>저장기능 끄기</Text>
                  <Text style={styles.explainText}>전체삭제</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'rgb(239, 239, 244)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  page: {
    position: 'absolute',
  },
  explainText: {
    color: 'rgb(142, 142, 147)',
    margin: 10,
  },
});
