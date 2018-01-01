// Libraries
import React, { Component } from 'react';
import { View, Image, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';

class Loading extends Component {
  state = { spin: new Animated.Value(0) };

  componentDidMount() {
    const { spin } = this.state;
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bezier(0.58, 0.07, 0.46, 0.96),
        useNativeDriver: true,
      })
    ).start();
  }

  render() {
    const { show } = this.props.status;
    const width = 32;
    const height = width * (96 / 80);
    const spin = this.state.spin.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return show ? (
      <View
        style={[
          styles.alignCenter,
          { position: 'absolute', left: 0, right: 0 },
        ]}>
        <Animated.Image
          source={require('../../../assets/images/nav_go_on.png')}
          style={{
            width: width,
            height: height,
            transform: [{ rotate: spin }],
          }}
        />
      </View>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    status: state.showLoading,
  };
};

export default connect(mapStateToProps)(Loading);
