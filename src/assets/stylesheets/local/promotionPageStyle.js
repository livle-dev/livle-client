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
  },
  // container
  gradientContainer: {
    height: percent('height', 100),
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
  // font
  textTitle: StyleSheet.flatten([
    color.white,
    font_size.fs_input_num,
    font_style.bold,
  ]),
  textContent: StyleSheet.flatten([
    color.white,
    font_size.fs_2,
    font_style.bold,
  ]),
  textPromotion: StyleSheet.flatten([
    color.white,
    font_size.fs_5,
    font_style.semi_bold,
  ]),
});
