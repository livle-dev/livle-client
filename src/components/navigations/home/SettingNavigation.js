// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
// Views
import SettingPage from '../../views/home/SettingPage';
import SettingNoticePage from '../../views/home/SettingNoticePage';
import MembershipPage from '../../views/home/MembershipPage';

// Config
export const SettingScreen = StackNavigator(
  {
    Setting: { screen: SettingPage },
    Notice: { screen: SettingNoticePage },
    Membership: { screen: MembershipPage },
  },
  {
    initialRouteName: 'Setting',
    headerMode: 'none',
  }
);
