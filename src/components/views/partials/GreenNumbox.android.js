// Libraries
import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
// Actions
import { ReservationAction } from '../../../reducers/Actions';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
import { font_style, font_size } from '../../../assets/fonts/Font';

function SingleNumbox({ inputRef, ...option }) {
  return (
    <TextInput
      style={[
        styles.textNumbox,
        font_style.regular,
        font_size.fs_input_num,
        color.white,
        { backgroundColor: color_string.green_light },
      ]}
      underlineColorAndroid="transparent"
      keyboardType="numeric"
      autoCapitalize="none"
      autoCorrect={false}
      selectionColor={'transparent'}
      ref={inputRef}
      {...option}
    />
  );
}

class GreenNumbox extends Component {
  state = {
    entryCode: '',
    textIndex: 0,
    value: [' ', ' ', ' ', ' '],
  };

  componentWillUpdate(props, state) {
    const { dataId, dispatch } = props;
    this.refs[state.textIndex].focus();

    dispatch({
      type: ReservationAction.ENTRY_NUMBER,
      id: dataId,
      code: state.entryCode,
    });
  }

  _updateData = text => {
    const { entryCode, textIndex, value } = this.state;
    let code, index;
    let sliceText = text.slice(-1);
    let updateValue = [...value];

    if (sliceText.length > 0) {
      code = entryCode + sliceText;
      index = textIndex < 3 ? textIndex + 1 : textIndex;
      updateValue[textIndex] = sliceText;
    } else {
      code = entryCode.slice(0, -1);
      if (entryCode.length === 4) {
        index = textIndex;
        updateValue[textIndex] = ' ';
      } else {
        index = 0 < textIndex ? textIndex - 1 : textIndex;
        updateValue[index] = ' ';
      }
    }

    this.setState({ entryCode: code, textIndex: index, value: updateValue });
  };

  _checkFocus = boxIndex => {
    const { textIndex } = this.state;
    if (textIndex !== boxIndex) this.refs[textIndex].focus();
  };

  render() {
    const { dataId, dispatch, ...option } = this.props;
    this.refs = [];

    return (
      <View style={[styles.rowDirection, { marginBottom: 32 }]} {...option}>
        <SingleNumbox
          inputRef={elem => (this.refs[0] = elem)}
          maxLength={2}
          value={this.state.value[0]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(0)}
        />
        <SingleNumbox
          inputRef={elem => (this.refs[1] = elem)}
          maxLength={2}
          value={this.state.value[1]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(1)}
        />
        <SingleNumbox
          inputRef={elem => (this.refs[2] = elem)}
          maxLength={2}
          value={this.state.value[2]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(2)}
        />
        <SingleNumbox
          inputRef={elem => (this.refs[3] = elem)}
          maxLength={this.state.entryCode.length >= 4 ? 1 : 2}
          value={this.state.value[3]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(3)}
        />
      </View>
    );
  }
}

export default connect()(GreenNumbox);
