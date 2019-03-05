import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import StartScreen from '../screens/StartScreen';
import SignUpScreen from '../screens/signUps/SignUpScreen';
import SignUpScreenTwo from '../screens/signUps/SignUpScreenTwo';
import MainTabNavigator from './MainTabNavigator';
// import SignInScreen from '../screens/SignInScreen';
import LoadingScreen from '../screens/LoadingScreen';
import agreementContent from '../screens/signUps/userAgreements/agreementContent';

const SignUpStack = createStackNavigator({
  StartScreen,
  SignUp: SignUpScreen,
  SignUpTwo: SignUpScreenTwo,
  content1: agreementContent,
});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));
