// Libraries
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';
// Icon
import Icon from '../../../assets/images/Icon';

const TopTitle = ({ title, onPress, disableBack, isTransparent }) => (
  <View
    style={[
      styles.topTitleContainer,
      {
        backgroundColor: isTransparent ? 'transparent' : color_string.black,
      },
    ]}
  >
    <View style={[styles.flex_1, styles.alignCenter]}>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
    {disableBack ? null : (
      <Icon
        src="ic_back"
        height={24}
        style={[container.backButtonContainer, styles.verticalCenter]}
        onPress={onPress}
      />
    )}
  </View>
);

TopTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disableBack: PropTypes.bool,
  isTransparent: PropTypes.bool,
};

export default TopTitle;
