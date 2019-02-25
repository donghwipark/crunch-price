import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SearchScreen from '../screens/SearchScreen';
import MyPageScreen from '../screens/MyPageScreen';
import SignInScreen from '../screens/SignInScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const CategoryStack = createStackNavigator({
Category: CategoryScreen,
});

CategoryStack.navigationOptions = {
  tabBarLabel: 'Category',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
      ? `ios-menu`
      : 'md-menu'}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
      ? `ios-search`
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
      ? `ios-person`
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
