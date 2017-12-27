import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  width_height_ratio,
  height_width_ratio,
} from '../stylesheets/global/Scale';

export const NAV_ICONS = [
  {
    // NAV_GO_ICON
    ON: require('./nav_go_on.png'),
    OFF: require('./nav_go_off.png'),
  },
  {
    // NAV_HOME_ICON
    ON: require('./nav_home_on.png'),
    OFF: require('./nav_home_off.png'),
  },
  {
    // NAV_SETTING_ICON
    ON: require('./nav_setting_on.png'),
    OFF: require('./nav_setting_off.png'),
  },
];

const icon_info = {
  ic_back: {
    source: require('./ic_back.png'),
    originWidth: 38,
    originHeight: 64,
  },
  ic_check_white: {
    source: require('./ic_check_white.png'),
    originWidth: 19,
    originHeight: 16,
  },
  ic_check: {
    source: require('./ic_check.png'),
    originWidth: 128,
    originHeight: 90,
  },
  ic_close: {
    source: require('./ic_close.png'),
    originWidth: 66,
    originHeight: 66,
  },
  ic_go_off: {
    source: require('./ic_go_off.png'),
    originWidth: 272,
    originHeight: 272,
  },
  ic_go_on: {
    source: require('./ic_go_on.png'),
    originWidth: 272,
    originHeight: 272,
  },
  ic_more: {
    source: require('./ic_more.png'),
    originWidth: 685,
    originHeight: 374,
  },
  ic_next: {
    source: require('./ic_next.png'),
    originWidth: 681,
    originHeight: 1195,
  },
  ic_pause: {
    source: require('./ic_pause.png'),
    originWidth: 70,
    originHeight: 116,
  },
  ic_play: {
    source: require('./ic_play.png'),
    originWidth: 90,
    originHeight: 132,
  },
  ic_ticket_blink: {
    source: require('./ic_ticket_blink.png'),
    originWidth: 137,
    originHeight: 66,
  },
  ic_top: {
    source: require('./ic_top.png'),
    originWidth: 201,
    originHeight: 201,
  },
  logo_livle: {
    source: require('./logo_livle.png'),
    originWidth: 2061,
    originHeight: 418,
  },
};

const Icon = ({
  src,
  iconStyle,
  width,
  height,
  disabled,
  onPress,
  ...options
}) => {
  const data = icon_info[src];
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.4}
      onPress={!disabled ? onPress : undefined}
      {...options}>
      <Image
        source={data.source}
        style={[
          {
            width:
              width ||
              height * width_height_ratio(data.originWidth, data.originHeight),
            height:
              height ||
              width * height_width_ratio(data.originWidth, data.originHeight),
          },
          StyleSheet.flatten(iconStyle),
        ]}
      />
    </TouchableOpacity>
  );
};

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  iconStyle: PropTypes.object,
  // width 또는 height 중 1개만 입력
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Icon;
