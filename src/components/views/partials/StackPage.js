// Libraries
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Text,
} from 'react-native';
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

export default class StackPage extends Component {
  state = { showNavbar: false };

  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.any.isRequired,
    containerStyle: PropTypes.any,
    isTransparent: PropTypes.bool,
    disablePadding: PropTypes.bool,
    disableScroll: PropTypes.bool,
    hideNavbar: PropTypes.bool,
  };

  goBack = () => {
    const { hideNavbar, navigation } = this.props;
    if (hideNavbar) {
      navigation.dispatch({ type: NavbarAction.ENABLE_NAVBAR });
      this.setState({ showNavbar: true });
    }
    navigation.goBack();
  };

  componentWillMount() {
    const { hideNavbar, navigation } = this.props;
    if (hideNavbar) navigation.dispatch({ type: NavbarAction.DISABLE_NAVBAR });

    BackHandler.addEventListener('hardwareBackPress', () => this.goBack());
  }

  componentWillUnmount() {
    const { hideNavbar, navigation } = this.props;
    if (hideNavbar && !this.state.showNavbar)
      navigation.dispatch({ type: NavbarAction.ENABLE_NAVBAR });
  }

  render() {
    const {
      title,
      containerStyle,
      isTransparent,
      disablePadding,
      disableScroll,
      children,
    } = this.props;
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
          <Icon
            src="ic_back"
            height={24}
            style={[container.backButtonContainer, styles.verticalCenter]}
            onPress={() => this.goBack()}
          />
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
  }
}
