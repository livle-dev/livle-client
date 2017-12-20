// Libraries
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
// Actions
import { ReservationAction } from '../../../reducers/Actions';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
import { font_style, font_size } from '../../../assets/fonts/Font';

class GreenNumbox extends Component {
  _updateData = text => {
    const { dataId, dispatch } = this.props;

    dispatch({
      type: ReservationAction.ENTRY_NUMBER,
      id: dataId,
      code: text,
    });
  };

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
        onChangeText={this._updateData}
      />
    );
  }
}

export default connect()(GreenNumbox);
