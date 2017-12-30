// Libraries
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
// Actions
import { TicketAction } from '../../../reducers/Actions';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
import { font_style, font_size } from '../../../assets/fonts/Font';

export default class GreenNumbox extends Component {
  _updateStatus = text => this.props.handleCode(text);
  render() {
    return (
      <TextInput
        style={[
          styles.numContainer,
          font_style.regular,
          font_size.fs_input_num,
          color.white,
          { backgroundColor: color_string.green_light },
        ]}
        underlineColorAndroid="transparent"
        keyboardType="numeric"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={4}
        selectionColor={'transparent'}
        onChangeText={this._updateStatus}
      />
    );
  }
}
