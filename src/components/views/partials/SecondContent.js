// Libraries
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  PlatformOSType,
} from 'react-native';
import YouTube from 'react-native-youtube';
import PropTypes from 'prop-types';
// Views
import ArtistProfile from './ArtistProfile';
// Strings
import { main_string, api_key } from '../../../assets/strings';
// Styles
import {
  mainCard,
  mainWidth,
} from '../../../assets/stylesheets/local/mainCardStyle';
import { styles, navbar } from '../../../assets/stylesheets/global/Style';

const Container = ({ children }) => {
  return (
    <View
      style={[
        mainCard.detailContainer,
        styles.fullWidth,
        styles.horizontalCenter,
      ]}
    >
      {children}
    </View>
  );
};

class VideoPlayer extends Component {
  state = {
    height: (mainWidth.innerContainer - mainWidth.innerPadding) * (9 / 16),
  };

  render() {
    const { videoId, innerRef, ...option } = this.props;

    return (
      <YouTube
        apiKey={api_key.youtube}
        videoId={videoId}
        ref={innerRef}
        controls={PlatformOSType === 'ios' ? 1 : 2}
        play={true}
        showFullscreenButton={true}
        // style
        style={{ alignSelf: 'stretch', height: this.state.height }}
        // callback
        onReady={this.handleReady}
        {...option}
      />
    );
  }
}

export default class SecondContent extends Component {
  render() {
    const { data, removePlayer } = this.props;

    return (
      <ScrollView style={mainCard.innerContainer}>
        <View style={navbar.navbarAreaFit} />
        <Container>
          <Text style={[mainCard.textDefault, styles.textCenter]}>
            {main_string.lineUp}
          </Text>
          <ArtistProfile artists={data.artists} />
        </Container>
        <Container>
          <Text style={[mainCard.textDefault, styles.textCenter]}>
            관련 영상
          </Text>
          {!removePlayer && (
            <VideoPlayer
              videoId={data.video_id}
              innerRef={c => (this.player = c)}
            />
          )}
        </Container>
      </ScrollView>
    );
  }
}
