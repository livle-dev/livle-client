// Libraries
import React, { Component } from 'react';
import { View, Text, Platform, Keyboard, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Styles
import {
  styles,
  container,
  width,
} from '../../../assets/stylesheets/global/Style';
import {
  goStyle,
  width as goWidth,
} from '../../../assets/stylesheets/local/goPageStyle';
import { color } from '../../../assets/stylesheets/global/Color';
// Views
import ShowReservation from '../partials/ShowReservation';
// Action
import { AuthAction } from '../../../reducers/Actions';
// Function
import { isFuture } from '../../../assets/functions';
// String
import { ticket_string } from '../../../assets/strings';
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
          {ticket_string.noReservation}
          {'\n'}
          <Text style={color.green_light}>{ticket_string.bookTicket}</Text>
          {ticket_string.toEnjoyConcert}
        </Text>
      </View>
    </ImageBackground>
  );
}

export default class GoPage extends Component {
  constructor(props) {
    super(props);
    this.state = { isKeyboardShow: false };
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

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  componentWillUpdate(props, state) {
    const { reservation, auth, dispatch } = props;
    let data = { current: 0, next: 0 };
    reservation.forEach(item => {
      if (isFuture(auth.currentSubscription.to, item.ticketData.startAt))
        data.current = data.current + 1;
      else data.next = data.next + 1;
    });
    dispatch({
      type: AuthAction.UPDATE_USED_COUNT,
      data: data,
    });
  }

  compon

  render() {
    const { isKeyboardShow } = this.state;
    const { reservation, dispatch } = this.props;
    const hasItem = reservation.length > 0;
    // this.updateSessionData();

    return (
      <KeyboardAwareScrollView
        innerRef={ref => (this.scroll = ref)}
        style={styles.blackBackground}
        enableAutoAutomaticScroll={false}
        keyboardShouldPersistTaps="always">
        <View style={[goStyle.ticket_container, styles.alignCenter]}>
          {hasItem ? (
            <Carousel
              ref={c => (this.carousel = c)}
              data={reservation}
              renderItem={({ item }) => (
                <ShowReservation
                  item={item}
                  isKeyboardShow={isKeyboardShow}
                  dispatch={dispatch}
                />
              )}
              sliderWidth={width.full}
              itemWidth={goWidth.ticket + 2 * goWidth.ticketMargin}
              inactiveSlideScale={1}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <NoReservation />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
