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
import { AppAction, ModalAction } from '../../../reducers/Actions';
// Functions
import { getTime, status } from '../../../assets/functions';
// Strings
import { membership_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { noticeStyle } from '../../../assets/stylesheets/local/settingPageStyle';
import { color_string } from '../../../assets/stylesheets/global/Color';

export default class MembershipPage extends Component {
  static propTypes = {
    navigation: PropTypes.any.isRequired,
    title: PropTypes.string,
    body: PropTypes.array,
  };

  setAction() {
    const { navigation } = this.props;
    const { body } = navigation.state.params;
    switch (body.status) {
      case status.BASIC:
      case status.FREE_TRIAL:
      case status.SUSPENDED:
        return {
          text: membership_string.terminateMembership,
          onPress: () =>
            navigation.dispatch({
              type: ModalAction.SHOW_MODAL,
              data: {
                type: 'select',
                text: membership_string.reallyTerminate,
                buttonText: membership_string.terminate,
                onPress: () =>
                  cancelSubscribe(navigation.dispatch).then(() =>
                    navigation.goBack()
                  ),
              },
            }),
        };
      case status.WILL_TERMINATE:
        return {
          text: membership_string.restoreMembership,
          onPress: () =>
            restoreSubscribe(navigation.dispatch).then(() =>
              navigation.goBack()
            ),
        };
      case status.NEW:
      case status.UNSUBSCRIBING:
        return {
          text: membership_string.applyMembership,
          onPress: () => navigation.dispatch({ type: AppAction.SUBSCRIBE }),
        };
    }
  }

  render() {
    const { navigation } = this.props;
    const { title, body } = navigation.state.params;
    const button = this.setAction();

    return (
      <StackPage
        title={title}
        navigation={navigation}
        disablePadding
        hideNavbar>
        <_SettingCard
          type="string"
          title={membership_string.membershipInfo}
          contents={[
            {
              title: membership_string.plan,
              value: body.currentSubscription ? body.status : 'None',
            },
            body.currentSubscription
              ? {
                  title: body.nextSubscription
                    ? membership_string.renewal
                    : membership_string.endDate,
                  value: getTime(
                    body.nextSubscription
                      ? body.nextSubscription.from
                      : body.currentSubscription.to
                  ).timestamp.format('YYYY.MM.DD'),
                }
              : {
                  title: '',
                  value: '',
                },
          ]}
        />
        {body.currentSubscription && (
          <_SettingCard
            type="string"
            title={membership_string.payment}
            contents={[
              {
                title: membership_string.paymentInfo,
                value: body.cardName,
              },
              {
                title: '',
                value: `**** **** **** ${body.lastFourDigits}`,
              },
            ]}
          />
        )}
        <View style={container.textContainer}>
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text={this.setAction().text}
            onPress={this.setAction().onPress}
          />
        </View>
      </StackPage>
    );
  }
}
