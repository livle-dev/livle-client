// Libraries
import React, { Component } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
// Action
import { MessageBarAction } from '../../../reducers/Actions';
// Styles
import {
  styles,
  container,
  height,
} from '../../../assets/stylesheets/global/Style';
import Scale from '../../../assets/stylesheets/global/Scale';

class MessageBar extends Component {
  state = {
    barPosition: new Animated.Value(-height.messagebar),
  };

  showMessage = () => {
    const { dispatch } = this.props;
    const pos = this.state.barPosition;
    const duration = 400;

    Animated.sequence([
      Animated.timing(pos, {
        toValue: Platform.select({ ios: 0, android: Scale.STATUSBAR_HEIGHT }),
        duration: duration,
      }),
      Animated.timing(pos, {
        toValue: -height.messagebar,
        delay: 1500,
        duration: duration,
      }),
    ]).start(() => {
      dispatch({ type: MessageBarAction.HIDE_MESSAGE_BAR });
    });
  };

  componentWillReceiveProps(props) {
    props.status.show && this.showMessage();
  }

  render() {
    const { status } = this.props;

    return status.show ? (
      <Animated.View
        style={[
          container.messagebarContainer,
          styles.alignCenter,
          { top: this.state.barPosition },
        ]}>
        <Text style={styles.textDefault}>{status.message}</Text>
      </Animated.View>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    status: state.showMessageBar,
  };
};

export default connect(mapStateToProps)(MessageBar);
