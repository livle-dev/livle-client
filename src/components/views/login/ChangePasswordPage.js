// Libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// Views
import BackgroundVideo from '../partials/BackgroundVideo';
import TopTitle from '../partials/TopTitle';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Network
import { changePassword } from '../../../network';
// Strings
import { login_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

const MIN_PASSWORD_LENGTH = 8;
export default class ChangePasswordPage extends Component {
  state = {
    password: '',
    confirmPassword: false,
    error: {
      pwd: null,
      confirmPwd: null,
    },
  };

  _handlePassword = text => this._checkError('password', text);
  _handleConfirmPassword = text =>
    this._checkError('confirmPassword', text === this.state.password);

  _checkError = (type, data) => {
    const updateError = this.state.error;
    switch (type) {
      case 'password':
        const check_password_length = data.length < MIN_PASSWORD_LENGTH;
        updateError.pwd = check_password_length
          ? login_string.enterPassword
          : null;
        break;
      case 'confirmPassword':
        updateError.confirmPwd = !data
          ? login_string.enterConfirmPassword
          : null;
        break;
    }
    this.setState({ [type]: data, error: updateError });
  };

  render() {
    const { navigation } = this.props;
    const { token } = navigation.state;
    const isCofirmed = !error.pwd && confirmPassword;

    return (
      <View style={[styles.blackBackground, styles.alignCenter]}>
        <BackgroundVideo />
        <TopTitle
          title={login_string.changePassword}
          onPress={() => navigation.goBack()}
          isTransparent={true}
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
        <View style={[container.wrapContainer, styles.rowDirection]}>
          <_SquareButton
            backgroundColor={
              isCofirmed ? color_string.green_aqua : color_string.gray_light
            }
            text={login_string.changePassword}
            disabled={!isConfirmed}
            onPress={() => {
              changePassword(token, this.state.password)(navigation.dispatch)
                .then(() => navigation.goBack())
                .catch(status => console.log(status));
            }}
          />
        </View>
      </View>
    );
  }
}
