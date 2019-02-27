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
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { blue } from 'ansi-colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const photos = [
  {
    id: 1,
    name: '인기 검색어',
  },
  {
    id: 2,
    name: '최근 검색어',
  },
  {
    id: 3,
    name: '최근 본 상품',
  },
];

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    title: '검색',
    headerRight: (
      <Text>취소</Text>
    ),
  };

  scrollX = new Animated.Value(0)

  state = {
    search: '',
  };


  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const position = Animated.divide(this.scrollX, width);
    const { search } = this.state;
    return (
      <View style={styles.page}>
        <SearchBar
          platform={
            Platform.OS === 'ios'
              ? 'ios'
              : 'android'
          }
          placeholder="검색어 입력"
          onChangeText={this.updateSearch}
          value={search}
          style={{ position: 'relative' }}
        />
        <View style={{
          position: 'relative', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <View
            style={{ flexDirection: 'row', padding: 10 }}
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
                  key={i} // we will use i for the key because no two (or more) elements in an array will have the same index
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
            style={{ width, height: width, flexDirection: 'column' }}
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
            >
              {photos.map(source => ( // ... we will return a square Image with the corresponding object as the source
                <View style={{
                  width: wp('80%'),
                  height: hp('100%'),
                  borderRadius: 10,
                  backgroundColor: 'rgb(239, 239, 244)',
                  shadowColor: '#000',
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.6,
                  shadowRadius: 2,
                  marginLeft: wp('5%'),
                }}
                >
                  <View style={{ borderBottomWidth: 0.2, borderColor: 'rgb(142, 142, 147)' }}>
                    <Text
                      style={{
                        color: 'rgb(142, 142, 147)',
                        margin: 15,
                      }} // we will use i for the key because no two (or more) elements in an array will have the same index
                    >
                      {source.name}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'yellow',
  },
});
