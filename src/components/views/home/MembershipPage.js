// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Views
import StackPage from '../partials/StackPage';
import _SettingCard from '../partials/_SettingCard';
import _SquareButton from '../partials/_SquareButton';
// Network
import { restoreSubscribe, cancelSubscribe } from '../../../network';
// Actions
import {
  AppAction,
  ModalAction,
  NavbarAction,
} from '../../../reducers/Actions';
// Functions
import { getTime, getDday, status } from '../../../assets/functions';
// Strings
import { membership_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { noticeStyle } from '../../../assets/stylesheets/local/settingPageStyle';
import { color_string } from '../../../assets/stylesheets/global/Color';

class MembershipPage extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    title: PropTypes.string,
    body: PropTypes.array,
  };

  updateButton(props) {
    const { auth, navigation, dispatch } = props;

    switch (auth.status) {
      case status.BASIC:
      case status.FREE_TRIAL:
      case status.SUSPENDED:
        this.setState({
          button: {
            text: membership_string.terminateMembership,
            onPress: () =>
              navigation.dispatch({
                type: ModalAction.SHOW_MODAL,
                data: {
                  type: 'select',
                  text: membership_string.reallyTerminate,
                  buttonText: membership_string.terminate,
                  onPress: () => cancelSubscribe(dispatch),
                },
              }),
          },
        });
        break;
      case status.WILL_TERMINATE:
        this.setState({
          button: {
            text: membership_string.restoreMembership,
            onPress: () => restoreSubscribe(dispatch),
          },
        });
        break;
      case status.NEW:
      case status.UNSUBSCRIBING:
        this.setState({
          button: {
            text: membership_string.applyMembership,
            onPress: () => dispatch({ type: AppAction.SUBSCRIBE }),
          },
        });
        break;
    }
  }

  state = { button: null };

  componentWillMount() {
    this.updateButton(this.props);
  }

  componentWillReceiveProps(props) {
    this.updateButton(props);
  }

  render() {
    const { navigation, auth } = this.props;
    const { title } = navigation.state.params;

    const infoContents = auth.currentSubscription
      ? [
          {
            title: membership_string.plan,
            value: auth.currentSubscription
              ? auth.status === status.WILL_TERMINATE
                ? getDday(auth.freeTrial.createdAt) ===
                  getDday(auth.currentSubscription.paidAt)
                  ? status.FREE_TRIAL
                  : status.BASIC
                : auth.status
              : 'None',
          },
          {
            title: auth.nextSubscription
              ? membership_string.renewal
              : membership_string.endDate,
            value: getTime(
              auth.nextSubscription
                ? auth.nextSubscription.from
                : auth.currentSubscription.to
            ).timestamp.format('YYYY.MM.DD'),
          },
          {
            title: membership_string.reservationCount,
            value: 2 - auth.currentSubscription.used,
          },
        ]
      : [
          {
            title: membership_string.plan,
            value: auth.currentSubscription
              ? auth.status === status.FREE_TRIAL
                ? status.FREE_TRIAL
                : status.BASIC
              : 'None',
          },
        ];

    return (
      <StackPage
        title={title}
        navigation={navigation}
        disablePadding
        hideNavbar>
        <_SettingCard
          type="string"
          title={membership_string.membershipInfo}
          contents={infoContents}
        />
        {auth.currentSubscription && (
          <_SettingCard
            type="string"
            title={membership_string.payment}
            contents={[
              {
                title: membership_string.paymentInfo,
                value: auth.cardName,
              },
              {
                title: '',
                value: `**** **** **** ${auth.lastFourDigits}`,
              },
            ]}
          />
        )}
        <View style={container.textContainer}>
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text={this.state.button.text}
            onPress={this.state.button.onPress}
          />
        </View>
      </StackPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.data,
  };
};

export default connect(mapStateToProps)(MembershipPage);
