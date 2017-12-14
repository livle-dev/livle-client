import { StyleSheet } from 'react-native';
import { color } from '../global/Color';
import { font_size, font_style } from '../../fonts/Font';
import { percent } from '../global/Scale';

export const loginStyle = StyleSheet.create({
  textButton: {
    position: 'absolute',
    bottom: percent('height', 7.5),
  },
  defaultText: StyleSheet.flatten([
    color.green_light,
    font_size.fs_2,
    font_style.reqular,
  ]),
  boldText: StyleSheet.flatten([font_style.bold]),
});
