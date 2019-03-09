import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  WebView,
  Alert,
  Platform,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Axios from 'axios';

export default class ProductDetails extends React.Component {
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
      goodData: {},
      isLoaded: false,
      cookies: {},
      webViewUrl: 'http://m.crunchprice.com/',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const goodData = navigation.getParam('item')
    await this.setState({
      goodData,
      isLoaded: true,
      webViewUrl: `http://m.crunchprice.com/goods/goods_view.php?goodsNo=${goodData.goodsNo}`,
    });
  }

onNavigationStateChange = (webViewState: { url: string }) => {
  const { url } = webViewState;

  // when WebView.onMessage called, there is not-http(s) url
  if (url.includes('http')) {
    this.setState({ webViewUrl: url })
  }
  this._checkNeededCookies()
}

_checkNeededCookies = () => {
  const { cookies, webViewUrl } = this.state;
  const { navigation } = this.props;
  console.log(webViewUrl)
  // 로그아웃일 경우 뒤로 돌림
  if (webViewUrl === 'http://m.crunchprice.com/member/logout.php') {
    console.log(cookies)
    navigation.navigate('StartScreen')
  }
}

_onMessage = (event) => {
  const { data } = event.nativeEvent;
  console.log(data)
  const cookies = data.split(';'); // `csrftoken=...; rur=...; mid=...; somethingelse=...`

  cookies.forEach((cookie) => {
    const c = cookie.trim().split('=');

    const newCookies = this.state.cookies;
    newCookies[c[0]] = c[1];

    this.setState({ cookies: newCookies });
  });

  this._checkNeededCookies();
}

testCookieRequest = async () => {
  const banner = await Axios.get('http://m.crunchprice.com/mypage/index.php');
  console.log(JSON.stringify(banner))
} 

render() {
  const { goodData, isLoaded, webViewUrl } = this.state;
  if (!isLoaded) {
    return (
      <Text>loading</Text>
    );
  }
  return (
    <View style={styles.primeContainer}>
      <View>
        <TouchableOpacity onPress={this.testCookieRequest}><Text>aaaaaaaa</Text></TouchableOpacity>
      </View>
      <WebView
        source={{ uri: webViewUrl }}
        onNavigationStateChange={this.onNavigationStateChange}
        onMessage={Platform.OS === 'android' ? this._onMessage : false}
        injectedJavaScript={'setTimeout(() => window.postMessage(document.cookie), 0)'}
        style={{ flex: 1 }}
      />
    </View>
  );
}
}
const styles = StyleSheet.create({
  primeContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  sortingIcons: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: wp('95%'),
    backgroundColor: 'red',
  },
});


// 로그인 안했을 시
// {"data":"<!doctype html>\n<html lang=\"ko\">\n<head>\n    <!--<title>결과</title>-->\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <script type=\"text/javascript\">\n    location.replace('http://m.crunchprice.com/member/login.php');\n    </script>\n</head>\n<body>\n</body>\n</html>","status":200,"headers":{"cache-control":"public, max-age=0","content-type":"text/html; charset=UTF-8","connection":"close","content-length":"427","server":"Apache","date":"Thu, 07 Mar 2019 03:04:24 GMT"},"config":{"transformRequest":{},"transformResponse":{},"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"headers":{"Accept":"application/json, text/plain, */*"},"method":"get","url":"http://m.crunchprice.com/mypage/index.php"},"request":{"UNSENT":0,"OPENED":1,"HEADERS_RECEIVED":2,"LOADING":3,"DONE":4,"readyState":4,"status":200,"timeout":0,"withCredentials":true,"upload":{},"_aborted":false,"_hasError":false,"_method":"GET","_response":"<!doctype html>\n<html lang=\"ko\">\n<head>\n    <!--<title>결과</title>-->\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <script type=\"text/javascript\">\n    location.replace('http://m.crunchprice.com/member/login.php');\n    </script>\n</head>\n<body>\n</body>\n</html>","_url":"http://m.crunchprice.com/mypage/index.php","_timedOut":false,"_trackingName":"unknown","_incrementalEvents":false,"responseHeaders":{"Cache-Control":"public, max-age=0","Content-Type":"text/html; charset=UTF-8","Connection":"close","Content-Length":"427","Server":"Apache","Date":"Thu, 07 Mar 2019 03:04:24 GMT"},"_requestId":null,"_headers":{"accept":"application/json, text/plain, */*"},"_responseType":"","_sent":true,"_lowerCaseResponseHeaders":{"cache-control":"public, max-age=0","content-type":"text/html; charset=UTF-8","connection":"close","content-length":"427","server":"Apache","date":"Thu, 07 Mar 2019 03:04:24 GMT"},"_subscriptions":[],"responseURL":"http://m.crunchprice.com/mypage/index.php"}}

// 로그인 시 trol":"public, max-age=0","Content-Type":"text/html; charset=UTF-8","Date":"Thu, 07 Mar 2019 03:06:30 GMT","Server":"Apache","Set-Cookie":"aceAet=1551927991; expires=Sun, 17-Mar-2019 03:06:31 GMT; Max-Age=864000; path=/; domain=crunchprice.com","last-modified":"Asia/Seoul","X-UA-Compatible":"IE=edge","expires":"Mon, 26 Jul 1997 05:00:00 GMT","content_type":"text/html","p3p":"CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'","Connection":"close","Transfer-Encoding":"chunked"},"_requestId":null,"_headers":{"accept":"application/json, text/plain, */*"},"_responseType":"","_sent":true,"_lowerCaseResponseHeaders":{"cache-control":"public, max-age=0","content-type":"text/html; charset=UTF-8","date":"Thu, 07 Mar 2019 03:06:30 GMT","server":"Apache","set-cookie":"aceAet=1551927991; expires=Sun, 17-Mar-2019 03:06:31 GMT; Max-Age=864000; path=/; domain=crunchprice.com","last-modified":"Asia/Seoul","x-ua-compatible":"IE=edge","expires":"Mon, 26 Jul 1997 05:00:00 GMT","content_type":"text/html","p3p":"CP='ALL CURa ADMa DEVa TAIa OUR BUS IND PHY ONL UNI PUR FIN COM NAV INT DEM CNT STA POL HEA PRE LOC OTC'","connection":"close","transfer-encoding":"chunked"},"_subscriptions":[],"responseURL":"http://m.crunchprice.com/mypage/index.php"}}