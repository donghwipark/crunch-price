import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';

export default class StartScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Image
          style={styles.norasPhoto}
          source={require('../assets/images/noras.jpg')}
        />
        <Text style={styles.title}> 더-싸지는 쇼핑 </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => { navigation.navigate('Main'); }}
        >
          <View style={styles.borders}>
            <Text style={styles.startTitle}> 시작하기 </Text>
          </View>
        </TouchableHighlight>
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
    marginTop: '15%',
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
    width: 200,
    height: 200,
    marginTop: '60%',
    marginLeft: '20%',
  },
  button: {
    marginTop: '10%',
    marginBottom: '15%',
    marginLeft: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    height: '8%',
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
    marginTop: '35%',
    fontSize: 18,
    marginBottom: 50,
  },
});
