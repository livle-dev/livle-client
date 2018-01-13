// Libraries
import React, { Component } from 'react';
import { Text, View, TextInput, findNodeHandle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Views
import StackPage from '../partials/StackPage';
import _SettingCard from '../partials/_SettingCard';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { membership_string } from '../../../assets/strings';
// Network
import { subscribe } from '../../../network';
// Functions
import { getTime } from '../../../assets/functions';
// Actions
import { ModalAction } from '../../../reducers/Actions';
// Styles
import {
  styles,
  navbar,
  container,
} from '../../../assets/stylesheets/global/Style';
import { settingStyle } from '../../../assets/stylesheets/local/settingPageStyle';
import { color, color_string } from '../../../assets/stylesheets/global/Color';

const Numbox = ({
  inputRef,
  placeholder,
  onTextChange,
  maxLength,
  ...option
}) => (
  <TextInput
    style={[
      settingStyle.numInputcontainer,
      styles.textNumInput,
      styles.textCenter,
    ]}
    ref={inputRef}
    keyboardType="numeric"
    autoCapitalize="none"
    autoCorrect={false}
    placeholder={placeholder}
    placeholderTextColor={color_string.green_light_clear}
    maxLength={maxLength}
    selectionColor={color_string.white}
    {...option}
  />
);

export default class SubscribePage extends Component {
  state = {
    cardNumber: ['', '', '', ''],
    password: '',
    birth: '',
    expiry: ['', ''],
    inputIndex: {
      cardNumber: 0,
      expiry: 0,
    },
  };

  _updateIndex = (type, value) => {
    let updateIndex = this.state.inputIndex;
    updateIndex[type] = value;
    this.setState({ inputIndex: updateIndex });
  };

  _scrollToInput = target => this.scroll.props.scrollToFocusedInput(target);

  _checkInputs() {
    const checkCardNumber =
      this.state.cardNumber.find(item => item.length < 4) === undefined;
    const checkPassword = this.state.password.length === 2;
    const checkBirth = this.state.birth.length === 6;
    const checkExpiry =
      this.state.expiry.find(item => item.length < 2) === undefined;
    return checkCardNumber && checkPassword && checkBirth && checkExpiry;
  }

  /* HANDLE INPUT */
  _handleCard = text => {
    const { cardNumber, inputIndex } = this.state;
    let updateCard = cardNumber;
    updateCard[inputIndex.cardNumber] = text;
    this.setState({ cardNumber: updateCard });

    if (text.length === 0) {
      if (0 < inputIndex.cardNumber)
        this.inputCard[inputIndex.cardNumber - 1].focus();
    } else if (text.length === 4) {
      if (inputIndex.cardNumber < 3)
        this.inputCard[inputIndex.cardNumber + 1].focus();
      else this.inputBirth.focus();
    }
  };
  _handleBirth = text => {
    this.setState({ birth: text });
    if (text.length === 6) this.inputPassword.focus();
  };
  _handlePassword = text => {
    this.setState({ password: text });
    if (text.length === 2) this.inputExpiry[0].focus();
  };
  _handleExpiry = text => {
    const { expiry, inputIndex } = this.state;
    let updateExpiry = expiry;
    updateExpiry[inputIndex.expiry] = text;

    if (text.length === 0) {
      if (0 < inputIndex.expiry)
        this.inputExpiry[inputIndex.expiry - 1].focus();
    } else if (text.length === 2) {
      if (inputIndex.expiry < 1)
        this.inputExpiry[inputIndex.expiry + 1].focus();
    }
  };
  /* END */

  render() {
    const { navigation } = this.props;
    // refs
    this.inputCard = [];
    this.inputExpiry = [];

    return (
      <StackPage
        title="멤버십 등록"
        navigation={navigation}
        disablePadding
        disableScroll>
        <KeyboardAwareScrollView
          innerRef={ref => (this.scroll = ref)}
          style={styles.blackBackground}
          keyboardShouldPersistTaps="never">
          <View style={navbar.navbarAreaFit} />
          <_SettingCard
            type="string"
            title={membership_string.membershipInfo}
            contents={[
              {
                title: membership_string.plan,
                value: 'BASIC',
              },
              {
                title: membership_string.renewal,
                value: getTime(31, 'days').timestamp.format('YYYY년 MM월 DD일'),
              },
            ]}
          />
          <_SettingCard
            type="string"
            title={membership_string.payment}
            contents={[
              {
                title: membership_string.subscriptionFee,
                value: '₩14,900',
              },
            ]}>
            {/* 카드번호 */}
            <View
              style={[
                container.textContainer,
                styles.rowDirection,
                { marginTop: 24 },
              ]}>
              <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
                {membership_string.cardNumber}
              </Text>
            </View>
            <View
              style={[
                container.textContainer,
                styles.rowDirection,
                { marginTop: 24, justifyContent: 'space-between' },
              ]}>
              <Numbox
                inputRef={c => (this.inputCard[0] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                onFocus={e => {
                  this._updateIndex('cardNumber', 0);
                  this._scrollToInput(findNodeHandle(e.target));
                }}
              />
              <Numbox
                inputRef={c => (this.inputCard[1] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                onFocus={e => {
                  this._updateIndex('cardNumber', 1);
                  this._scrollToInput(findNodeHandle(e.target));
                }}
              />
              <Numbox
                inputRef={c => (this.inputCard[2] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                onFocus={e => {
                  this._updateIndex('cardNumber', 2);
                  this._scrollToInput(findNodeHandle(e.target));
                }}
              />
              <Numbox
                inputRef={c => (this.inputCard[3] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                secureTextEntry={true}
                onFocus={e => {
                  this._updateIndex('cardNumber', 3);
                  this._scrollToInput(findNodeHandle(e.target));
                }}
              />
            </View>
            {/* END */}
            {/* Birth */}
            <View
              style={[
                container.textContainer,
                styles.rowDirection,
                { marginTop: 24 },
              ]}>
              <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
                {membership_string.birth}
              </Text>
              <Numbox
                inputRef={c => (this.inputBirth = c)}
                placeholder="990615"
                onChangeText={this._handleBirth}
                maxLength={6}
                onFocus={e => this._scrollToInput(findNodeHandle(e.target))}
              />
            </View>
            {/* END */}
            {/* 카드 비밀번호 */}
            <View
              style={[
                container.textContainer,
                styles.rowDirection,
                { marginTop: 24 },
              ]}>
              <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
                {membership_string.cardPassword}
              </Text>
              <Numbox
                inputRef={c => (this.inputPassword = c)}
                placeholder="**"
                onChangeText={this._handlePassword}
                maxLength={2}
                secureTextEntry={true}
                onFocus={e => this._scrollToInput(findNodeHandle(e.target))}
              />
            </View>
            {/* END */}
            {/* 유효기간 */}
            <View
              style={[
                container.textContainer,
                styles.rowDirection,
                { marginTop: 24 },
              ]}>
              <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
                {membership_string.validity}
              </Text>
              <Numbox
                inputRef={c => (this.inputExpiry[0] = c)}
                placeholder="월"
                onChangeText={this._handleExpiry}
                maxLength={2}
                onFocus={e => {
                  this._updateIndex('expiry', 0);
                  this._scrollToInput(findNodeHandle(e.target));
                }}
              />
              <Text style={settingStyle.contentValueText}>{` / `}</Text>
              <Numbox
                inputRef={c => (this.inputExpiry[1] = c)}
                placeholder="년"
                onChangeText={this._handleExpiry}
                maxLength={2}
                onFocus={e => {
                  this._updateIndex('expiry', 1);
                  this._scrollToInput(findNodeHandle(e.target));
                }}
              />
            </View>
            {/* END */}
          </_SettingCard>
          <View style={container.textContainer}>
            <_SquareButton
              backgroundColor={color_string.green_dark_dark}
              text={membership_string.registerMembership}
              onPress={() => {
                if (this._checkInputs())
                  subscribe(
                    this.state.cardNumber,
                    this.state.birth,
                    this.state.password,
                    this.state.expiry
                  )(navigation.dispatch);
                else
                  navigation.dispatch({
                    type: ModalAction.SHOW_MODAL,
                    data: {
                      type: 'alert',
                      text: membership_string.enterAllInfo,
                    },
                  });
              }}
            />
          </View>
        </KeyboardAwareScrollView>
      </StackPage>
    );
  }
}
