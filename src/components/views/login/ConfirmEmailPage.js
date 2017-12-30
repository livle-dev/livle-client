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
  state = { email: '', sendEmail: false };

  _handleEmail = text => this.setState({ email: text });
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.blackBackground}>
        <BackgroundVideo />
        <TopTitle
          title={login_string.changePassword}
          onPress={() => navigation.goBack()}
          isTransparent={true}
        />
        {!this.state.sendEmail ? (
          <View style={[container.fullContainer, styles.alignCenter]}>
            <_GreenInput
              placeholder={login_string.email}
              keyboardType="email-address"
              onChangeText={this._handleEmail}
            />
            <View style={[container.wrapContainer, styles.rowDirection]}>
              <_SquareButton
                backgroundColor={color_string.green_aqua}
                text={login_string.confirmEmail}
                onPress={() =>
                  confirmEmail(this.state.email)(navigation.dispatch).then(() =>
                    this.setState({ sendEmail: true })
                  )
                }
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
              입력하신 이메일으로{'\n'}인증코드가 전송되었습니다.
            </Text>
          </View>
        )}
      </View>
    );
  }
}
