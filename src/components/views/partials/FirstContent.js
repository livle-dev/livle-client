// Libraries
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Views
import ShowInfo from './ShowInfo';
// Strings
import { main_string } from '../../../assets/strings';
// Styles
import {
  mainCard,
  mainWidth,
} from '../../../assets/stylesheets/local/mainCardStyle';
import { styles } from '../../../assets/stylesheets/global/Style';
import Icon from '../../../assets/images/Icon';

const FirstContent = ({ data, showDetail }) => {
  return (
    <View style={[mainCard.innerContainer, styles.horizontalCenter]}>
      <Image style={mainCard.imgContainer} source={{ uri: data.image }} />
      <ShowInfo data={data} />
      <TouchableOpacity
        style={[mainCard.moreButton, styles.horizontalCenter]}
        onPress={showDetail}>
        <Text style={[mainCard.textVacancies]}>
          {data.capacity > 0
            ? `${data.capacity}${main_string.capacity}`
            : main_string.booked}
        </Text>
        <Icon src="ic_more" width={mainWidth.icMore} onPress={showDetail} />
      </TouchableOpacity>
    </View>
  );
};

export default FirstContent;
