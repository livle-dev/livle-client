// Libraries
import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
// Actions
import { NavbarAction } from '../../../reducers/Actions';
// Icon
import Icon from '../../../assets/images/Icon';
// Styles
import {
  styles,
  container,
  navbar,
} from '../../../assets/stylesheets/global/Style';
import { color_string } from '../../../assets/stylesheets/global/Color';

const StackPage = props => {
  const {
    title,
    navigation,
    containerStyle,
    isTransparent,
    disablePadding,
    disableBack,
    disableScroll,
    hideNavbar,
    children,
  } = props;
  if (hideNavbar) navigation.dispatch({ type: NavbarAction.DISABLE_NAVBAR });

  return (
    <View style={[styles.blackBackground, containerStyle]}>
      <View
        style={[
          container.topTitleContainer,
          {
            backgroundColor: isTransparent
              ? 'transparent'
              : color_string.black_clear,
          },
        ]}>
        <View style={[styles.flex_1, styles.alignCenter]}>
          <Text style={styles.textTitle}>{title}</Text>
        </View>
        {disableBack ? null : (
          <Icon
            src="ic_back"
            height={24}
            style={[container.backButtonContainer, styles.verticalCenter]}
            onPress={() => {
              navigation.goBack();
              if (hideNavbar)
                navigation.dispatch({ type: NavbarAction.ENABLE_NAVBAR });
            }}
          />
        )}
      </View>
      {disableScroll ? (
        children
      ) : (
        <ScrollView
          style={[styles.flex_1, !disablePadding && container.textContainer]}>
          {!isTransparent && <View style={navbar.navbarAreaFit} />}
          {children}
        </ScrollView>
      )}
    </View>
  );
};

StackPage.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.any.isRequired,
  containerStyle: PropTypes.any,
  isTransparent: PropTypes.bool,
  disableBack: PropTypes.bool,
  disablePadding: PropTypes.bool,
  disableScroll: PropTypes.bool,
  hideNavbar: PropTypes.bool,
};

export default StackPage;
