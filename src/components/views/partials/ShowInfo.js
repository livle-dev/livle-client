// Libraries
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
// Functions
import { getTime } from '../../../assets/functions';
// Styles
import { mainCard } from '../../../assets/stylesheets/local/mainCardStyle';
import { styles } from '../../../assets/stylesheets/global/Style';

export default function({ data, showDate }) {
  const { title, artists, place, startAt, endAt } = data;

  return (
    <View style={[styles.flex_1, styles.alignCenter]}>
      <Text style={[mainCard.textTitle, styles.textCenter]}>{title}</Text>
      <Text style={[mainCard.textArtists, styles.textCenter]}>
        {artists.map((artist, i) => {
          return `${artist.name}${i + 1 < artists.length && ', '}`;
        })}
      </Text>
      {showDate && (
        <Text style={[mainCard.textDefault, styles.textCenter]}>
          {getTime(startAt).timestamp.format('MMMM, DD')}
        </Text>
      )}
      <Text style={[mainCard.textDefault, styles.textCenter]}>{place}</Text>
      <Text style={[mainCard.textDefault, styles.textCenter]}>
        {getTime(startAt).timestamp.format('hh : mm')}
        {' - '}
        {getTime(endAt).timestamp.format('hh : mm')}
      </Text>
    </View>
  );
}
