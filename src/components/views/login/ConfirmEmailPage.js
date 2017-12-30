// Libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// Views
import BackgroundVideo from '../partials/BackgroundVideo';
import TopTitle from '../partials/TopTitle';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Actions
import { confirmEmail } from '../../../network';
// Strings
import { login_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

export default class ChangePasswordPage extends Component {
  state = { email: '' };

  _handleEmail = text => this.setState({ email: text });

  render() {
    const { navigation } = this.props;
    return (
      <View style={[styles.blackBackground, styles.alignCenter]}>
        <BackgroundVideo />
        <TopTitle
          title={login_string.changePassword}
          onPress={() => navigation.goBack()}
          isTransparent={true}
        />
        <_GreenInput
          placeholder={login_string.email}
          keyboardType="email-address"
          onChangeText={this._handleEmail}
        />
        <View style={[container.wrapContainer, styles.rowDirection]}>
          <_SquareButton
            backgroundColor={color_string.green_aqua}
            text={login_string.confirmEmail}
            onPress={() => confirmEmail(this.state.email)(navigation.dispatch)}
          />
        </View>
      </View>
    );
  }
}
