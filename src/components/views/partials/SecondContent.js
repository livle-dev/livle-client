// Libraries
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Views
import _ArtistProfile from './_ArtistProfile';
// Strings
import { main_string } from '../../../assets/strings';
// Styles
import {
  mainCard,
  HEIGHT,
} from '../../../assets/stylesheets/local/mainCardStyle';
import { styles, navbar } from '../../../assets/stylesheets/global/Style';

export default ({ data }) => {
  return (
    <ScrollView style={mainCard.innerContainer}>
      <View style={navbar.navbarAreaFit} />
      <View
        style={[
          mainCard.detailContainer,
          styles.fullWidth,
          styles.horizontalCenter,
        ]}
      >
        <Text style={[mainCard.textDefault, styles.textCenter]}>
          {main_string.lineUp}
        </Text>
        <_ArtistProfile artists={data.artists} />
      </View>
    </ScrollView>
  );
};
