// Libraries
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
// Styles
import { goStyle } from '../../../assets/stylesheets/local/goPageStyle';
import { color_string } from '../../../assets/stylesheets/global/Color';
import {
  styles,
  container,
  navbar,
} from '../../../assets/stylesheets/global/Style';
// Actions
import { ModalAction } from '../../../reducers/Actions';
// Network
import { cancelTicket, checkCode } from '../../../network';
// Views
import _SquareButton from './_SquareButton';
import GreenNumbox from './GreenNumbox';
import ShowInfo from './ShowInfo';
// Strings
import { global_string, ticket_string } from '../../../assets/strings';
// Icons
import { ticket } from '../../../assets/images/Background';
import Icon from '../../../assets/images/Icon';

function GoCheckEnter({ isConfirmed, handleCode }) {
  return isConfirmed ? (
    <View style={styles.alignCenter}>
      <Icon
        src="ic_check"
        disabled={true}
        width={60}
        style={goStyle.confirm_icon}
      />
      <Text style={goStyle.check_text}>{ticket_string.entryConfirmed}</Text>
    </View>
  ) : (
    <View style={styles.alignCenter}>
      <GreenNumbox handleCode={handleCode} />
      <Text style={goStyle.check_text}>{ticket_string.showToStaff}</Text>
    </View>
  );
}

export default class ShowReservation extends Component {
  state = { code: '' };

  handleCode = text => this.setState({ code: text });
  render() {
    const { item, isKeyboardShow, dispatch } = this.props;
    const { ticket_data } = item;
    const isConfirmed = item.checked_at !== null;

    return (
      <View style={[styles.flex_1, styles.horizontalCenter]}>
        <ImageBackground
          source={ticket.filled}
          style={goStyle.background_size}
          imageStyle={goStyle.background_ticket}>
          <View style={container.contentContainer}>
            <ShowInfo data={ticket_data} />
            <View style={[goStyle.confirm_container, styles.alignCenter]}>
              <GoCheckEnter
                dataId={item.id}
                isConfirmed={isConfirmed}
                handleCode={this.handleCode}
              />
            </View>
          </View>
        </ImageBackground>
        {isKeyboardShow ? (
          <View style={goStyle.bottomContainer}>
            <_SquareButton
              backgroundColor={
                this.state.code.length >= 4
                  ? color_string.green_light
                  : color_string.gray_light
              }
              text={ticket_string.confirmEntry}
              disabled={this.state.code.length < 4}
              onPress={() => checkCode(this.state.code)(dispatch)}
            />
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.flex_1, styles.alignCenter]}
            onPress={() =>
              dispatch({
                type: ModalAction.SHOW_MODAL,
                data: {
                  type: 'select',
                  text: ticket_string.wannaCancelReservation,
                  buttonText: global_string.confirm,
                  onPress: () => cancelTicket(item.id)(dispatch),
                },
              })
            }>
            <Text style={goStyle.cancel_text}>
              {ticket_string.cancelReservation}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
