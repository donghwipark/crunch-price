import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  WebView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class StartScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state ={
      webViewUrl: 'http://m.crunchprice.com/member/login.php',
      cookies: {},
      isLogIn: false,
  }

  onNavigationStateChange = (webViewState: { url: string }) => {
    const { url } = webViewState;
    console.log(url)
    // when WebView.onMessage called, there is not-http(s) url
    if (url.includes('http')) {
      this.setState({ webViewUrl: url })
    }
  }

  _checkNeededCookies = () => {
    const { cookies, webViewUrl } = this.state;
    const { navigation } = this.props;

    if (webViewUrl === 'http://m.crunchprice.com/' || webViewUrl === 'http://m.crunchprice.com/main/index.php') {
      console.log(cookies)
      navigation.navigate('Main')
    }
  }

  _onMessage = (event) => {
    const { data } = event.nativeEvent;
    const cookies = data.split(';'); // `csrftoken=...; rur=...; mid=...; somethingelse=...`
  
    cookies.forEach((cookie) => {
      const c = cookie.trim().split('=');
  
      const newCookies = this.state.cookies;
      newCookies[c[0]] = c[1];
  
      this.setState({ cookies: newCookies });
    });
  
    this._checkNeededCookies();
  }

  render() {
    const { webViewUrl } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { navigation.navigate('Main'); }}
        >
          <View style={styles.borders}>
            <Text style={styles.startTitle}> go To Main </Text>
          </View>
        </TouchableOpacity>
        <WebView
          source={{ uri: webViewUrl }}
          onNavigationStateChange={this.onNavigationStateChange}
          onMessage={this._onMessage}
          injectedJavaScript={'setTimeout(() => window.postMessage(document.cookie), 0)'}
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
  title: {
    flex: 1,
    marginTop: hp('9%'),
    padding: '5%',
    fontSize: 45,
    lineHeight: 55,
    color: 'white',
  },
  startBotton: {
    flex: 1,
    fontSize: 30,
  },
  norasPhoto: {
    position: 'absolute',
    width: wp(40),
    height: hp(40),
    marginTop: hp('30%'),
    marginLeft: wp('30%'),
  },
  button: {
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    marginLeft: wp('10%'),
    backgroundColor: 'white',
    borderRadius: 20,
    width: wp('80%'),
    height: hp('8%'),
  },
  borders: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
  },
  startTitle: {
    textAlign: 'center',
    color: 'rgb(0, 122, 255)',
    lineHeight: 51,
    marginTop: hp('0%'),
    fontSize: 18,
    marginBottom: 50,
  },
});