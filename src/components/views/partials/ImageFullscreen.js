// Libraries
import React, { Component } from 'react';
import { View, TouchableOpacity, BackHandler, Text } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import PhotoView from 'react-native-photo-view';
// Actions
import { ImageFullAction, LoadingAction } from '../../../reducers/Actions';
// Icons
import Icon from '../../../assets/images/Icon';
// Styles
import {
  styles,
  container,
  width,
  height,
} from '../../../assets/stylesheets/global/Style';
import { fullscreenStyle } from '../../../assets/stylesheets/local/imageFullscreenStyle';

class ImageFullscreen extends Component {
  state = { toggle: true };

  componentWillMount() {
    const { showLoading, hideFullscreen } = this.props;
    showLoading();
    BackHandler.addEventListener('hardwareBackPress', () => hideFullscreen());
  }

  render() {
    const { uri, show, hideFullscreen, hideLoading } = this.props;
    const { toggle } = this.state;

    return show ? (
      <TouchableOpacity
        style={[container.absoluteContainer, styles.blackBackground]}
        activeOpacity={1}
        onPress={() => this.setState({ toggle: !toggle })}>
        <PhotoView
          source={{ uri: uri }}
          minimumZoomScale={1}
          maximumZoomScale={5}
          androidScaleType="fitCenter"
          onLoadEnd={() => hideLoading()}
          style={{
            width: width.full,
            height: height.full,
          }}
        />
        {toggle && (
          <LinearGradient
            colors={['rgba(8, 8, 8, 0.4)', 'transparent']}
            style={[fullscreenStyle.dismissContainer, styles.verticalCenter]}>
            <Icon
              src="ic_close"
              onPress={() => hideFullscreen()}
              width={20}
              fitToIcon
            />
          </LinearGradient>
        )}
      </TouchableOpacity>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    show: state.imageFullscreen.show,
    uri: state.imageFullscreen.uri,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideFullscreen: () => dispatch({ type: ImageFullAction.HIDE_IMAGE }),
    showLoading: () => dispatch({ type: LoadingAction.SHOW_LOADING }),
    hideLoading: () => dispatch({ type: LoadingAction.HIDE_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageFullscreen);
