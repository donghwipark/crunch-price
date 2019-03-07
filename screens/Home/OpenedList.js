import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  WebView,
} from 'react-native';

/*
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
*/
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { handleNumberToPrice } from '../../helper/helperFuncs';

// import List from '../../components/Main/sorter/List';
// import Grid from '../../components/Main/sorter/Grid';
// import OneBigStub from '../../components/Main/sorter/oneBigStub';

export default class OpenedList extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <Text>최근 본 상품</Text>
    ),
    headerTitleStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const recentlyOpened = navigation.getParam('recentlyOpened');
    this.setState({
      recentlyOpened,
      isLoaded: true,
    });
  }

  render() {
    const { recentlyOpened, isLoaded } = this.state;
    // const grid = <Grid recentlyOpened={recentlyOpened} />;
    // const list = <List recentlyOpened={recentlyOpened} />;
    // const oneBigStub = <OneBigStub recentlyOpened={recentlyOpened} />;
    if (!isLoaded) {
      return (
        <Text>loading</Text>
      );
    }
    return (
      <View style={styles.primeContainer}>
        <View style={{ marginBottom: hp('5%') }} />
        <FlatList
          data={recentlyOpened}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={{ width: '50%', marginLeft: 20 }}>
                <Text style={{ fontSize: 15, marginTop: 15 }} numberOfLines={2}>{item.goodsNm}</Text>
                <Text />
                <Text style={{ color: 'rgb(142, 142, 147)' }}>{`${handleNumberToPrice(Number(item.goodsUnitPrice1))}원`}</Text>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItem: 'flex-end' }}>
                  <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                    <Text style={{ fontSize: 20, color: 'rgb(0, 122, 255)' }}>삭제</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: '40%', alignItem: 'flex-end', paddingRight: 10, marginTop: 15, marginRight: 10 }}>
                <Image source={{ uri: item.mainImageUrl, width: 120, height: 100 }} style={{ alignSelf: 'flex-end' }} />
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                  <Text style={{ fontSize: 20, marginTop: 10, color: 'rgb(0, 122, 255)' }}>장바구니 담기</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          numColumns={1}
          keyExtractor={(item) => { return item.goodsNm; }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(239, 239, 244)',
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: hp('5%'),
    paddingBottom: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgb(142, 142, 147)',
  },
});
