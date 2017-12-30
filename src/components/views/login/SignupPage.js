// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
// Views
import BackgroundVideo from '../partials/BackgroundVideo';
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

class SignupPage extends Component {
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

  _checkError = (type, data) => {
    const updateError = this.state.error;
    switch (type) {
      case 'email':
        let check_email_exist = data.length !== 0;
        updateError.email = !check_email_exist ? '이메일을 입력해주세요' : '';
        break;
      case 'password':
        let check_password_length = data.length < MIN_PASSWORD_LENGTH;
        updateError.pwd = check_password_length
          ? '비밀번호를 8자리 이상 입력해주세요'
          : '';
        break;
      case 'confirmPassword':
        updateError.confirmPwd = !data ? '비밀번호가 일치하지 않습니다' : '';
        break;
      case 'nickname':
        let check_nickname_exist = data.length !== 0;
        updateError.nickname = !check_nickname_exist
          ? '닉네임을 입력해주세요'
          : '';
        break;
    }
    this.setState({ [type]: data, error: updateError });
  };

  _handleEmail = text => this._checkError('email', text);
  _handlePassword = text => this._checkError('password', text);
  _handleConfirmPassword = text =>
    this._checkError('confirmPassword', text === this.state.password);
  _handleNickname = text => this._checkError('nickname', text);

  render() {
    const { navigation } = this.props;
    const { password, confirmPassword, error } = this.state;

    return (
      <View style={styles.blackBackground}>
        <BackgroundVideo />
        <KeyboardAwareScrollView style={container.fullContainer}>
          <TopTitle
            title={login_string.signUp}
            onPress={() => navigation.goBack()}
            isTransparent={true}
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
            />
            <_GreenInput
              placeholder={login_string.confirmPassword}
              secureTextEntry={true}
              onChangeText={this._handleConfirmPassword}
              errorMessage={error.confirmPwd}
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
                    )(this.props.dispatch);
                }}
              />
            </View>

            <TouchableOpacity
              style={loginStyle.textButton}
              onPress={() => navigation.goBack()}>
              <Text style={loginStyle.defaultText}>
                {login_string.alreadyHaveId}
                <Text style={loginStyle.boldText}>{login_string.logIn}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect()(SignupPage);
