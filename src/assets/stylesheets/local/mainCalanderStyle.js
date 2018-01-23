import { StyleSheet } from 'react-native';
import Scale, { percent } from '../global/Scale';
import { color, color_string } from '../global/Color';
import { font_size, font_style } from '../../fonts/Font';

const HEIGHT = {
  container: Scale.CALANDER_HEIGHT,
};

export const calendarStyle = StyleSheet.create({
  calendarContainer: {
    alignSelf: 'stretch',
    height: HEIGHT.container,
    backgroundColor: color_string.green_dark_dark,
  },
  // text styles
  dateText: StyleSheet.flatten([
    color.green_light,
    font_size.fs_30,
    font_style.bold,
  ]),
  dayText: StyleSheet.flatten([
    color.green_light,
    font_size.fs_16,
    font_style.bold,
  ]),
  deactivate: StyleSheet.flatten(color.gray_light),
});
