import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
import { Entypo, Feather, SimpleLineIcons, FontAwesome } from 'react-native-vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class SearchResult extends React.Component {
  state = {
    sortingType: 'grid',
    searchInfo: null,
    search: '',
  };

  onPressList = () => {
    console.log('get into list');
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

  checkLengthOnGrid = (description) => {
    if (description.length > 38) {
      return (
        `${description.slice(0, 35)}...`
      );
    }
    return description;
  }

  render() {
    const { navigation, search } = this.props;
    const itemInfo = navigation.getParam('result');
    console.log(itemInfo);
    const { sortingType } = this.state;
    const grid = (
      <View style={styles.gridPrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.gridContainer}>
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
          initialNumToRender={10}
          keyExtractor={(_, i) => i.toString()}
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
          key={(item, h) => h.toString()}
        />
      </View>
    );
    const oneBigStub = (
      <View style={styles.onePrimeContainer}>
        <FlatList
          data={itemInfo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.oneContainer}>
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
          key={(item, index) => index.toString()}
        />
      </View>
    );
    return (
      <View style={styles.primeContainer}>
        <SearchBar
          platform={Platform.OS === 'ios' ? 'ios' : 'android'}
          placeholder="검색어 입력"
          onClear={this.search}
          onSubmitEditing={this.updateSearch}
          onChangeText={val => this.setState({ search: val })}
          value={search}
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
            onPress={this.onPressGrid.bind(this)}
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
