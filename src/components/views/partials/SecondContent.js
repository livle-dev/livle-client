// Libraries
import React from 'react';
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
  HEIGHT,
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

const SecondContent = ({ data }) => {
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
        <Text style={[mainCard.textDefault, styles.textCenter]}>영상 보기</Text>
        <YouTube
          apiKey={api_key.youtube}
          videoId="7-qeUjs4Oyo"
          play={true}
          // callback
          // style
          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </Container>
    </ScrollView>
  );
};

export default SecondContent;
