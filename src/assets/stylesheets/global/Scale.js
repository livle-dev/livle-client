import { Dimensions, StatusBar, Platform } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

export const percent = (dir, percentage) => {
  //dir: width <-> height
  let value = dir == 'width' ? viewportWidth : viewportHeight;
  value *= percentage / 100;
  return Math.round(value);
};

export const width_height_ratio = (width, height) => {
  return width / height;
};
export const height_width_ratio = (width, height) => {
  return height / width;
};

export default (Scale = {
  // size
  ARTIST_PROFILE_SIZE: percent('width', 16.8),
  CIRCLE_BUTTON_SIZE: percent('width', 18),
  // width
  CALENDAR_ITEM_WIDTH: percent('width', 22),
  // height
  STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  NAVBAR_HEIGHT: percent('height', 13.58), //13.58%
  NAVBAR_ICON_HEIGHT: Math.round(percent('height', 13.58) * 0.32),
  CALANDER_HEIGHT: percent('height', 12),
});
