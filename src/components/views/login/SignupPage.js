// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Views
import TopTitle from '../partials/TopTitle';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { login_string } from '../../../assets/strings';
// Network
import { signUp } from '../../../network';
// Styles
import { loginStyle } from '../../../assets/stylesheets/local/loginPageStyle';
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

const MIN_PASSWORD_LENGTH = 8;

export default class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: false,
    nickname: '',
    error: {
      email: '',
      pwd: '',
      confirmPwd: '',
      nickname: '',
    },
  };
  _handleEmail = text => this.setState({ email: text });
  _handlePassword = text => {
    const updateError = this.state.error;
    if (text.length >= MIN_PASSWORD_LENGTH) updateError.pwd = '';

    this.setState({ password: text, error: updateError });
  };
  _handleConfirmPassword = text => {
    const status = text === this.state.password;
    const updateError = this.state.error;
    if (status) updateError.confirmPwd = '';

    this.setState({ confirmPassword: status });
  };
  _handleNickname = text => this.setState({ nickname: text });

  render() {
    const { navigation } = this.props;
    const { password, confirmPassword, error } = this.state;

    return (
      <KeyboardAwareScrollView style={styles.blackBackground}>
        <TopTitle
          title={login_string.signUp}
          onPress={() => navigation.goBack()}
        />
        <View style={[container.fullContainer, styles.alignCenter]}>
          <_GreenInput
            placeholder={login_string.email}
            keyboardType="email-address"
            autoFocus={true}
            onChangeText={this._handleEmail}
            errorMessage={error.email}
          />
          <_GreenInput
            placeholder={login_string.newPassword}
            secureTextEntry={true}
            onChangeText={this._handlePassword}
            errorMessage={error.pwd}
            // callback
            onBlur={() => {
              const updateError = error;
              if (password.length < MIN_PASSWORD_LENGTH)
                updateError.pwd = '비밀번호를 8자리 이상 입력해주세요';
              this.setState({ error: updateError });
            }}
          />
          <_GreenInput
            placeholder={login_string.confirmPassword}
            secureTextEntry={true}
            onChangeText={this._handleConfirmPassword}
            errorMessage={error.confirmPwd}
            // callback
            onBlur={() => {
              const updateError = error;
              if (!confirmPassword)
                updateError.confirmPwd = '비밀번호가 일치하지 않습니다';
              this.setState({ error: updateError });
            }}
          />
          <_GreenInput
            placeholder={login_string.nickname}
            onChangeText={this._handleNickname}
            errorMessage={error.nickname}
          />

          <View style={[container.wrapContainer, styles.rowDirection]}>
            <_SquareButton
              backgroundColor={color_string.green_aqua}
              text={login_string.signUp}
              onPress={() => {
                if (confirmPassword)
                  signUp(
                    this.state.email,
                    this.state.password,
                    this.state.nickname
                  )(navigation.dispatch);
              }}
            />
          </View>

          <TouchableOpacity
            style={loginStyle.textButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={loginStyle.defaultText}>
              {login_string.alreadyHaveId}
              <Text style={loginStyle.boldText}>{login_string.logIn}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
