// Libraries
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
// Views
import BackgroundVideo from '../partials/BackgroundVideo';
import StackPage from '../partials/StackPage';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Funtions
import { isEmail } from '../../../assets/functions';
// Strings
import { session_string } from '../../../assets/strings';
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
        const check_email_exist = isEmail(data);
        updateError.email = !check_email_exist
          ? session_string.enterEmail
          : info;
        break;
      case 'password':
        const check_password_length = data.length < MIN_PASSWORD_LENGTH;
        updateError.pwd = check_password_length
          ? info || session_string.enterPassword
          : null;
        break;
      case 'confirmPassword':
        updateError.confirmPwd = !data
          ? info || session_string.enterConfirmPassword
          : null;
        break;
      case 'nickname':
        const check_nickname_exist = data.length !== 0;
        updateError.nickname = !check_nickname_exist
          ? info || session_string.enterNickname
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
  _submit = isConfirmed => {
    const { email, password, nickname } = this.state;
    if (isConfirmed)
      signUp(email, password, nickname)(this.props.dispatch)
        .then(() => {})
        .catch(status => {
          console.log(status);
          switch (status) {
            case 403:
              this._checkError('email', email, session_string.existEmail);
              break;
            case 405:
              this._checkError('email', email, session_string.wrongEmail);
          }
        });
  };

  render() {
    const { navigation } = this.props;
    const { password, confirmPassword, error } = this.state;
    const isConfirmed =
      !error.email && !error.pwd && confirmPassword && !error.nickname;

    return (
      <StackPage
        title={session_string.signUp}
        navigation={navigation}
        containerStyle={styles.alignCenter}
        isTransparent
        disablePadding
        disableScroll>
        <BackgroundVideo />
        <KeyboardAwareScrollView style={container.fullContainer}>
          <View style={[container.fullContainer, styles.alignCenter]}>
            <_GreenInput
              placeholder={session_string.email}
              keyboardType="email-address"
              autoFocus={true}
              onChangeText={this._handleEmail}
              errorMessage={error.email}
            />
            <_GreenInput
              placeholder={session_string.newPassword}
              secureTextEntry={true}
              onChangeText={this._handlePassword}
              errorMessage={error.pwd}
            />
            <_GreenInput
              placeholder={session_string.confirmPassword}
              secureTextEntry={true}
              onChangeText={this._handleConfirmPassword}
              errorMessage={error.confirmPwd}
            />
            <_GreenInput
              placeholder={session_string.nickname}
              onChangeText={this._handleNickname}
              errorMessage={error.nickname}
              returnKeyType="go"
              onSubmitEditing={() => this._submit(isConfirmed)}
            />
            <View style={[container.wrapContainer, styles.rowDirection]}>
              <_SquareButton
                backgroundColor={
                  isConfirmed
                    ? color_string.green_aqua
                    : color_string.gray_light
                }
                text={session_string.signUp}
                disabled={!isConfirmed}
                onPress={() => this._submit(isConfirmed)}
              />
            </View>

            <TouchableOpacity
              style={loginStyle.textButton}
              onPress={() => navigation.goBack()}>
              <Text style={loginStyle.defaultText}>
                {session_string.alreadyHaveId}
                <Text style={loginStyle.boldText}>{session_string.logIn}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </StackPage>
    );
  }
}

export default connect()(SignupPage);
