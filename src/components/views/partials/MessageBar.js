// Libraries
import React, { Component } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { connect } from 'react-redux';
// Action
import { MessageBarAction } from '../../../reducers/Actions';
// Styles
import { styles, height } from '../../../assets/stylesheets/global/Style';
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
      dispatch({ type: MessageBarAction.ANIMATE_ENDED });
    });
  };

  componentWillReceiveProps(props) {
    props.status.show && this.showMessage();
  }

  render() {
    const { status } = this.props;

    return (
      <Animated.View
        style={[
          styles.messagebarContainer,
          styles.alignCenter,
          { top: this.state.barPosition },
        ]}
      >
        <Text style={styles.textDefault}>{status.message}</Text>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => {
  return {
    status: state.showMessageBar,
  };
};

export default connect(mapStateToProps)(MessageBar);
