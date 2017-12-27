import { StyleSheet, StatusBar, Platform, Dimensions } from 'react-native';
import Scale, { percent, height_width_ratio } from './Scale';
import { color, color_string } from './Color';
import { font_size, font_style } from '../../fonts/Font';

// for all components
export const width = {
  full: percent('width', 100),
  logo: percent('width', 49.1),
  wrapContainer: percent('width', 72.4),
  defaultPadding: 24,
};
export const height = {
  button: 60,
  messagebar: Platform.select({
    ios: Scale.STATUSBAR_HEIGHT + percent('height', 4),
    android: percent('height', 4),
  }),
};
export const styles = StyleSheet.create({
  // flex_options
  flex_1: {
    flex: 1,
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  horizontalCenter: {
    alignItems: 'center',
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  horizontalRight: {
    alignItems: 'flex-end',
  },
  rowDirection: {
    flexDirection: 'row',
  },
  displayNone: {
    width: 0,
    height: 0,
  },
  // text_options
  textCenter: {
    textAlign: 'center',
  },
  textInput: {
    width: width.wrapContainer,
    ...Platform.select({
      ios: {
        height: 36,
      },
    }),
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: color_string.green_light,
  },
  numBox: {
    width: 50,
    height: 50,
    textAlign: 'center',
    paddingVertical: 0,
    borderRadius: 3,
    marginHorizontal: 6,
  },
  numContainer: {
    alignSelf: 'stretch',
    height: 58,
    textAlign: 'center',
    paddingVertical: 0,
    borderRadius: 3,
    marginHorizontal: 6,
    marginBottom: 32,
  },
  textDefault: {
    ...StyleSheet.flatten([color.white, font_size.fs_3, font_style.semi_bold]),
  },
  textError: {
    ...StyleSheet.flatten([
      color.green_light,
      font_size.fs_5,
      font_style.light,
    ]),
  },
  textTitle: {
    ...StyleSheet.flatten([
      color.white,
      font_size.fs_title,
      font_style.semi_bold,
    ]),
  },
  // backgrounds
  blackBackground: {
    flex: 1,
    backgroundColor: color_string.black,
  },
  modalBackground: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: color_string.black_opacity,
  },
  // icons & logos & images
  navbarLogo: {
    width: percent('width', 42),
    height: Scale.NAVBAR_ICON_HEIGHT,
    resizeMode: 'contain',
  },
  profileImg: {
    width: Scale.ARTIST_PROFILE_SIZE,
    height: Scale.ARTIST_PROFILE_SIZE,
    borderRadius: Scale.ARTIST_PROFILE_SIZE / 2,
    marginVertical: 12,
  },
  // buttons
  buttonDefault: {
    flex: 1,
    height: height.button,
    borderRadius: 3,
    marginVertical: 10,
  },
});

export const container = {
  // containers
  fullContainer: {
    position: 'relative',
    width: width.full,
    height: percent('height', 100),
  },
  navbarContainer: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    height: Scale.NAVBAR_HEIGHT,
    paddingTop: Scale.STATUSBAR_HEIGHT,
    backgroundColor: color_string.black_clear,
  },
  messagebarContainer: {
    position: 'absolute',
    zIndex: 999,
    left: 0,
    right: 0,
    width: width.full,
    height: height.messagebar,
    backgroundColor: color_string.green_light,
    paddingTop: Platform.select({ ios: Scale.STATUSBAR_HEIGHT, android: 0 }),
  },
  modalContainer: {
    width: percent('width', 88),
    height: percent('height', 38),
    backgroundColor: color_string.black_clear,
    borderWidth: 2,
    borderColor: color_string.white,
    borderRadius: 3,
    paddingHorizontal: width.defaultPadding,
  },
  iconContainer: {
    flex: 1,
    height: Scale.NAVBAR_ICON_HEIGHT,
    flexDirection: 'column',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingTop: Scale.NAVBAR_HEIGHT - Scale.STATUSBAR_HEIGHT,
    paddingHorizontal: width.defaultPadding,
  },
  wrapContainer: {
    width: width.wrapContainer,
  },
  textContainer: {
    paddingHorizontal: width.defaultPadding,
  },
  textInputContainer: {
    width: width.wrapContainer,
    marginBottom: 14,
  },
  topTitleContainer: {
    position: 'absolute',
    zIndex: 99,
    top: 0,
    left: 0,
    right: 0,
    height: Scale.NAVBAR_HEIGHT,
    paddingTop: Scale.STATUSBAR_HEIGHT,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Scale.NAVBAR_HEIGHT,
    paddingTop: Scale.STATUSBAR_HEIGHT,
    paddingHorizontal: width.defaultPadding,
  },
};

export const navbar = {
  navbarArea: {
    height: Scale.NAVBAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navbarAreaFit: {
    height: Platform.select({
      ios: Scale.NAVBAR_HEIGHT - Scale.STATUSBAR_HEIGHT,
      android: Scale.NAVBAR_HEIGHT,
    }),
    backgroundColor: color_string.black,
  },
};
