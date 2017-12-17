// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { Platform } from 'react-native';
// String
import { consts } from '../../../assets/strings/Constant';
// Views
import LoginConnector from './LoginConnector';
import SignupPage from '../../views/login/SignupPage';
import ConfirmEmailPage from '../../views/login/ConfirmEmailPage';
import ChangePasswordPage from '../../views/login/ChangePasswordPage';

// Config
export const LoginScreen = StackNavigator(
  {
    Login: { screen: LoginConnector },
    Signup: { screen: SignupPage },
    ConfirmEmail: { screen: ConfirmEmailPage },
    ChangePassword: { screen: ChangePasswordPage, path: 'config_email/:token' },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);

const LoginNavigation = () => {
  const prefix = Platform.select({
    ios: consts.urlPrefix,
    android: consts.urlPrefix + 'livle/',
  });

  return <LoginScreen uriPrefix={prefix} />;
};

export default LoginNavigation;
