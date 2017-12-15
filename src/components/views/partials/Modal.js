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

const Content = ({ type, text, dismiss, onPress, showLogo }) => {
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
          <View style={{ height: 80 }}>
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
            <Text styles={[styles.textCenter, styles.textDefault]}>{text}</Text>
          </View>
          <View style={styles.horizontalCenter}>
            <_SquareButton
              index={0}
              backgroundColor={color_string.green_dark_dark}
              text="취소"
              onPress={dismiss}
            />
            <_SquareButton
              index={1}
              backgroundColor={color_string.green_dark_dark}
              text={text}
              onPress={onPress}
            />
          </View>
        </View>
      );
    case 'notice':
      return (
        <View style={[container.modalContainer, styles.alignCenter]}>
          <Text styles={[styles.textCenter, styles.textDefault]}>{text}</Text>
        </View>
      );
  }
};

class Modal extends Component {
  hideModal = () => this.props.dispatch({ type: ModalAction.HIDE_MODAL });

  componentDidMount() {
    const { data } = this.props;
    if (data) data.type === 'notice' && setTimeout(hideModal, 1500);
  }

  render() {
    const { show, data } = this.props.status;

    return show ? (
      <View style={[styles.modalBackground, styles.alignCenter]}>
        <Content
          type={data.type}
          text={data.text}
          showLogo={data.showLogo}
          onPress={data.onPress}
          dismiss={this.hideModal}
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
