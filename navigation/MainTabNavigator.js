import React from 'react';
import { Image, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import SearchResult from '../screens/SearchScreen/SearchResult';
import MyPageScreen from '../screens/MyShopping/MyPageScreen';
import OpenedListScreen from '../screens/Home/OpenedList';
import MainRecentlyOpened from '../components/Main/MainRecentlyOpened';
import ProductDetails from '../screens/Home/productDetails';
import CategoryScreenOne from '../screens/Category/CategoryScreenOne';
import CategoryScreenTwo from '../screens/Category/CategoryScreenTwo';
import CategoryScreenThree from '../screens/Category/CategoryScreenThree';
import CategoryScreenFour from '../screens/Category/CategoryScreenFour';
import PokeListScreen from '../screens/MyShopping/PokeListScreen';
import WebViewScreen from '../screens/WebViewScreen';
import MyShoppingWebViewScreen from '../screens/MyShopping/MyShoppingWebViewScreen';
import cartWebScreen from '../screens/cartWebScreen';

const resetStack = (navigation, routes) => {
  if (routes.length > 1) {
    const { routeName } = routes[0];
    navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    }));
  }
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  OpenedList: OpenedListScreen,
  MainRecentlyOpened,
  ProductDetails,
  cartWebScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: '홈',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/HomeActive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(93, 190, 143)', fontSize: 10 }}>홈</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25 }}>
          <Image source={require('../assets/images/BottomTabIcons/HomeInactive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>홈</Text>
        </View>
      )
  ),
};

const CategoryStack = createStackNavigator({
  Category: CategoryScreen,
  CategoryOne: CategoryScreenOne,
  CategoryTwo: CategoryScreenTwo,
  CategoryThree: CategoryScreenThree,
  CategoryFour: CategoryScreenFour,
  WebView: WebViewScreen,
  cartWebScreen,
});

CategoryStack.navigationOptions = {
  tabBarLabel: '카테고리',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/CategoryActive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(93, 190, 143)', fontSize: 10 }}>카테고리</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/CategoryInactive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>카테고리</Text>
        </View>
      )
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Result: SearchResult,
  WebView: WebViewScreen,
  cartWebScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: '검색',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/SearchActive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(93, 190, 143)', fontSize: 10 }}>검색</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/SearchInactive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>검색</Text>
        </View>
      )
  ),
};


const MyPageScreenStack = createStackNavigator({
  MyPage: MyPageScreen,
  PokeList: PokeListScreen,
  WebView: MyShoppingWebViewScreen,
  cartWebScreen,
});

MyPageScreenStack.navigationOptions = {
  tabBarLabel: '마이쇼핑',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/MyActive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'left', color: 'rgb(93, 190, 143)', fontSize: 10 }}>마이쇼핑</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/MyInactive.png')} style={{ width: wp('7%'), height: hp('4%') }} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>마이쇼핑</Text>
        </View>
      )
  ),
  tabBarOnPress: ({ navigation, defaultHandler }) => {
    navigation.popToTop();
    defaultHandler();
  },
};


export default createBottomTabNavigator({
  HomeStack,
  CategoryStack,
  SearchStack,
  MyPageScreenStack,
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'rgb(93, 190, 143)',
    style: {
      backgroundColor: 'rgba(248, 248, 248, 0.82)',
      height: 87,
    },
  },
});
