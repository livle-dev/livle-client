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

const CardConatiner = ({ index, title, children, onPress, subTitle }) => {
  return onPress ? (
    <TouchableOpacity
      style={[
        container.textContainer,
        styles.rowDirection,
        { marginTop: index > 0 ? 24 : 0 },
      ]}
      onPress={onPress}>
      <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
        {title}
        {subTitle && (
          <Text style={settingStyle.subTitleText}>
            {'\n'}
            {subTitle}
          </Text>
        )}
      </Text>
      {children}
    </TouchableOpacity>
  ) : (
    <View
      style={[
        container.textContainer,
        styles.rowDirection,
        { marginTop: index > 0 ? 24 : 0 },
      ]}>
      <Text style={[settingStyle.contentTitleText, styles.flex_1]}>
        {title}
        {subTitle && (
          <Text style={settingStyle.subTitleText}>
            {'\n'}
            {subTitle}
          </Text>
        )}
      </Text>
      {children}
    </View>
  );
};

const CardContent = ({ type, index, content, page }) => {
  const { title, value, option, navigation, subTitle, body } = content;

  switch (type) {
    case 'string':
      return (
        <CardConatiner title={title} index={index}>
          <Text style={settingStyle.contentValueText}>{value}</Text>
        </CardConatiner>
      );
    case 'toggle':
      return (
        <CardConatiner title={title} index={index}>
          <Switch onValueChange={option} value={value} />
        </CardConatiner>
      );
    case 'page':
      return (
        <CardConatiner
          title={title}
          index={index}
          subTitle={subTitle}
          onPress={() =>
            navigation.navigate(page, {
              title: title,
              body: body,
            })
          }>
          <Icon src="ic_next" height={settingHeight.icNext} />
        </CardConatiner>
      );
    default:
      return <CardConatiner title={title} index={index} />;
  }
};

CardContent.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  content: PropTypes.object.isRequired,
  page: PropTypes.string,
  /**
   *  Content objects
   *  title: PropTypes.string,
   *  value: PropTypes.any, //string or bool
   *  subTitle: PropTypes.string,
   *  option: PropTypes.func,
   *  navigation: PropTypes.any, //navigation page
   *  body: PropTypes.array,
   */
};

const _SettingCard = ({ title, type, contents, page, children }) => {
  return (
    <View style={styles.fullWidth}>
      <View style={[settingStyle.titleContainer, styles.verticalCenter]}>
        <Text style={[settingStyle.titleText, container.textContainer]}>
          {title}
        </Text>
      </View>
      <View style={settingStyle.contentContainer}>
        {contents.map((content, i) => (
          <CardContent
            type={type}
            index={i}
            content={content}
            page={page}
            key={i}
          />
        ))}
        {children}
      </View>
    </View>
  );
};

_SettingCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  contents: PropTypes.array.isRequired,
  page: PropTypes.string,
};

export default _SettingCard;
