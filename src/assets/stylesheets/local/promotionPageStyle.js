import { StyleSheet } from 'react-native';
import { height } from '../global/Style';
import Scale, { percent, height_width_ratio } from '../global/Scale';
import { font_size, font_style } from '../../fonts/Font';
import { color_string, color } from '../global/Color';

const width = {
  promotion: 120,
  ticket: percent('width', 80),
};

export const promotionStyle = StyleSheet.create({
  background: {
    resizeMode: 'cover',
  },
  // margin
  iconMargin: {
    marginBottom: 8,
  },
  blinkMargin: {
    marginTop: percent('height', 9),
  },
  ticketRowMargin: {
    marginVertical: 8,
  },
  // size
  button: {
    height: height.button + 20,
  },
  promotionSize: {
    width: width.promotion,
    height: width.promotion * height_width_ratio(120, 27),
    marginBottom: percent('height', 11),
  },
  ticketSize: {
    width: width.ticket,
    height: width.ticket * height_width_ratio(327, 172),
    marginBottom: percent('height', 8),
    paddingLeft: percent('width', 17),
  },
  // container
  gradientContainer: {
    height: percent('height', 90),
    backgroundColor: color_string.green_light,
  },
  infoContainer: {
    height: percent('height', 52),
  },
  buttonContainer: {
    height: percent('height', 28),
    borderTopWidth: 1,
    borderTopColor: color_string.green_deep,
  },
  ticketContainer: {
    paddingLeft: percent('width', 11),
    alignSelf: 'stretch',
    flex: 1,
  },
  // font
  textTitle: StyleSheet.flatten([
    color.white,
    font_size.fs_48,
    font_style.bold,
  ]),
  textTicket: StyleSheet.flatten([
    color.white,
    font_size.fs_14,
    font_style.regular,
  ]),
  textContent: StyleSheet.flatten([
    color.white,
    font_size.fs_18,
    font_style.bold,
  ]),
  textPromotion: StyleSheet.flatten([
    color.white,
    font_size.fs_12,
    font_style.semi_bold,
  ]),
});
