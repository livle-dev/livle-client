import React from 'react';
import Video from 'react-native-video';
import { container } from '../../../assets/stylesheets/global/Style';
import { video } from '../../../assets/images/Background';

export default () => (
  <Video
    source={video}
    repeat
    resizeMode="cover"
    style={container.absoluteContainer}
  />
);
