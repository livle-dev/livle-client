// Libraries
import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Views
import TopTitle from '../partials/TopTitle';
import _SettingCard from '../partials/_SettingCard';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { membership_string } from '../../../assets/strings';
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
    cvc: '',
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
      else this.inputPassword.focus();
    }
  };
  _handlePassword = text => {
    this.setState({ password: text });
    if (text.length === 2) this.inputCVC.focus();
  };
  _handleCVC = text => {
    this.setState({ cvc: text });
    if (text.length === 3) this.inputExpiry[0].focus();
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

  render() {
    const { navigation } = this.props;
    // refs
    this.inputCard = [];
    this.inputExpiry = [];

    return (
      <View style={styles.flex_1}>
        <TopTitle title="멤버십 등록" onPress={() => navigation.goBack()} />
        <KeyboardAwareScrollView
          innerRef={ref => (this.scroll = ref)}
          style={styles.blackBackground}>
          <View style={navbar.navbarAreaFit} />
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
                title: '결제 금액',
                value: '14,900원',
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
                카드번호 입력
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
                onFocus={() => this._updateIndex('cardNumber', 0)}
              />
              <Numbox
                inputRef={c => (this.inputCard[1] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                onFocus={() => this._updateIndex('cardNumber', 1)}
              />
              <Numbox
                inputRef={c => (this.inputCard[2] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                onFocus={() => this._updateIndex('cardNumber', 2)}
              />
              <Numbox
                inputRef={c => (this.inputCard[3] = c)}
                placeholder="****"
                onChangeText={this._handleCard}
                maxLength={4}
                onFocus={() => this._updateIndex('cardNumber', 3)}
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
                카드 비밀번호 (앞 2자리)
              </Text>
              <Numbox
                inputRef={c => (this.inputPassword = c)}
                placeholder="**"
                onChangeText={this._handlePassword}
                maxLength={2}
              />
            </View>
            {/* END */}
            {/* CVC */}
            <View
              style={[
                container.textContainer,
                styles.rowDirection,
                { marginTop: 24 },
              ]}>
              <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
                CVC
              </Text>
              <Numbox
                inputRef={c => (this.inputCVC = c)}
                placeholder="***"
                onChangeText={this._handleCVC}
                maxLength={3}
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
                유효기간
              </Text>
              <Numbox
                inputRef={c => (this.inputExpiry[0] = c)}
                placeholder="월"
                onChangeText={this._handleExpiry}
                maxLength={3}
                onFocus={() => this._updateIndex('expiry', 0)}
              />
              <Text style={settingStyle.contentValueText}>{` / `}</Text>
              <Numbox
                inputRef={c => (this.inputExpiry[1] = c)}
                placeholder="년"
                onChangeText={this._handleExpiry}
                maxLength={3}
                onFocus={() => this._updateIndex('expiry', 1)}
              />
            </View>
            {/* END */}
          </_SettingCard>
          <View style={container.textContainer}>
            <_SquareButton
              backgroundColor={color_string.green_dark_dark}
              text="멤버십 등록하기"
              onPress={() => console.log(this.state)}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
