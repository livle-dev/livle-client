// Libraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube';
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

const Container = ({ children, ...option }) => {
  return (
    <View
      style={[
        mainCard.detailContainer,
        styles.fullWidth,
        styles.horizontalCenter,
      ]}
      {...option}>
      {children}
    </View>
  );
};

class VideoPlayer extends Component {
  state = {
    height: (mainWidth.innerContainer - mainWidth.innerPadding) * (9 / 16),
  };

  StandalonePlayer = () => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: api_key.youtube,
      videoId: this.props.videoId,
      autoplay: true,
    })
      .then(() => Promise.resolve())
      .catch(err => Promise.reject(err));
  };

  render() {
    const { videoId, ...option } = this.props;
    const { height } = this.state;

    return (
      <YouTube
        apiKey={api_key.youtube}
        videoId={videoId}
        ref={c => (this.youtubePlayer = c)}
        controls={2}
        play={false}
        resumePlayAndroid={false}
        // style
        style={{ alignSelf: 'stretch', height: height }}
        showFullscreenButton={true}
        // callback
        onChangeState={e => {
          if (e.state === 'playing') this.StandalonePlayer();
        }}
        {...option}
      />
    );
  }
}

export default class SecondContent extends Component {
  state = { isMounted: false };

  render() {
    const { data, removePlayer } = this.props;

    return (
      <ScrollView
        style={mainCard.innerScrollContainer}
        onLayout={e => {
          if (!this.state.isMounted) this.setState({ isMounted: true });
        }}>
        <View style={navbar.navbarAreaFit} />
        <Container>
          <Text style={[mainCard.textDefault, styles.textCenter]}>
            {main_string.lineUp}
          </Text>
          <ArtistProfile artists={data.artists} />
        </Container>
        <Container>
          <Text style={[mainCard.textDefault, styles.textCenter]}>
            {main_string.relatedVideo}
          </Text>
          {this.state.isMounted &&
            !removePlayer && <VideoPlayer videoId={data.videoId} />}
        </Container>
      </ScrollView>
    );
  }
}
