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
import { restoreMembership, cancelSubscribe } from '../../../network';
// Actions
import { AppAction, ModalAction } from '../../../reducers/Actions';
// Functions
import { isFuture, getTime, getDday } from '../../../assets/functions';
// Strings
import { membership_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { noticeStyle } from '../../../assets/stylesheets/local/settingPageStyle';
import { color_string } from '../../../assets/stylesheets/global/Color';

const MembershipPage = ({ navigation }) => {
  const { title, body } = navigation.state.params;
  const isSubscribing = body.valid_by && !body.cancelled_at;

  function getPlan() {
    const checkFreeTrial =
      getDday(body.valid_by) - getDday(body.free_trial_started_at) === 7;
    return checkFreeTrial
      ? membership_string.freeTrial
      : membership_string.basic;
  }

  return (
    <StackPage title={title} navigation={navigation} disablePadding hideNavbar>
      <_SettingCard
        type="string"
        title={membership_string.membershipInfo}
        contents={[
          {
            title: membership_string.plan,
            value: body.valid_by ? getPlan() : membership_string.unsubscribe,
          },
          {
            title: !body.cancelled_at
              ? membership_string.renewal
              : membership_string.endDate,
            value:
              body.valid_by &&
              getTime(body.valid_by).timestamp.format('YYYY.MM.DD'),
          },
        ]}
      />
      {isSubscribing && (
        <_SettingCard
          type="string"
          title={membership_string.payment}
          contents={[
            {
              title: membership_string.paymentInfo,
              value: body.card_name,
            },
            {
              title: '',
              value: `**** **** **** ${body.last_four_digits}`,
            },
          ]}
        />
      )}
      <View style={container.textContainer}>
        {isSubscribing ? (
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text={membership_string.terminateMembership}
            onPress={() =>
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
              })
            }
          />
        ) : (
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text={
              body.valid_by
                ? membership_string.restoreMembership
                : membership_string.applyMembership
            }
            onPress={() => {
              if (isFuture(body.valid_by))
                restoreMembership(navigation.dispatch);
              else navigation.dispatch({ type: AppAction.SUBSCRIBE });
            }}
          />
        )}
      </View>
    </StackPage>
  );
};

MembershipPage.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.string,
  body: PropTypes.array,
};

export default MembershipPage;
