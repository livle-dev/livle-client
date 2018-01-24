// Libraries
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { font_style, font_size } from '../../../assets/fonts/Font';
import { color } from '../../../assets/stylesheets/global/Color';

const _SquareButton = ({
  backgroundColor,
  text,
  onPress,
  disabled,
  index,
  ...option
}) => (
  <TouchableOpacity
    style={[
      styles.buttonDefault,
      styles.alignCenter,
      {
        backgroundColor: backgroundColor,
        marginLeft: (index || 0) > 0 ? 20 : 0,
      },
    ]}
    activeOpacity={disabled ? 1 : 0.4}
    onPress={!disabled ? onPress : undefined}
    {...option}>
    <Text style={[font_style.semi_bold, font_size.fs_18, color.white]}>
      {text}
    </Text>
  </TouchableOpacity>
);

_SquareButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  index: PropTypes.number, // direction이 row 일 때 입력
};

export default _SquareButton;
