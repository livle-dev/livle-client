import { StyleSheet } from 'react-native';
import Scale, { percent } from '../global/Scale';
import { color, color_string } from '../global/Color';
import { font_size, font_style } from '../../fonts/Font';

const height = {
  container: percent('height', 12),
};

const containerOption = {
  position: 'absolute',
  left: 0,
  right: 0,
  height: height.container,
  paddingHorizontal: 24,
};

export const fullscreenStyle = StyleSheet.create({
  dismissContainer: {
    top: 0,
    paddingTop: Scale.STATUSBAR_HEIGHT,
    ...containerOption,
  },
  infoContainer: {
    bottom: 0,
    ...containerOption,
  },
});
