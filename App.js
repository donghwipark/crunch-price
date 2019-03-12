import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        NanumSquareRoundB: require('./assets/fonts/NanumSquareRoundB.ttf'),
        NanumSquareRoundEB: require('./assets/fonts/NanumSquareRoundEB.ttf'),
        NanumSquareRoundL: require('./assets/fonts/NanumSquareRoundL.ttf'),
        NanumSquareRoundR: require('./assets/fonts/NanumSquareRoundR.ttf'),
        NotoSans_Black: require('./assets/fonts/NotoSans-Black.ttf'),
        NotoSans_Bold: require('./assets/fonts/NotoSans-Bold.ttf'),
        NotoSans_Light: require('./assets/fonts/NotoSans-Light.ttf'),
        NotoSans_Medium: require('./assets/fonts/NotoSans-Medium.ttf'),
        NotoSans_Regular: require('./assets/fonts/NotoSans-Regular.ttf'),
        NotoSans_Thin: require('./assets/fonts/NotoSans-Thin.ttf'),

      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
