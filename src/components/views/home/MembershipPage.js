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
import { cancelSubscribe } from '../../../network';
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

  function isSubscribe() {
    const { valid_by, cancelled_at } = body;
    if (valid_by && (!cancelled_at || isFuture(cancelled_at))) return true;
    return false;
  }

  function getPlan() {
    const { free_trial_started_at, valid_by } = body;
    if (getDday(valid_by) - getDday(free_trial_started_at) === 8)
      return 'FREE TRIAL';
    else return 'BASIC';
  }

  return (
    <StackPage title={title} navigation={navigation}>
      <ScrollView style={styles.blackBackground}>
        <_SettingCard
          type="string"
          title={membership_string.membershipInfo}
          contents={[
            {
              title: membership_string.plan,
              value: body.valid_by ? getPlan() : '등록 안함',
            },
            {
              title: membership_string.renewal,
              value:
                getTime(body.valid_by).timestamp.format('YYYY년 MM월 DD일') ||
                '',
            },
          ]}
        />
        {isSubscribe() && (
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
          {isSubscribe() ? (
            <_SquareButton
              backgroundColor={color_string.green_dark_dark}
              text="멤버십 해지하기"
              onPress={() =>
                this.props.dispatch({
                  type: ModalAction.SHOW_MODAL,
                  data: {
                    type: 'select',
                    text: '정말 멤버십을 해지하시겠어요?',
                    buttonText: '해지하기',
                    onPress: () => cancelSubscribe(navigation.dispatch),
                  },
                })
              }
            />
          ) : (
            <_SquareButton
              backgroundColor={color_string.green_dark_dark}
              text="멤버십 신청하기"
              onPress={() => navigation.dispatch({ type: AppAction.SUBSCRIBE })}
            />
          )}
        </View>
      </ScrollView>
    </StackPage>
  );
};

MembershipPage.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.string,
  body: PropTypes.array,
};

export default MembershipPage;
