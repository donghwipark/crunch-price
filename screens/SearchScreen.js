import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  Image,
  ScrollView,
  Dimensions,
  Animated,
  AsyncStorage,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { asyncStorageSet, asyncStorageGet } from '../helper/asyncHelper';

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
  static navigationOptions = {
    headerTitleStyle: {
      textAlign: 'center',
    },
    title: '검색',
  };

  scrollX = new Animated.Value(0)

  state = {
    popularSearch: [],
    search: '',
  };
  
  updateSearch = async () => {
    const { search } = this.state
    axios.get('http://api.crunchprice.com/goods/get_search_word_goods.php', {
      params: {
        searchWords: search
      }
    })
    .then(function (response) {
      //console.log(response.data);
    })
    .catch(function (error) {
      //console.log(error);
    });

    //await AsyncStorage.removeItem('search')
    let getItem = await AsyncStorage.getItem('search')
    if ( getItem === null) {
      let array = []
      array.push(search)
      await AsyncStorage.setItem('search', JSON.stringify(array))
    } else {
      let getItemArray = JSON.parse(getItem)
      getItemArray.push(search)
      await AsyncStorage.setItem('search', JSON.stringify(getItemArray))
    }
    console.log('최종 결과값', await AsyncStorage.getItem('search'))
  };

  componentDidMount = () => {
    axios.get('http://api.crunchprice.com/goods/get_popular_search.php')
      .then((res) => {
        const result = res.data;
        this.setState({ popularSearch: result.data });
      });
  }

  render() {
    const position = Animated.divide(this.scrollX, width);
    const { search, popularSearch } = this.state;
    let i = 0;
    // need to put the number of the values and the +2 to calculate the height of the tables
    return (
      <View style={styles.page}>
        <SearchBar
          platform={
            Platform.OS === 'ios'
              ? 'ios'
              : 'android'
          }
          placeholder="검색어 입력"
          onClear={this.search}
          onSubmitEditing={this.updateSearch}
          onChangeText={ val => this.setState({ search: val }) } 
          value={search}
          style={{ position: 'relative' }}
        />
        <View style={{
          position: 'relative', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <View
            style={{ flexDirection: 'row', padding: 5 }}
          >
            {photos.map((_, i) => { // the _ just means we won't use that parameter
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
                    opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5,
                  }}
                />
              );
            })}
          </View>
          <View
            // this will bound the size of the ScrollView to be a square because
            // by default, it will expand regardless if it has a flex value or not
            style={{ top: 20, width: wp('100%'), height: hp('100%') }}
          >
            <ScrollView
              horizontal
              pagingEnabled // animates ScrollView to nearest multiple of it's own width
              showsHorizontalScrollIndicator={false}
              // the onScroll prop will pass a nativeEvent object to a function
              onScroll={Animated.event( // Animated.event returns a function that takes an array where the first element...
                [{ nativeEvent: { contentOffset: { x: this.scrollX } } }], // ... is an object that maps any nativeEvent prop to a variable
              )} // in this case we are mapping the value of nativeEvent.contentOffset.x to this.scrollX
              scrollEventThrottle={16}
              contentContainerStyle={{ flexDirection: 'row' }}
            >

              <View style={{
                width: wp('90%'),
                marginLeft: wp('5%'),
                height: hp('5%') * popularSearch.length - 2,
                borderRadius: 10,
                backgroundColor: 'rgb(239, 239, 244)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                elevation: 10,
                shadowRadius: 2,
              }}
              >
                <View style={{ borderBottomWidth: 0.3, borderColor: 'rgb(142, 142, 147)' }}>
                  <Text
                    style={styles.explainText} // we will use i for the key because no two (or more) elements in an array will have the same index
                  >
                    인기 검색어
                  </Text>
                </View>
                {
                  popularSearch.map((result) => {
                    i += 1;
                    return (
                      <View
                        key={i}
                        style={{
                          borderLeftWidth: 0.3, borderRightWidth: 0.3, borderBottomWidth: 0.3, borderColor: 'rgb(142, 142, 147)', backgroundColor: 'white', height: hp('5%'), width: wp('90%'),
                        }}
                      >
                        <Text style={{ margin: 10 }}>
                          {' '}
                          {i}
                          {' '}
                          {result.keyword}
                          {' '}
                        </Text>
                      </View>
                    );
                  })
                }
                <View style={styles.bottom}>
                  <Text style={styles.explainText}>
                    저장기능 끄기
                  </Text>


                </View>
              </View>

              <View style={{
                width: wp('90%'),
                marginLeft: wp('10%'),
                borderRadius: 10,
                backgroundColor: 'rgb(239, 239, 244)',
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
              }}
              >
                <View style={{ borderBottomWidth: 0.3, borderColor: 'rgb(142, 142, 147)' }}>
                  <Text
                    style={styles.explainText} // we will use i for the key because no two (or more) elements in an array will have the same index
                  >
                    최근 검색어
                  </Text>
                </View>
                <View style={{
                  borderBottomWidth: 0.3, borderColor: 'rgb(142, 142, 147)', backgroundColor: 'white', height: hp('5%'), width: wp('90%'),
                }}
                >
                  <Text style={{ margin: 10 }}>
                      이름
                  </Text>
                </View>
                <View>
                  <Text style={styles.explainText}>
                  업데이트
                  </Text>
                </View>
              </View>

              <View style={{
                width: wp('90%'),
                marginLeft: wp('10%'),
                marginRight: hp('3%'),
                borderRadius: 10,
                backgroundColor: 'rgb(239, 239, 244)',
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
              }}
              >
                <View style={{ borderBottomWidth: 0.3, borderColor: 'rgb(142, 142, 147)' }}>
                  <Text
                    style={styles.explainText} // we will use i for the key because no two (or more) elements in an array will have the same index
                  >
                    최근 본 상품
                  </Text>
                </View>
                <View style={{
                  borderBottomWidth: 0.3, borderColor: 'rgb(142, 142, 147)', backgroundColor: 'white', height: hp('5%'), width: wp('90%'),
                }}
                >
                  <Text style={{ margin: 10 }}> 이름 </Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text style={styles.explainText}>
                    저장기능 끄기
                  </Text>
                  <Text style={styles.explainText}>
                    전체삭제
                  </Text>
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
