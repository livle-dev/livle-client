// Libraries
import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Styles
import {
  styles,
  container,
  width,
} from '../../../assets/stylesheets/global/Style';
import { goStyle } from '../../../assets/stylesheets/local/goPageStyle';
import { color, color_string } from '../../../assets/stylesheets/global/Color';
// Actions
import { TicketAction, MessageBarAction } from '../../../reducers/Actions';
// Network
import { cancelTicket } from '../../../network';
// Views
import ShowReservation from '../partials/ShowReservation';
import _SquareButton from '../partials/_SquareButton';
// String
import { go_string } from '../../../assets/strings';
// Icons
import { ticket } from '../../../assets/images/Background';
import Icon from '../../../assets/images/Icon';

function NoReservation() {
  return (
    <ImageBackground
      source={ticket.empty}
      style={goStyle.background_size}
      imageStyle={goStyle.background_ticket}>
      <View style={[container.contentContainer, styles.alignCenter]}>
        <Icon
          src={'logo_livle'}
          width={width.logo}
          iconStyle={{ marginBottom: 80 }}
          disabled={true}
        />
        <Text style={[goStyle.no_reservation_text, styles.textCenter]}>
          {go_string.noReservation}
          {'\n'}
          <Text style={color.green_light}>{go_string.bookTicket}</Text>
          {go_string.toEnjoyConcert}
        </Text>
      </View>
    </ImageBackground>
  );
}

export default class GoPage extends Component {
  constructor(props) {
    super(props);
    this.state = { curIndex: 0, isKeyboardShow: false };

    // KEYBOARD
    this.keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      e => {
        const keyboardHeight = e.endCoordinates.height;
        this.scroll.props.scrollToPosition(0, keyboardHeight);
        this.setState({ isKeyboardShow: true });
      }
    );
    this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this.setState({ isKeyboardShow: false })
    );
  }

  componentWillUpdate(props, state) {
    const { curIndex } = state;
    const itemLength = props.reservation.length;
    if (itemLength > 0 && curIndex >= itemLength)
      this.setState({ curIndex: curIndex - 1 });
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  render() {
    const { curIndex, isKeyboardShow } = this.state;
    const { reservation, dispatch } = this.props;
    const hasItem = reservation.length > 0;

    return (
      <KeyboardAwareScrollView
        innerRef={ref => (this.scroll = ref)}
        style={styles.blackBackground}
        enableAutoAutomaticScroll={false}>
        <View style={container.fullContainer}>
          <View style={styles.horizontalCenter}>
            {hasItem ? (
              <Carousel
                ref={c => (this.carousel = c)}
                data={reservation}
                renderItem={({ item }) => <ShowReservation item={item} />}
                sliderWidth={width.full}
                itemWidth={width.full}
                inactiveSlideScale={1}
                // callback
                onSnapToItem={index => this.setState({ curIndex: index })}
              />
            ) : (
              <NoReservation />
            )}
          </View>

          {hasItem &&
            isKeyboardShow && (
              <View style={goStyle.bottomContainer}>
                <_SquareButton
                  backgroundColor={
                    [curIndex].code.length >= 4
                      ? color_string.green_light
                      : color_string.gray_light
                  }
                  text={go_string.confirmEntry}
                  disabled={reservation[curIndex].code.length < 4}
                  onPress={() => {}}
                />
              </View>
            )}
          {hasItem &&
            !isKeyboardShow && (
              <TouchableOpacity
                style={[styles.flex_1, styles.alignCenter]}
                onPress={() => {
                  cancelTicket(reservation[curIndex].id)(dispatch);
                }}>
                <Text style={goStyle.cancel_text}>
                  {go_string.cancelReservation}
                </Text>
              </TouchableOpacity>
            )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
