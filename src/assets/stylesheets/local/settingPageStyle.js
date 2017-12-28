import { StyleSheet } from 'react-native';
import { percent } from '../global/Scale';
import { color, color_string } from '../global/Color';
import { font_size, font_style } from '../../fonts/Font';

export const settingHeight = {
  icNext: 18,
};

export const settingStyle = StyleSheet.create({
  // title
  titleContainer: {
    backgroundColor: color_string.green_dark_dark,
    height: 50,
  },
  titleText: StyleSheet.flatten([
    color.white,
    font_size.fs_4,
    font_style.semi_bold,
  ]),
  // content
  contentContainer: {
    marginTop: 36,
    marginBottom: 36,
  },
  contentTitleText: StyleSheet.flatten([
    color.gray_light,
    font_size.fs_2,
    font_style.regular,
  ]),
  contentValueText: StyleSheet.flatten([
    color.white,
    font_size.fs_2,
    font_style.regular,
  ]),
  numInputcontainer: {
    width: percent('width', 18),
    borderBottomWidth: 2,
    borderBottomColor: color_string.green_light,
  },
});

export const noticeStyle = StyleSheet.create({
  cardContainer: {
    marginTop: 24,
  },
  contentText: {
    marginTop: 20,
    ...StyleSheet.flatten([
      color.gray_light,
      font_size.fs_4,
      font_style.regular,
    ]),
  },
});
