// Libraries
import React from 'react';
import { View, ScrollView, FlatList, Text } from 'react-native';
import PropTypes from 'prop-types';
// Views
import StackPage from '../partials/StackPage';
// Styles
import { styles } from '../../../assets/stylesheets/global/Style';
import { noticeStyle } from '../../../assets/stylesheets/local/settingPageStyle';

const SettingNoticePage = ({ navigation }) => {
  const { title, body } = navigation.state.params;
  return (
    <StackPage title={title} navigation={navigation} hideNavbar>
      <FlatList
        data={body}
        keyExtractor={(item, index) => item.title}
        renderItem={({ item }) => (
          <View style={noticeStyle.cardContainer}>
            <Text style={styles.textDefault}>{item.title}</Text>
            <Text style={noticeStyle.contentText}>{item.text}</Text>
          </View>
        )}
      />
    </StackPage>
  );
};

SettingNoticePage.propTypes = {
  navigation: PropTypes.any.isRequired,
  title: PropTypes.string,
  body: PropTypes.array,
};

export default SettingNoticePage;
