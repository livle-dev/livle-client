// Libraries
import React from 'react';
import { View, TouchableOpacity, Switch, Text } from 'react-native';
import PropTypes from 'prop-types';
// Styles
import { styles, container } from '../../../assets/stylesheets/global/Style';
import {
  settingStyle,
  settingHeight,
} from '../../../assets/stylesheets/local/settingPageStyle';
// Icons
import Icon from '../../../assets/images/Icon';

const CardContent = ({ type, index, content }) => {
  const { title, value, option, navigation, body } = content;

  switch (type) {
    case 'string':
      return (
        <View
          style={[
            container.textContainer,
            styles.rowDirection,
            { marginTop: index > 0 ? 24 : 0 },
          ]}>
          <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
            {title}
          </Text>
          <Text style={settingStyle.contentValueText}>{value}</Text>
        </View>
      );
    case 'toggle':
      return (
        <View
          style={[
            container.textContainer,
            styles.rowDirection,
            { marginTop: index > 0 ? 24 : 0 },
          ]}>
          <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
            {title}
          </Text>
          <Switch onValueChange={option} value={value} />
        </View>
      );
    case 'page':
      return (
        <TouchableOpacity
          style={[
            container.textContainer,
            styles.rowDirection,
            { marginTop: index > 0 ? 24 : 0 },
          ]}
          onPress={() => {
            return navigation.navigate('Membership', {
              title: title,
              body: body,
            });
          }}>
          <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
            {title}
          </Text>
          <Icon src="ic_next" height={settingHeight.icNext} />
        </TouchableOpacity>
      );
    case 'blink':
      return (
        <TouchableOpacity
          style={[
            container.textContainer,
            styles.rowDirection,
            { marginTop: index > 0 ? 24 : 0 },
          ]}
          onPress={() => {
            return navigation.navigate('Notice', {
              title: title,
              body: body,
            });
          }}>
          <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
            {title}
          </Text>
          <Icon src="ic_next" height={settingHeight.icNext} />
        </TouchableOpacity>
      );
  }
};

CardContent.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,

  // Content objects
  title: PropTypes.string,
  value: PropTypes.any, //string or bool
  option: PropTypes.func,
  navigation: PropTypes.any, //navigation page
  body: PropTypes.array,
  index: PropTypes.number,
};

const _SettingCard = ({ title, type, contents, children }) => {
  return (
    <View style={styles.fullWidth}>
      <View style={[settingStyle.titleContainer, styles.verticalCenter]}>
        <Text style={[settingStyle.titleText, container.textContainer]}>
          {title}
        </Text>
      </View>
      <View style={settingStyle.contentContainer}>
        {contents.map((content, i) => {
          return (
            <CardContent type={type} index={i} key={i} content={content} />
          );
        })}
        {children}
      </View>
    </View>
  );
};

_SettingCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
};

export default _SettingCard;
