import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { Entypo, Feather, FontAwesome } from 'react-native-vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SearchResult extends React.Component {
  state = {
    sortingType: 'focused',
    searchInfo: null,
  };

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

  onSearchResult = () => {

  }

  render() {
    const { navigation } = this.props;
    const itemInfo = navigation.getParam('result');
    console.log(itemInfo);
    const fakeData = [
      {
        name: 'Goldfish',
        image: 'http://tinyurl.com/n4vgcl5',
        description: '1500원',
      },
      {
        name: 'Pufferfish',
        image: 'http://tinyurl.com/kxd7cuu',
        description: '3000원',
      },
      {
        name: 'Tuna',
        image: 'http://tinyurl.com/zgs7z2s',
        description: '300만원',
      },
      {
        name: '몽고진간장',
        image: 'http://www.monggofood.co.kr/base/component/board/board_18/u_image/84/1321693598_61.jpg',
        description: '2500원',
      },
    ];
    const { sortingType } = this.state;
    const grid = (
      <View style={styles.gridPrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridContainer}>
              <Image source={{ uri: item[2], width: wp('40%'), height: hp('25%') }} style={styles.gridRecommendedImages} />
              <Text>{item[0]}</Text>
              <Text>{item[3]}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(_, i) => i}
        />
      </View>
    );
    const list = (
      <View style={styles.listPrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.listContainer}>
              <Image source={{ uri: item[2], width: wp('25%'), height: hp('15%') }} style={styles.listRecommendedImages} />
              <View>
                <Text>{item[0]}</Text>
                <Text>{item[3]}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
          key={(_, i) => i}
        />
      </View>
    );
    const oneBigStub = (
      <View style={styles.onePrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.oneContainer}>
              <Image source={{ uri: item[2], width: wp('65%'), height: hp('35%') }} style={styles.oneRecommendedImages} />
              <View>
                <Text>{item[0]}</Text>
                <Text>{item[3]}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={1}
          key={(_, i) => i}
        />
      </View>
    );
    return (
      <View style={styles.primeContainer}>
        <View style={styles.sortingIcons}>
          <Entypo
            name="list"
            size={26}
            onPress={this.onPressList}
          />
          <Entypo
            name="grid"
            size={26}
            onPress={this.onPressGrid}
          />
          <FontAwesome
            name="square-o"
            size={26}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('95%'),
  },
  gridPrimeContainer: {
    flex: 10,
    backgroundColor: 'rgb(222,222,222)',
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // marginLeft: 10,
    width: wp('50%'),
    margin: 5,
    height: hp('40%'),
    // marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  gridRecommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
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
    height: hp('18%'),
    marginTop: hp('1.5%'),
    borderRadius: 10,
    alignItems: 'center',
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
    flex: 1,
    backgroundColor: '#fff',
    width: wp('90%'),
    height: hp('55%'),
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  oneRecommendedImages: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
