// Libraries
import React from 'react';
import { View, FlatList, Image, Text } from 'react-native';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import Scale from '../../../assets/stylesheets/global/Scale';

export const Profile = props => {
  const { profile, name, ...option } = props;
  return (
    <View {...option}>
      <Image style={styles.profileImg} source={{ uri: profile }} />
      <Text
        style={[
          styles.textDefault,
          styles.textCenter,
          { width: Scale.ARTIST_PROFILE_SIZE },
        ]}>
        {name}
      </Text>
    </View>
  );
};

const ArtistProfile = ({ artists }) => {
  return (
    <FlatList
      data={artists}
      keyExtractor={(item, index) => 'artist_' + index}
      showsHorizontalScrollIndicator={false}
      numColumns={3}
      renderItem={({ item, index }) => {
        return (
          <Profile
            name={item.name}
            profile={item.image}
            style={index % 3 !== 0 ? { marginLeft: 20 } : {}}
          />
        );
      }}
    />
  );
};

export default ArtistProfile;
