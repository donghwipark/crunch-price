import React from 'react';
import { Image, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/Category/CategoryScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import SearchResult from '../screens/SearchScreen/SearchResult';
import MyPageScreen from '../screens/MyPageScreen';
import OpenedListScreen from '../screens/Home/OpenedList';
import MainRecentlyOpened from '../components/Main/MainRecentlyOpened';
import ProductDetails from '../screens/Home/productDetails';
import CategoryScreenOne from '../screens/Category/CategoryScreenOne';
import CategoryScreenTwo from '../screens/Category/CategoryScreenTwo';
import CategoryScreenThree from '../screens/Category/CategoryScreenThree';
import CategoryScreenFour from '../screens/Category/CategoryScreenFour';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  OpenedList: OpenedListScreen,
  MainRecentlyOpened,
  ProductDetails,
});

HomeStack.navigationOptions = {
  tabBarLabel: '홈',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/HomeActive.png')} />
          <Text style={{ textAlign: 'center', color: 'rgb(93, 190, 143)', fontSize: 10 }}>홈</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25 }}>
          <Image source={require('../assets/images/BottomTabIcons/HomeInactive.png')} />
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
});

CategoryStack.navigationOptions = {
  tabBarLabel: '카테고리',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/CategoryActive.png')} />
          <Text style={{ textAlign: 'center', color: 'rgb(93, 190, 143)', fontSize: 10 }}>카테고리</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/CategoryInactive.png')} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>카테고리</Text>
        </View>
      )
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Result: SearchResult,
});

SearchStack.navigationOptions = {
  tabBarLabel: '검색',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/SearchActive.png')} />
          <Text style={{ textAlign: 'center', color: 'rgb(93, 190, 143)', fontSize: 10 }}>검색</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/SearchInactive.png')} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>검색</Text>
        </View>
      )
  ),
};


const MyPageScreenStack = createStackNavigator({
  MyPage: MyPageScreen,
});

MyPageScreenStack.navigationOptions = {
  tabBarLabel: '마이쇼핑',
  tabBarIcon: ({ focused }) => (
    focused
      ? (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/MyActive.png')} />
          <Text style={{ textAlign: 'left', color: 'rgb(93, 190, 143)', fontSize: 10 }}>마이쇼핑</Text>
        </View>
      )
      : (
        <View style={{ marginBottom: 25, alignItems: 'center' }}>
          <Image source={require('../assets/images/BottomTabIcons/MyInactive.png')} />
          <Text style={{ textAlign: 'center', color: 'rgb(209, 209, 214)', fontSize: 10 }}>마이쇼핑</Text>
        </View>
      )
  ),
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
