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

function SingleNumbox({ inputRef, ...option }) {
  return (
    <TextInput
      style={[
        styles.numBox,
        font_style.regular,
        font_size.fs_input_num,
        color.white,
      ]}
      keyboardType="numeric"
      autoCapitalize="none"
      autoCorrect={false}
      maxLength={1}
      selectionColor="transparent"
      ref={inputRef}
      {...option}
    />
  );
}

class GreenNumbox extends Component {
  state = {
    entryCode: '',
    textIndex: 0,
    value: ['', '', '', ''],
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
    // Filter: 입력중 || 글자 삭제[-1]
    const { entryCode, textIndex, value } = this.state;
    let code, index;
    let updateValue = [...value];

    if (text.length > 0) {
      code = entryCode + text;
      index = textIndex < 3 ? textIndex + 1 : textIndex;
      updateValue[textIndex] = text;
    } else if (entryCode.length === 4) {
      code = entryCode.slice(0, -1);
      index = textIndex;
      updateValue[textIndex] = '';
    }

    this.setState({
      entryCode: code || entryCode,
      textIndex: index || textIndex,
      value: updateValue,
    });
  };

  _checkFocus = boxIndex => {
    const { textIndex } = this.state;
    if (textIndex !== boxIndex) this.refs[textIndex].focus();
  };

  _handleBackspace = e => {
    // Filter: 글자 삭제[0, -1]
    const { key } = e.nativeEvent;
    const { entryCode, textIndex, value } = this.state;
    let updateValue = [...value];

    if (entryCode.length < 4 && key === 'Backspace') {
      const index = 0 < textIndex ? textIndex - 1 : textIndex;
      updateValue[index] = '';

      this.setState({
        entryCode: entryCode.slice(0, -1),
        textIndex: index,
        value: updateValue,
      });
    }
  };

  render() {
    const { dataId, dispatch, ...option } = this.props;
    this.refs = [];

    return (
      <View style={[styles.rowDirection, { marginBottom: 32 }]} {...option}>
        <SingleNumbox
          inputRef={elem => (this.refs[0] = elem)}
          value={this.state.value[0]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(0)}
          onKeyPress={this._handleBackspace}
        />
        <SingleNumbox
          inputRef={elem => (this.refs[1] = elem)}
          value={this.state.value[1]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(1)}
          onKeyPress={this._handleBackspace}
        />
        <SingleNumbox
          inputRef={elem => (this.refs[2] = elem)}
          value={this.state.value[2]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(2)}
          onKeyPress={this._handleBackspace}
        />
        <SingleNumbox
          inputRef={elem => (this.refs[3] = elem)}
          value={this.state.value[3]}
          onChangeText={this._updateData}
          // callback
          onFocus={() => this._checkFocus(3)}
          onKeyPress={this._handleBackspace}
        />
      </View>
    );
  }
}

export default connect()(GreenNumbox);
