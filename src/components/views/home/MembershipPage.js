// Libraries
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Views
import StackPage from '../partials/StackPage';
import _SettingCard from '../partials/_SettingCard';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { membership_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { noticeStyle } from '../../../assets/stylesheets/local/settingPageStyle';
import { color_string } from '../../../assets/stylesheets/global/Color';

const MembershipPage = ({ navigation }) => {
  const { title, body } = navigation.state.params;

  return (
    <StackPage title={title} navigation={navigation}>
      <ScrollView style={styles.blackBackground}>
        {Platform.OS === 'ios' && <View style={{ height: 20 }} />}
        <_SettingCard
          type="string"
          title={membership_string.membershipInfo}
          contents={[
            {
              title: membership_string.plan,
              value: 'UNLIMITED',
            },
            {
              title: membership_string.renewal,
              value: '2018.01.21',
            },
          ]}
        />
        <_SettingCard
          type="string"
          title={membership_string.payment}
          contents={[
            {
              title: membership_string.paymentInfo,
              value: '신한카드',
            },
            {
              title: '',
              value: '**** **** **** 1234',
            },
            {
              title: membership_string.name,
              value: '원지운',
            },
          ]}
        />
        <View style={container.textContainer}>
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text="카드 변경하기"
            onPress={() => {
              // TODO: 카드 변경하는 액션 추가
            }}
          />
          <_SquareButton
            backgroundColor={color_string.green_dark_dark}
            text="구독권 해지하기"
            onPress={() => {
              // TODO: 구독권 해지하기 액션 추가
            }}
          />
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
