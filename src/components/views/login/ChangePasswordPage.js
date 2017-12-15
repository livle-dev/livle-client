// Libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// Views
import TopTitle from '../partials/TopTitle';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { login_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

export default class ChangePasswordPage extends Component {
  state = {
    password: '',
    confirmPassword: false,
  };

  _handlePassword = text => this.setState({ password: text });
  _handleConfirmPassword = text =>
    this.setState({ confirmPassword: text === this.state.password });

  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.blackBackground, styles.alignCenter]}>
        <TopTitle
          title={login_string.changePassword}
          onPress={() => navigation.goBack()}
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
        <View style={[container.wrapContainer, styles.rowDirection]}>
          <_SquareButton
            backgroundColor={color_string.green_aqua}
            text={login_string.changePassword}
            onPress={() => {
              // TODO: 비밀번호 변경 Action
              navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}
