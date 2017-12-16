import { StyleSheet, Platform } from 'react-native';
import Scale, { percent } from '../global/Scale';
import { color, color_string } from '../global/Color';
import { font_size, font_style } from '../../fonts/Font';

export const mainWidth = {
  icMore: 30,
  icCircle: Scale.CIRCLE_BUTTON_SIZE,
  innerContainer: percent('width', 88),
  innerPadding: percent('width', 4),
};
export const mainHeight = {
  card: Platform.select({
    ios:
      percent('height', 100) - (Scale.CALANDER_HEIGHT + Scale.STATUSBAR_HEIGHT),
    android: percent('height', 100) - Scale.CALANDER_HEIGHT,
  }),
};

export const mainCard = StyleSheet.create({
  innerContainer: {
    position: 'relative',
    width: mainWidth.innerContainer,
    height: mainHeight.card,
    paddingHorizontal: mainWidth.innerPadding,
  },
  // containers
  imgContainer: {
    width: percent('width', 84),
    height: percent('height', 38),
  },
  detailContainer: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: color_string.green_deep,
  },
  hoverButtonContainer: {
    position: 'absolute',
    bottom: percent('height', 6),
    right: 0,
  },
  // buttons
  moreButton: {
    marginBottom: 28,
  },
  // text styles
  textTitle: StyleSheet.flatten([color.white, font_size.fs_0, font_style.bold]),
  textArtists: {
    marginTop: 32,
    marginBottom: 16,
    ...StyleSheet.flatten([color.white, font_size.fs_3, font_style.semi_bold]),
  },
  textVacancies: {
    marginBottom: 16,
    ...StyleSheet.flatten([
      color.green_light,
      font_size.fs_1,
      font_style.semi_bold,
    ]),
  },
  textDefault: {
    marginTop: 8,
    ...StyleSheet.flatten([
      color.gray_light,
      font_size.fs_3,
      font_style.regular,
    ]),
  },
});
