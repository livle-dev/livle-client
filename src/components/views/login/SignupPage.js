// Libraries
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
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
import { styles } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

export default class SignupPage extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: false,
    nickname: '',
  };
  _handleEmail = text => this.setState({ email: text });
  _handlePassword = text => this.setState({ password: text });
  _handleConfirmPassword = text =>
    this.setState({ confirmPassword: text === this.state.password });
  _handleNickname = text => this.setState({ nickname: text });

  render() {
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView style={styles.blackBackground}>
        <TopTitle
          title={login_string.signUp}
          onPress={() => navigation.goBack()}
        />
        <View style={[styles.fullContainer, styles.alignCenter]}>
          <_GreenInput
            placeholder={login_string.email}
            keyboardType="email-address"
            autoFocus={true}
            onChangeText={this._handleEmail}
          />
          <_GreenInput
            placeholder={login_string.newPassword}
            secureTextEntry={true}
            onChangeText={this._handlePassword}
          />
          <_GreenInput
            placeholder={login_string.confirmPassword}
            secureTextEntry={true}
            onChangeText={this._handleConfirmPassword}
          />
          <_GreenInput
            placeholder={login_string.nickname}
            onChangeText={this._handleNickname}
          />

          <View style={[styles.wrapContainer, styles.rowDirection]}>
            <_SquareButton
              backgroundColor={color_string.green_aqua}
              text={login_string.signUp}
              onPress={() => {
                if (this.state.confirmPassword) {
                  signUp(
                    this.state.email,
                    this.state.password,
                    this.state.nickname
                  )(navigation.dispatch);
                } else {
                  alert('비밀번호가 일치하지 않습니다');
                }
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
      </KeyboardAvoidingView>
    );
  }
}
