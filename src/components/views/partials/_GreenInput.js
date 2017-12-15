// Libraries
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
import { font_style, font_size } from '../../../assets/fonts/Font';

const _GreenInput = props => {
  const { placeholder, onChangeText, errorMessage, ...ect } = props;

  return (
    <View style={[styles.horizontalRight, container.textInputContainer]}>
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
      <Text style={styles.textError}>{errorMessage || ''}</Text>
    </View>
  );
};

_GreenInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default _GreenInput;
