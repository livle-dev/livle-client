// Libraries
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// Views
import ShowInfo from './ShowInfo';
import FullscreenImage from './FullscreenImage';
// Strings
import { main_string } from '../../../assets/strings';
// Styles
import {
  mainCard,
  mainWidth,
} from '../../../assets/stylesheets/local/mainCardStyle';
import { styles } from '../../../assets/stylesheets/global/Style';
import Icon from '../../../assets/images/Icon';

export default ({ data, showDetail, showImageFull }) => {
  return (
    <View style={[mainCard.innerContainer, styles.horizontalCenter]}>
      <FullscreenImage
        source={{ uri: data.image }}
        title={data.title}
        style={mainCard.imgContainer}
      />
      <ShowInfo data={data} />
      <TouchableOpacity
        style={[mainCard.moreButton, styles.horizontalCenter]}
        onPress={showDetail}>
        <Text style={[mainCard.textVacancies]}>
          {data.vacancies > 0
            ? `${data.vacancies}${main_string.vacancies}`
            : main_string.full}
        </Text>
        <Icon src="ic_more" width={mainWidth.icMore} onPress={showDetail} />
      </TouchableOpacity>
    </View>
  );
};
