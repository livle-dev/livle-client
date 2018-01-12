// Libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Views
import StackPage from '../partials/StackPage';
import BackgroundVideo from '../partials/BackgroundVideo';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Network
import { changePassword } from '../../../network';
// Strings
import { session_string } from '../../../assets/strings';
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
          ? session_string.enterPassword
          : null;
        break;
      case 'confirmPassword':
        updateError.confirmPwd = !data
          ? session_string.enterConfirmPassword
          : null;
        break;
    }
    this.setState({ [type]: data, error: updateError });
  };

  _submit = isConfirmed => {
    const { navigation } = this.props;
    const { token } = navigation.state.params;
    if (isConfirmed && token)
      changePassword(token, this.state.password)(navigation.dispatch)
        .then(() => navigation.goBack())
        .catch(status => console.log(status));
  };

  render() {
    const { navigation } = this.props;
    const { password, confirmPassword, error } = this.state;
    const isCofirmed = !error.pwd && confirmPassword;

    return (
      <StackPage
        title={session_string.changePassword}
        navigation={navigation}
        containerStyle={styles.alignCenter}
        isTransparent
        disablePadding
        disableScroll>
        <BackgroundVideo />
        <KeyboardAwareScrollView style={styles.flex_1}>
          <View style={[container.fullContainer, styles.alignCenter]}>
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
              returnKeyType="go"
              onSubmitEditing={() => this._submit(isConfirmed)}
            />
            <View style={[container.wrapContainer, styles.rowDirection]}>
              <_SquareButton
                backgroundColor={
                  isCofirmed ? color_string.green_aqua : color_string.gray_light
                }
                text={session_string.changePassword}
                disabled={!isCofirmed}
                onPress={() => this._submit(isConfirmed)}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </StackPage>
    );
  }
}
