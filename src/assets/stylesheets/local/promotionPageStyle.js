import { StyleSheet } from 'react-native';
import Scale, { percent, height_width_ratio } from '../global/Scale';
import { font_size, font_style } from '../../fonts/Font';
import { color_string, color } from '../global/Color';

export const promotionStyle = StyleSheet.create({
  gradientContainer: {
    height: percent('height', 100),
    paddingTop: Scale.NAVBAR_HEIGHT,
    backgroundColor: color_string.green_light,
  },
  defaultContainer: {
    height: percent('height', 100),
    paddingTop: Scale.NAVBAR_HEIGHT,
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
});
