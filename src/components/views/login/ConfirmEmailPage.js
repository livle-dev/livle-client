// Libraries
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// Views
import BackgroundVideo from '../partials/BackgroundVideo';
import StackPage from '../partials/StackPage';
import _GreenInput from '../partials/_GreenInput';
import _SquareButton from '../partials/_SquareButton';
// Functions
import { isEmail } from '../../../assets/functions';
// Actions
import { confirmEmail } from '../../../network';
// Strings
import { session_string } from '../../../assets/strings';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

export default class ChangePasswordPage extends Component {
  state = { email: '', error: null, sendEmail: false };

  _handleEmail = text => {
    this.setState({
      email: text,
      error: isEmail(text) ? null : session_string.enterEmail,
    });
  };
  _submit = isConfirmed => {
    if (isConfirmed)
      confirmEmail(email)(navigation.dispatch).then(() =>
        this.setState({ sendEmail: true })
      );
  };

  render() {
    const { navigation } = this.props;
    const { email, error, sendEmail } = this.state;
    const isConfirmed = !error && email;

    return (
      <StackPage
        title={session_string.confirmEmail}
        navigation={navigation}
        containerStyle={styles.alignCenter}
        isTransparent
        disablePadding
        disableScroll>
        <BackgroundVideo />
        {!sendEmail ? (
          <View style={[container.fullContainer, styles.alignCenter]}>
            <_GreenInput
              placeholder={session_string.email}
              keyboardType="email-address"
              onChangeText={this._handleEmail}
              errorMessage={error}
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
                text={session_string.confirmEmail}
                disabled={!isConfirmed}
                onPress={() => this._submit(isConfirmed)}
              />
            </View>
          </View>
        ) : (
          <View style={[container.fullContainer, styles.alignCenter]}>
            <Text
              style={[
                styles.textNumInput,
                { color: color_string.green_light, marginBottom: 40 },
              ]}>
              {this.state.email}
            </Text>
            <Text style={[styles.textDefault, styles.textCenter]}>
              {session_string.sendConfirmEmail}
            </Text>
          </View>
        )}
      </StackPage>
    );
  }
}
