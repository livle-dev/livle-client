import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/stylesheets/global/Style';

export default ({ uri }) => {
  return (
    <View style={styles.alignCenter}>
      <Image src={{ uri: uri }} />
    </View>
  );
};
