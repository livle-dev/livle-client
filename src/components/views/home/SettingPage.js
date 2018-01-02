// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// Views
import _SettingCard from '../partials/_SettingCard';
import _SquareButton from '../partials/_SquareButton';
// Network
import { logout, withdraw } from '../../../network';
// Action
import { ModalAction } from '../../../reducers/Actions';
// Strings
import {
  setting_string,
  session_string,
  help_support_string,
  privacy_string,
  terms_string,
} from '../../../assets/strings';
// Styles
import {
  styles,
  container,
  navbar,
} from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

class SettingPage extends Component {
  state = {
    alarm_go: false,
    alarm_update_list: false,
  };

  render() {
    const { navigation, dispatch, userInfo } = this.props;

    return (
      <ScrollView style={styles.blackBackground}>
        <View style={navbar.navbarArea} />
        <_SettingCard
          type="string"
          title={setting_string.loginInfo}
          contents={[
            {
              title: session_string.email,
              value: userInfo && userInfo.email,
            },
            {
              title: session_string.nickname,
              value: userInfo && userInfo.nickname,
            },
          ]}
        />
        <_SettingCard
          type="page"
          title={setting_string.membership}
          contents={[
            {
              title: setting_string.changeMembership,
              navigation: navigation,
              body: userInfo && userInfo,
            },
          ]}
        />
        <_SettingCard
          type="toggle"
          title={setting_string.pushAlarm}
          contents={[
            {
              title: setting_string.goAlarm,
              value: this.state.alarm_go,
              option: value => this.setState({ alarm_go: value }),
            },
            {
              title: setting_string.listUpdate,
              value: this.state.alarm_update_list,
              option: value => this.setState({ alarm_update_list: value }),
            },
          ]}
        />
        <_SettingCard
          type="blink"
          title={setting_string.contact}
          contents={[
            {
              title: setting_string.helpSupport,
              navigation: navigation,
              body: help_support_string,
            },
          ]}
        />
        <_SettingCard
          type="blink"
          title={setting_string.policies}
          contents={[
            {
              title: setting_string.privacy,
              navigation: navigation,
              body: privacy_string,
            },
            {
              title: setting_string.terms,
              navigation: navigation,
              body: terms_string,
            },
            /*
            {
              title: setting_string.license,
              navigation: navigation,
              body: license_string,
            },
            */
          ]}
        />
        <View style={container.textContainer}>
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text={setting_string.logout}
            onPress={() => {
              dispatch({
                type: ModalAction.SHOW_MODAL,
                data: {
                  type: 'select',
                  text: setting_string.wantToLogout,
                  buttonText: setting_string.logout,
                  onPress: () => logout(navigation.dispatch),
                },
              });
            }}
          />
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text={setting_string.withdraw}
            onPress={() => {
              dispatch({
                type: ModalAction.SHOW_MODAL,
                data: {
                  type: 'password',
                  text: setting_string.wantToWithdraw,
                  buttonText: setting_string.withdraw,
                  onPress: value =>
                    withdraw(userInfo.email, value)(navigation.dispatch),
                },
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.auth.data,
  };
};
export default connect(mapStateToProps)(SettingPage);
