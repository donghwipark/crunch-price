import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import SearchResult from '../screens/SearchScreen/SearchResult';
import MyPageScreen from '../screens/MyPageScreen';
import OpenedListScreen from '../screens/Home/OpenedList';
import MainRecentlyOpened from '../components/Main/MainRecentlyOpened';
import ProductDetails from '../screens/Home/productDetails';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
  OpenedList: OpenedListScreen,
  MainRecentlyOpened,
  ProductDetails,
});

HomeStack.navigationOptions = {
  tabBarLabel: '홈',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

const CategoryStack = createStackNavigator({
  Category: CategoryScreen,
});

CategoryStack.navigationOptions = {
  tabBarLabel: '카테고리',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-menu'
        : 'md-menu'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
  Result: SearchResult,
});

SearchStack.navigationOptions = {
  tabBarLabel: '검색',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-search'
        : 'md-search'}
    />
  ),
};


const MyPageScreenStack = createStackNavigator({
  MyPage: MyPageScreen,
});

MyPageScreenStack.navigationOptions = {
  tabBarLabel: 'MyPage',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-person'
        : 'md-person'}
    />
  ),
};


export default createBottomTabNavigator({
  HomeStack,
  CategoryStack,
  SearchStack,
  MyPageScreenStack,
});
