import { StyleSheet, Platform } from 'react-native';
import { percent, height_width_ratio } from '../global/Scale';
import { font_size, font_style } from '../../fonts/Font';
import { color_string, color } from '../global/Color';

// const options
export const width = {
  ticket: percent('width', 84.5),
  ticketMargin: percent('width', 2),
};
export const goStyle = StyleSheet.create({
  // containers
  ticket_container: {
    height: percent('height', 100),
  },
  confirm_container: {
    height: width.ticket * height_width_ratio(350, 219),
    backgroundColor: 'transparent',
  },
  confirm_icon: {
    marginBottom: 32,
  },
  // buttons
  bottomContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 8,
  },
  // backgrounds
  background_size: {
    width: width.ticket,
    height: width.ticket * height_width_ratio(1056, 1911),
    marginHorizontal: width.ticketMargin,
  },
  background_ticket: {
    resizeMode: 'cover',
  },
  // texts
  check_text: StyleSheet.flatten([
    font_size.fs_18,
    font_style.semi_bold,
    color.green_light,
  ]),
  no_reservation_text: StyleSheet.flatten([
    font_size.fs_18,
    font_style.bold,
    color.white,
  ]),
  cancel_text: StyleSheet.flatten([
    font_size.fs_20,
    font_style.semi_bold,
    color.white,
  ]),
});
