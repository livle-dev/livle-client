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
      email: null,
      pwd: null,
      confirmPwd: null,
      nickname: null,
    },
  };

  _checkError = (type, data, info = null) => {
    const updateError = this.state.error;
    switch (type) {
      case 'email':
        const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,6}$/i;
        const check_email_exist = data.match(regExp) !== null;
        updateError.email = !check_email_exist ? login_string.enterEmail : info;
        break;
      case 'password':
        const check_password_length = data.length < MIN_PASSWORD_LENGTH;
        updateError.pwd = check_password_length
          ? info || login_string.enterPassword
          : null;
        break;
      case 'confirmPassword':
        updateError.confirmPwd = !data
          ? info || login_string.enterConfirmPassword
          : null;
        break;
      case 'nickname':
        const check_nickname_exist = data.length !== 0;
        updateError.nickname = !check_nickname_exist
          ? info || login_string.enterNickname
          : null;
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
    const isConfirmed =
      !error.email && !error.pwd && confirmPassword && !error.nickname;

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
                backgroundColor={
                  isConfirmed
                    ? color_string.green_aqua
                    : color_string.gray_light
                }
                text={login_string.signUp}
                disabled={!isConfirmed}
                onPress={() => {
                  if (isConfirmed)
                    signUp(
                      this.state.email,
                      this.state.password,
                      this.state.nickname
                    )(this.props.dispatch).catch(status => {
                      switch (status) {
                        case 403:
                          this._checkError(
                            'email',
                            this.state.email,
                            login_string.existEmail
                          );
                          break;
                        case 405:
                          this._checkError(
                            'email',
                            this.state.email,
                            login_string.wrongEmail
                          );
                      }
                    });
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
