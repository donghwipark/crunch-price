import React from 'react';
import {
  ScrollView, StyleSheet, Text, Platform, View, TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Emoji from 'react-native-emoji';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class CategoryScreen extends React.Component {
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
      <ScrollView>
        <ScrollView
          style={styles.list}
          horizontal
        >
          <Image
            source={require('../components/Category/1.jpg')}
            style={styles.recommendImage}
          />
          <Image
            source={require('../components/Category/2.jpg')}
            style={styles.recommendImage}
          />
        </ScrollView>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => { console.log('식품'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="hamburger" style={styles.emoji} />
                <Text style={styles.text}>식품</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('생활/건강'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="bath" style={styles.emoji} />
                <Text style={styles.text}>생활/건강</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('출산/육아'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="baby" style={styles.emoji} />
                <Text style={styles.text}>출산/육아</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('화장품/미용'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="lipstick" style={styles.emoji} />
                <Text style={styles.text}>화장품/미용</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('디지털/가전'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="bulb" style={styles.emoji} />
                <Text style={styles.text}>디지털/가전</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('스포츠/레저'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="basketball" style={styles.emoji} />
                <Text style={styles.text}>스포츠/레저</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('여행/문화'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="airplane" style={styles.emoji} />
                <Text style={styles.text}>여행/문화</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('가구/인테리어'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="house" style={styles.emoji} />
                <Text style={styles.text}>가구/인테리어</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { console.log('패션잡화'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="womans_clothes" style={styles.emoji} />
                <Text style={styles.text}>패션잡화</Text>
              </View>
              <View style={styles.categoryList}>
                <Icon
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-arrow-forward'
                      : 'md-arrow-forward'
                  }
                  size={26}
                  style={styles.arrow}
                  color="rgb(209, 209, 214)"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  recommendImage: {
    marginTop: hp('3%'),
    marginLeft: hp('3%'),
    width: wp('85%'),
    height: hp('25%'),
    borderRadius: 10,
  },
  main: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    height: hp('30%'),
  },
  category: {
    width: wp('90%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgb(209, 209, 214)',
    marginTop: 10,
  },
  categoryList: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  arrow: {
    fontSize: 15,
  },
});
