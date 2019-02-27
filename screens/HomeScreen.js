import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


import MainRecommended from '../components/Main/MainRecommended';
import MainRecentlyOpened from '../components/Main/MainRecentlyOpened';
import MainBannerLinks from '../components/Main/MainBannerLinks';

// 현재 3번째 컴포넌트(배너)는 두번째(열어본 상품에)서 같이 렌더되고 있음. 차후 data 받아서 수정 예정 배너 dynamic하게 수정할 예정

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerRight: (
      <Icon
        name={
          Platform.OS === 'ios'
            ? 'ios-cart'
            : 'md-cart'
        }
        size={26}
        style={{ marginBottom: hp(0), marginRight: wp(5) }}
      />
    ),
    headerLeft: (
      <Icon
        name={
          Platform.OS === 'ios'
            ? 'arrowleft'
            : 'arrowleft'
        }
        size={26}
        style={{ marginBottom: hp(0), marginLeft: wp(5) }}
      />
    ),
    headerTitle: (
      <Image
        style={{ marginLeft: wp('8%') }}
        source={require('../assets/images/crunch-logo.png')}
      />
    ),
  };

  render() {
    return (
      <View style={styles.primeContainer}>
        <ScrollView vertical>
          <MainRecommended />
          <MainRecentlyOpened />
          <MainBannerLinks />
          <View>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
            <Text>footer</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  primeContainer: {
    backgroundColor: 'rgb(239, 239, 244)',
    flex: 1,
    flexDirection: 'column',
  },
  Container: {
    flex: 1,
  },
  Footer: {
    flex: 1,
  },
});
