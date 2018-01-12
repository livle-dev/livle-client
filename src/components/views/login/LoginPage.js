// Libraries
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
import { LoadingAction } from '../../../reducers/Actions';
// Network
import { login, facebookLogin } from '../../../network';
// Function
import { isEmail } from '../../../assets/functions';
// Views
import BackgroundVideo from '../partials/BackgroundVideo';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Strings
import { session_string } from '../../../assets/strings';
// Icons
import Icon from '../../../assets/images/Icon';

export default class LoginPage extends Component {
  state = { email: '', password: '', error: null };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: LoadingAction.HIDE_LOADING });
  }

  _handleEmail = text =>
    this.setState({
      email: text,
      error: isEmail(text) ? null : session_string.enterEmail,
    });
  _handlePassword = text => this.setState({ password: text });
  _submit = () => {
    const { email, password } = this.state;
    if (!this.state.error && this.state.password)
      login(email, password)(dispatch);
  };

  render() {
    const { navigation, dispatch } = this.props;

    return (
      <KeyboardAwareScrollView style={styles.flex_1}>
        <BackgroundVideo />
        <View style={[container.fullContainer, styles.alignCenter]}>
          <Icon
            src="logo_livle"
            width={width.logo}
            iconStyle={{ marginBottom: 108 }}
            disabled={true}
          />
          <_GreenInput
            placeholder={session_string.email}
            keyboardType="email-address"
            onChangeText={this._handleEmail}
            errorMessage={this.state.error}
          />
          <_GreenInput
            placeholder={session_string.password}
            secureTextEntry={true}
            onChangeText={this._handlePassword}
            returnKeyType="go"
            onSubmitEditing={this._submit}
          />
          <View style={container.wrapContainer}>
            <View style={styles.rowDirection}>
              <_SquareButton
                backgroundColor={color_string.green_dark}
                text={session_string.signUp}
                onPress={() => navigation.navigate('Signup')}
                index={0}
              />
              <_SquareButton
                backgroundColor={color_string.green_aqua}
                text={session_string.logIn}
                onPress={this._submit}
                index={1}
              />
            </View>
            <View style={styles.rowDirection}>
              <_SquareButton
                backgroundColor={color_string.blue_facebook}
                text={session_string.facebook}
                onPress={() => facebookLogin(dispatch)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={loginStyle.textButton}
            onPress={() => navigation.navigate('ConfirmEmail')}>
            <Text style={loginStyle.defaultText}>
              {session_string.findPassword}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
