import React from 'react';
import {
  StyleSheet,
  View,
  WebView,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class WebViewScreen extends React.Component {
  static navigationOptions = {
    headerTitle:
    Platform.OS === 'ios'
      ? (
        <Image
          style={{ width: '45%', height: '65%' }}
          source={require('../assets/images/crunch-logo.png')}
        />
      )
      : (
        <Image
          style={{ width: '70%', height: '55%', resizeMode: 'contain', marginLeft: 25 }}
          source={require('../assets/images/crunch-logo.png')}
        />
      ),
    headerLeft: (
      <Text />
    ),
    headerRight: (
      <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{ width: wp('6.5%'), height: wp('8%'), marginRight: wp('3%'), marginBottom: hp('1%') }}
          source={require('../assets/images/trolley.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    ),
  };

  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: `http://m.crunchprice.com/goods/goods_view.php?goodsNo=${navigation.getParam('goodsNo')}` }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(252, 192, 194)',
  },
});
