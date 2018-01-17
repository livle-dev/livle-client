import { Platform, StyleSheet } from 'react-native';

export const font_style = StyleSheet.create({
  light: Platform.select({
    ios: {
      fontFamily: 'AppleSDGothicNeo-Light',
    },
    android: {
      fontFamily: 'Roboto-Light',
    },
  }),
  regular: Platform.select({
    ios: {
      fontFamily: 'AppleSDGothicNeo-Regular',
    },
    android: {
      fontFamily: 'Roboto-Regular',
    },
  }),
  semi_bold: Platform.select({
    ios: {
      fontFamily: 'AppleSDGothicNeo-SemiBold',
    },
    android: {
      fontFamily: 'Roboto-Medium',
    },
  }),
  bold: Platform.select({
    ios: {
      fontFamily: 'AppleSDGothicNeo-Bold',
    },
    android: {
      fontFamily: 'Roboto-Bold',
    },
  }),
});

export const font_size = StyleSheet.create({
  fs_48: { fontSize: 48 },
  fs_30: { fontSize: 30 },
  fs_28: { fontSize: 28 },
  fs_24: { fontSize: 24 },
  fs_20: { fontSize: 20 },
  fs_18: { fontSize: 18 },
  fs_16: { fontSize: 16 },
  fs_14: { fontSize: 14 },
  fs_12: { fontSize: 12 },
});
