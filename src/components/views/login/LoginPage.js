// Libraries
import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from 'react-native';
// Styles
import { loginStyle } from '../../../assets/stylesheets/local/loginPageStyle';
import {
  styles,
  width,
  container,
} from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';
import { font_size, font_style } from '../../../assets/fonts/Font';
// Actions
import { AppAction } from '../../../reducers/Actions';
// Network
import { login, facebookLogin } from '../../../network';
// Views
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { login_string } from '../../../assets/strings';
// Icons
import Icon from '../../../assets/images/Icon';

export default class LoginPage extends Component {
  state = { email: '', password: '' };

  _handleEmail = text => this.setState({ email: text });
  _handlePassword = text => this.setState({ password: text });

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.blackBackground}>
        <KeyboardAvoidingView
          style={[container.fullContainer, styles.alignCenter]}
        >
          <Icon
            src="logo_livle"
            width={width.logo}
            iconStyle={{ marginBottom: 108 }}
            disabled={true}
          />
          <_GreenInput
            placeholder={login_string.email}
            keyboardType="email-address"
            onChangeText={this._handleEmail}
          />
          <_GreenInput
            placeholder={login_string.password}
            secureTextEntry={true}
            onChangeText={this._handlePassword}
          />
          <View style={container.wrapContainer}>
            <View style={styles.rowDirection}>
              <_SquareButton
                backgroundColor={color_string.green_dark}
                text={login_string.signUp}
                onPress={() => navigation.navigate('Signup')}
                index={0}
              />
              <_SquareButton
                backgroundColor={color_string.green_aqua}
                text={login_string.logIn}
                onPress={() => {
                  const { email, password } = this.state;
                  login(email, password)(navigation.dispatch);
                }}
                index={1}
              />
            </View>
            <View style={styles.rowDirection}>
              <_SquareButton
                backgroundColor={color_string.blue_facebook}
                text={login_string.facebook}
                onPress={() => facebookLogin(navigation.dispatch)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={loginStyle.textButton}
            onPress={() => navigation.navigate('ConfirmEmail')}
          >
            <Text style={loginStyle.defaultText}>
              {login_string.findPassword}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
