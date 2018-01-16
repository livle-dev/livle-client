// Libraries
import React, { Component } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
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

  render() {
    const { videoId, innerRef, ...option } = this.props;

    return (
      <YouTube
        videoId={videoId}
        ref={innerRef}
        controls={1}
        // style
        style={{ alignSelf: 'stretch', height: this.state.height }}
        showFullscreenButton={true}
        modestbranding={true}
        showinfo={false}
        {...option}
      />
    );
  }
}

export default class SecondContent extends Component {
  state = { isMounted: false, isPlaying: false };

  componentWillReceiveProps(props) {
    if (props.removePlayer) this.setState({ isPlaying: false });
  }

  render() {
    const { data } = this.props;

    return (
      <ScrollView
        style={mainCard.innerContainer}
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
          {this.state.isMounted && (
            <VideoPlayer
              videoId={data.videoId}
              innerRef={c => (this.player = c)}
              play={this.state.isPlaying}
              // callback
              onChangeState={e =>
                this.setState({ isPlaying: e.state === 'playing' })
              }
            />
          )}
        </Container>
      </ScrollView>
    );
  }
}
