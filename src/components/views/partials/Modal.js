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
// Styles
import {
  styles,
  container,
  width,
} from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';
// Icons
import Icon from '../../../assets/images/Icon';

function Content({ data, dismiss, value, onTextChange }) {
  const { type, text, buttonText, onPress, showLogo } = data;
  switch (type) {
    case 'check':
      return (
        <View style={container.modalContainer}>
          <View style={[styles.flex_1, styles.alignCenter]}>
            {showLogo && (
              <Icon
                src="logo_livle"
                width={width.logo}
                iconStyle={{ marginBottom: 36 }}
                disabled={true}
              />
            )}
            <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
          </View>
          <View style={{ height: 80, marginBottom: 6 }}>
            <_SquareButton
              text="확인"
              backgroundColor={color_string.green_light}
              onPress={dismiss}
            />
          </View>
        </View>
      );
    case 'select':
      return (
        <View style={container.modalContainer}>
          <View style={[styles.flex_1, styles.alignCenter]}>
            <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
          </View>
          <View style={[styles.rowDirection, { marginBottom: 6 }]}>
            <_SquareButton
              index={0}
              backgroundColor={color_string.green_dark_dark}
              text="취소"
              onPress={dismiss}
            />
            <_SquareButton
              index={1}
              backgroundColor={color_string.green_light}
              text={buttonText}
              onPress={() => {
                onPress(value);
                dismiss();
              }}
            />
          </View>
        </View>
      );
    case 'input':
      return (
        <View style={container.modalContainer}>
          <View style={[styles.flex_1, styles.alignCenter]}>
            <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
          </View>
          <_GreenInput
            placeholder="비밀번호를 입력하세요"
            onTextChange={onTextChange}
            errorMessage="비밀번호가 올바르지 않습니다."
          />
          <View style={[styles.rowDirection, { marginBottom: 6 }]}>
            <_SquareButton
              index={0}
              backgroundColor={color_string.green_dark_dark}
              text="취소"
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
    case 'notice':
      return (
        <View style={[container.modalContainer, styles.alignCenter]}>
          <Text style={[styles.textCenter, styles.textDefault]}>{text}</Text>
        </View>
      );
  }
}

class Modal extends Component {
  state = { value: '' };

  hideModal = () => this.props.dispatch({ type: ModalAction.HIDE_MODAL });

  _handleValue = text => this.setState({ value: text });

  componentDidMount() {
    const { data } = this.props;
    if (data) data.type === 'notice' && setTimeout(hideModal, 1500);
  }

  render() {
    const { show, data } = this.props.status;

    return show ? (
      <View style={[styles.modalBackground, styles.alignCenter]}>
        <Content
          data={data}
          dismiss={this.hideModal}
          onTextChange={this._handleValue}
          value={this.state.value}
        />
      </View>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    status: state.showModal,
  };
};

export default connect(mapStateToProps)(Modal);
