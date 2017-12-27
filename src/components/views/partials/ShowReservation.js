// Libraries
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, Platform } from 'react-native';
// Styles
import { goStyle } from '../../../assets/stylesheets/local/goPageStyle';
import {
  styles,
  container,
  navbar,
} from '../../../assets/stylesheets/global/Style';
// Views
import GreenNumbox from './GreenNumbox';
import ShowInfo from './ShowInfo';
// Strings
import { go_string } from '../../../assets/strings';
// Icons
import { ticket } from '../../../assets/images/Background';
import Icon from '../../../assets/images/Icon';

function GoCheckEnter({ isConfirmed, dataId }) {
  return isConfirmed ? (
    <View style={styles.alignCenter}>
      <Icon
        src="ic_check"
        disabled={true}
        width={60}
        style={goStyle.confirm_icon}
      />
      <Text style={goStyle.check_text}>{go_string.entryConfirmed}</Text>
    </View>
  ) : (
    <View style={styles.alignCenter}>
      <GreenNumbox dataId={dataId} />
      <Text style={goStyle.check_text}>{go_string.showToStaff}</Text>
    </View>
  );
}

export default ({ item }) => {
  const { ticket_data, code } = item;
  const isConfirmed = item.checked_at !== null;

  return (
    <ImageBackground
      source={ticket.filled}
      style={goStyle.background_size}
      imageStyle={goStyle.background_ticket}>
      <View style={container.contentContainer}>
        <ShowInfo data={ticket_data} />
        <View style={[goStyle.confirm_container, styles.alignCenter]}>
          <GoCheckEnter dataId={data.id} isConfirmed={isConfirmed} />
        </View>
      </View>
    </ImageBackground>
  );
};
