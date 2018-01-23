// Libraries
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Views
import _GreenInput from './_GreenInput';
import _SquareButton from './_SquareButton';
// Actions
import { ModalAction } from '../../../reducers/Actions';
// String
import { global_string } from '../../../assets/strings';
// Styles
import {
  styles,
  container,
  width,
} from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';
// Icons
import Icon from '../../../assets/images/Icon';

export const ModalType = {
  alert: 'alert',
  select: 'select',
  password: 'password',
  blink: 'blink',
};

class InputModal extends Component {
  state = { password: '' };

  _handlePassword = text => this.setState({ password: text });

  render() {
    const { text, buttonText, dismiss, onPress } = this.props;
    const hasPassword = this.state.password.length >= 8;
    return (
      <View style={container.modalContainer}>
        <View style={[styles.flex_1, styles.alignCenter]}>
          <Text style={[styles.textDefault, styles.textCenter]}>{text}</Text>
        </View>
        <_GreenInput
          placeholder={global_string.enterPassword}
          onChangeText={this._handlePassword}
          errorMessage={hasPassword ? null : '비밀번호를 입력해주세요.'}
          secureTextEntry={true}
        />
        <View style={[styles.rowDirection, { marginBottom: 6 }]}>
          <_SquareButton
            index={0}
            backgroundColor={color_string.green_dark_dark}
            text={global_string.cancel}
            onPress={dismiss}
          />
          <_SquareButton
            index={1}
            backgroundColor={color_string.green_light}
            text={buttonText}
            onPress={() => {
              if (hasPassword) {
                onPress(this.state.password);
                dismiss();
              }
            }}
          />
        </View>
      </View>
    );
  }
}

const Content = ({ data, dismiss }) => {
  const { type, text, buttonText, onPress, showLogo } = data;
  switch (type) {
    case ModalType.alert:
      return (
        <View style={container.modalContainer}>
          <View style={[styles.flex_1, styles.alignCenter]}>
            {showLogo && (
              <Icon
                src="logo_livle"
                width={width.logo}
                iconStyle={{ marginBottom: 36 }}
              />
            )}
            <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
          </View>
          <View style={{ height: 80, marginBottom: 6 }}>
            <_SquareButton
              text={global_string.confirm}
              backgroundColor={color_string.green_light}
              onPress={dismiss}
            />
          </View>
        </View>
      );
    case ModalType.select:
      return (
        <View style={container.modalContainer}>
          <View style={[styles.flex_1, styles.alignCenter]}>
            <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
          </View>
          <View style={[styles.rowDirection, { marginBottom: 6 }]}>
            <_SquareButton
              index={0}
              backgroundColor={color_string.green_dark_dark}
              text={global_string.cancel}
              onPress={dismiss}
            />
            <_SquareButton
              index={1}
              backgroundColor={color_string.green_light}
              text={buttonText}
              onPress={() => {
                onPress();
                dismiss();
              }}
            />
          </View>
        </View>
      );
    case ModalType.blink:
      return (
        <View style={[container.modalContainer, styles.alignCenter]}>
          <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
        </View>
      );
    case ModalType.password:
      return (
        <InputModal
          text={text}
          buttonText={buttonText}
          dismiss={dismiss}
          onPress={onPress}
        />
      );
  }
};

class Modal extends Component {
  hideModal = () => this.props.dispatch({ type: ModalAction.HIDE_MODAL });

  componentWillUpdate(props) {
    const { data } = props.status;
    if (data) data.type === ModalType.blink && setTimeout(this.hideModal, 1500);
  }

  render() {
    const { show, data } = this.props.status;
    return show ? (
      <View style={[styles.modalBackground, styles.alignCenter]}>
        <Content data={data} dismiss={this.hideModal} />
      </View>
    ) : null;
  }
}

const mapStateToProps = state => {
  return { status: state.showModal };
};

export default connect(mapStateToProps)(Modal);
