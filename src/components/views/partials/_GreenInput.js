// Libraries
import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
import { font_style, font_size } from '../../../assets/fonts/Font';

const _GreenInput = props => {
  const { placeholder, onChangeText, errorMessage, ...ect } = props;

  return (
    <TextInput
      style={[
        styles.textInput,
        font_style.regular,
        font_size.fs_2,
        color.white,
      ]}
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      placeholderTextColor={color_string.green_light_clear}
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={onChangeText}
      {...ect}
    />
  );
};

_GreenInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default _GreenInput;
