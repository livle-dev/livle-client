// Libraries
import React, { Component } from 'react';
import { View, BackHandler, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import PhotoView from 'react-native-photo-view';
import Lightbox from 'react-native-lightbox';
// Icons
import Icon from '../../../assets/images/Icon';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { fullscreenStyle } from '../../../assets/stylesheets/local/imageFullscreenStyle';

export default class FullscreenImage extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    style: PropTypes.any.isRequired,
    title: PropTypes.string,
  };

  state = { lightMode: false, touch: false, changeScale: false };

  Header = close => {
    BackHandler.addEventListener('hardwareBackPress', close);
    return (
      <LinearGradient
        colors={['rgba(8, 8, 8, 0.4)', 'transparent']}
        style={[fullscreenStyle.dismissContainer, styles.verticalCenter]}>
        <Icon src="ic_close" width={20} fitToIcon onPress={close} />
      </LinearGradient>
    );
  };

  LightModeView = () => {
    const { source, title } = this.props;
    const { touch, changeScale } = this.state;

    return (
      <View style={container.fullContainer}>
        <PhotoView
          source={source}
          minimumZoomScale={1}
          maximumZoomScale={5}
          androidScaleType="fitCenter"
          style={styles.flex_1}
          // callback
          onLoadEnd={() =>
            setTimeout(() => {
              this.setState({ changeScale: false });
            }, 200)
          }
          onTap={() => this.setState({ touch: !touch })}
          onViewTap={() => this.setState({ touch: !touch })}
          onScale={() => {
            if (touch) this.setState({ touch: false });
            if (!changeScale) this.setState({ changeScale: true });
          }}
        />
        {(touch || !changeScale) && (
          <LinearGradient
            colors={['transparent', 'rgba(8, 8, 8, 0.4)']}
            style={[fullscreenStyle.infoContainer, styles.verticalCenter]}>
            <Text style={styles.textDefault}>{title}</Text>
          </LinearGradient>
        )}
      </View>
    );
  };

  render() {
    const { source, style } = this.props;
    return (
      <Lightbox
        renderHeader={this.Header}
        swipeToDismiss={!this.state.changeScale}
        springConfig={{ tension: 40, friction: 7 }}
        // callback
        onOpen={() => this.setState({ lightMode: true })}
        onClose={() => this.setState({ lightMode: false })}>
        {this.state.lightMode ? (
          this.LightModeView()
        ) : (
          <Image style={style} source={source} />
        )}
      </Lightbox>
    );
  }
}
