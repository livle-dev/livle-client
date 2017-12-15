// Libraries
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Views
import ArtistProfile from './ArtistProfile';
// Strings
import { main_string } from '../../../assets/strings';
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
        <Text style={[mainCard.textDefault, styles.textCenter]}>
          {main_string.lineUp}
        </Text>
      </Container>
    </ScrollView>
  );
};

export default SecondContent;
