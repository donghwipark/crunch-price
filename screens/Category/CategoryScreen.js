import React from 'react';
import {
  ScrollView, StyleSheet, Text, Platform, View, TouchableOpacity, Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Emoji from 'react-native-emoji';
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class CategoryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:
      Platform.OS === 'ios'
        ? (
          <Image
            style={{ width: '45%', height: '65%' }}
            source={require('../../assets/images/crunch-logo.png')}
          />
        )
        : (
          <Image
            style={{ width: '70%', height: '55%', resizeMode: 'contain', marginLeft: 25 }}
            source={require('../../assets/images/crunch-logo.png')}
          />
        ),
      headerLeft: (
        <Text />
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate('cartWebScreen')} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={{ width: wp('6.5%'), height: wp('8%'), marginRight: wp('3%') }}
            source={require('../../assets/images/trolley.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ),
    };
  };

  onSelectCategory = async (name, num) => {
    const { navigation } = this.props;
    navigation.navigate('CategoryOne', { cateCd: num });
    await axios
      .get(`http://api.crunchprice.com/category/get_category_counts.php?cateCd=${num}`)
      .then(response => response.data.data)
      .then((response) => {
        navigation.navigate('CategoryOne', { name, category: response });
      });
  }

  render() {
    return (
      <ScrollView>
        <ScrollView
          style={styles.list}
          horizontal
        >
          <Image
            source={require('../../components/Category/1.jpg')}
            style={styles.recommendImage}
          />
          <Image
            source={require('../../components/Category/2.jpg')}
            style={styles.recommendImage}
          />
        </ScrollView>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => { this.onSelectCategory('식품', '006'); }}
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
            onPress={() => { this.onSelectCategory('생활/건강', '004'); }}
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
            onPress={() => { this.onSelectCategory('출산/육아', '008'); }}
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
            onPress={() => { this.onSelectCategory('화장품/미용', '011'); }}
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
            onPress={() => { this.onSelectCategory('디지털/가전', '003'); }}
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
            onPress={() => { this.onSelectCategory('스포츠/레져', '005'); }}
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
            onPress={() => { this.onSelectCategory('여행/문화', '007'); }}
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
            onPress={() => { this.onSelectCategory('가구/인테리어', '002'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="house" style={styles.emoji} />
                <Text style={styles.text}>가구/인테리어</Text>
              </View>
              <View>
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
            onPress={() => { this.onSelectCategory('패션잡화', '010'); }}
          >
            <View style={styles.category}>
              <View style={styles.categoryList}>
                <Emoji name="handbag" style={styles.emoji} />
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
    height: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgb(209, 209, 214)',
    marginTop: 5,
  },
  categoryList: {
    flexDirection: 'row',
    position: 'absolute',
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
