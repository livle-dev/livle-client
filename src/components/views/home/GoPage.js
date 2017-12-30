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
import { goStyle } from '../../../assets/stylesheets/local/goPageStyle';
import { color } from '../../../assets/stylesheets/global/Color';
// Views
import ShowReservation from '../partials/ShowReservation';
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

  render() {
    const { isKeyboardShow } = this.state;
    const { reservation, dispatch } = this.props;
    const hasItem = reservation.length > 0;

    return (
      <KeyboardAwareScrollView
        innerRef={ref => (this.scroll = ref)}
        style={styles.blackBackground}
        enableAutoAutomaticScroll={false}
        keyboardShouldPersistTaps="always">
        <View style={container.fullContainer}>
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
              itemWidth={width.full}
              inactiveSlideScale={1}
            />
          ) : (
            <NoReservation />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
