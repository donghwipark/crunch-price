import React from 'react';
import {
  ScrollView, StyleSheet, Text, Platform, View, TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Emoji from 'react-native-emoji';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../constants/Colors';

export default class CategoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Category',
    headerRight: (
      <Icon
        name={
          Platform.OS === 'ios'
            ? 'ios-cart'
            : 'md-cart'
        }
        size={26}
        style={{ marginBottom: -3 }}
        color={Colors.tabIconSelected}
      />
    ),
  };

  render() {
    return (
      <ScrollView>
        <ScrollView style={styles.list}>
          <Text>
            list
          </Text>
        </ScrollView>
        <TouchableHighlight
          onPress={console.log('식품')}
          style={styles.category}
        >
          <View>
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
                color="grey"
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.categoryList}>
          <Emoji name="bath" style={styles.emoji} />
          <Text style={styles.text}>생활/건강</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="baby" style={styles.emoji} />
          <Text style={styles.text}>출산/육아</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="lipstick" style={styles.emoji} />
          <Text style={styles.text}>화장품/미용</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="bulb" style={styles.emoji} />
          <Text style={styles.text}>디지털/가전</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="basketball" style={styles.emoji} />
          <Text style={styles.text}>스포츠/레저</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="airplane" style={styles.emoji} />
          <Text style={styles.text}>여행/문화</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="house" style={styles.emoji} />
          <Text style={styles.text}>가구/인테리어</Text>
        </View>
        <View style={styles.categoryList}>
          <Emoji name="womans_clothes" style={styles.emoji} />
          <Text style={styles.text}>패션잡화</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'yellow',
    height: hp('30%'),
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryList: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'yellow',
    fontSize: 20,
  },
  emoji: {
    fontSize: 15,
    padding: 5,
  },
  text: {
    fontSize: 15,
    padding: 5,
  },
  arrow: {
    fontSize: 15,
    padding: 5,
  },
});
