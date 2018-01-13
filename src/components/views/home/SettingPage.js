// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// Views
import _SettingCard from '../partials/_SettingCard';
import _SquareButton from '../partials/_SquareButton';
// Network
import {
  logout,
  withdraw,
  getNotifSetting,
  setNotifSetting,
} from '../../../network';
// Action
import { ModalAction } from '../../../reducers/Actions';
// Functions
import { getTime, status } from '../../../assets/functions';
// Strings
import {
  setting_string,
  session_string,
  help_support_string,
  privacy_string,
  terms_string,
  consts,
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
    alarm_go: true,
    alarm_update_list: true,
    membership_status: null,
  };

  updateSubscriptionInfo(userInfo) {
    let dueDate;
    switch (userInfo.status) {
      case status.WILL_TERMINATE:
        dueDate = `${getTime(userInfo.currentSubscription.to).timestamp.format(
          'MM월 DD일'
        )}까지 유효`;
        break;
      case status.BASIC:
      case status.FREE_TRIAL:
      case status.SUSPENDED:
        dueDate = `${getTime(userInfo.nextSubscription.from).timestamp.format(
          'MM월 DD일'
        )}에 갱신`;
        break;
      default:
        return;
    }
    const remainReservation = 2 - userInfo.currentSubscription.used;
    this.setState({
      membership_status: `${dueDate} / 남은횟수 ${remainReservation} 회`,
    });
  }

  componentDidMount() {
    getNotifSetting().then(item => {
      this.setState({
        alarm_go: item.alarm_go,
        alarm_update_list: item.alarm_update_list,
      });
    });
  }

  componentWillUpdate(props, state) {
    const item = {
      alarm_go: state.alarm_go,
      alarm_update_list: state.alarm_update_list,
    };
    setNotifSetting(item);
  }

  componentWillReceiveProps(props) {
    const { userInfo } = props;
    if (
      userInfo &&
      userInfo.status !== status.NEW &&
      userInfo.status !== status.UNSUBSCRIBE
    )
      this.updateSubscriptionInfo(userInfo);
    else if (!this.state.membership_status)
      this.setState({ membership_status: null });
  }

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
          page="Membership"
          contents={[
            {
              title: setting_string.changeMembership,
              navigation: navigation,
              subTitle: this.state.membership_status,
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
          type="page"
          title={setting_string.serviceCenter}
          page="Notice"
          contents={[
            {
              title: setting_string.helpSupport,
              navigation: navigation,
              body: help_support_string,
            },
          ]}
        />
        <_SettingCard
          type="page"
          title={setting_string.policies}
          page="Notice"
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
