import React from 'react';
import {
  WebView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class cartWebScreen extends React.Component {
  static navigationOptions = {
    title: '장바구니',
  };

  render() {
    return (
      <WebView
        source={{ uri: 'https://m.crunchprice.com/order/cart.php' }}
        style={{ height: '100%', width: '100%', marginTop: -hp('30%') }}

      />
    );
  }
}
