// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
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
    ChangePassword: { screen: ChangePasswordPage },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);
