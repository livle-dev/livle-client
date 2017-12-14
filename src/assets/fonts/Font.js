import { Platform, StyleSheet } from 'react-native';

export const font_style = StyleSheet.create({
  light: {
    ...Platform.select({
      ios: {
        fontFamily: 'AppleSDGothicNeo-Light',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '300',
      },
    }),
  },
  regular: {
    ...Platform.select({
      ios: {
        fontFamily: 'AppleSDGothicNeo-Regular',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '400',
      },
    }),
  },
  semi_bold: {
    ...Platform.select({
      ios: {
        fontFamily: 'AppleSDGothicNeo-SemiBold',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '600',
      },
    }),
  },
  bold: {
    ...Platform.select({
      ios: {
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
      android: {
        fontFamily: 'Roboto',
        fontWeight: '700',
      },
    }),
  },
});

export const font_size = StyleSheet.create({
  fs_input_num: { fontSize: 48 },
  fs_calendar: { fontSize: 30 },
  fs_0: { fontSize: 28 },
  fs_title: { fontSize: 24 },
  fs_1: { fontSize: 20 },
  fs_2: { fontSize: 18 },
  fs_3: { fontSize: 16 },
  fs_4: { fontSize: 14 },
});
