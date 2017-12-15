import { StyleSheet } from 'react-native';

const rgba = (rgb, opacity) => {
  let filter = rgb.replace(/#/g, '').split('');
  let color = [];
  for (let i = 0; i < 3; i++) {
    color[i] =
      parseInt(filter[i * 2], 16) * 16 + parseInt(filter[i * 2 + 1], 16);
  }
  return `rgba(${color[0]},${color[1]},${color[2]},${opacity})`;
};

/**
 *   clear: opacity 가 있는 색상
 **/
export const color = StyleSheet.create({
  // default
  white: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
  },
  black: {
    color: '#060c08',
    backgroundColor: 'transparent',
  },
  gray_light: {
    color: '#bababa',
    backgroundColor: 'transparent',
  },
  // blue
  blue_facebook: {
    color: '#1E396F',
    backgroundColor: 'transparent',
  },
  // red
  red: {
    color: '#FF0000',
    backgroundColor: 'transparent',
  },
  // green
  green_light: {
    color: '#47EFB2',
    backgroundColor: 'transparent',
  },
  green_light_clear: {
    color: rgba('#47EFB2', 0.3),
    backgroundColor: 'transparent',
  },
  green_aqua: {
    color: '#19E298',
    backgroundColor: 'transparent',
  },
  green_dark: {
    color: '#0F6B4A',
    backgroundColor: 'transparent',
  },
  green_deep: {
    color: '#163c3b',
    backgroundColor: 'transparent',
  },
  green_dark_dark: {
    color: '#082123',
    backgroundColor: 'transparent',
  },
});

export const color_string = {
  white: '#FFFFFF',
  gray_light: '#bababa',
  black: '#000000',
  black_opacity: rgba('#060c08', 0.5),
  black_clear: rgba('#060c08', 0.9),
  blue_facebook: '#1E396F',
  red: '#FF0000',
  green_light: '#47EFB2',
  green_light_clear: rgba('#47EFB2', 0.3),
  green_aqua: '#19E298',
  green_dark: '#0F6B4A',
  green_deep: '#163c3b',
  green_dark_dark: '#082123',
};
