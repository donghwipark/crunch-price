import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import StartScreen from '../screens/StartScreen';
import MainTabNavigator from './MainTabNavigator';
// import SignInScreen from '../screens/SignInScreen';
import LoadingScreen from '../screens/LoadingScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Start: StartScreen,
  Main: MainTabNavigator,
}));
