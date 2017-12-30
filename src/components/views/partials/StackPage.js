// Libraries
import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
// Views
import TopTitle from './TopTitle';
// Actions
import { NavbarAction } from '../../../reducers/Actions';
// Styles
import { styles, navbar } from '../../../assets/stylesheets/global/Style';

export default class StackPage extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    props.navigation.dispatch({ type: NavbarAction.DISABLE_NAVBAR });
  }

  render() {
    const { title, navigation, children } = this.props;
    return (
      <View style={styles.flex_1}>
        <TopTitle
          title={title}
          onPress={() => {
            navigation.dispatch({ type: NavbarAction.ENABLE_NAVBAR });
            navigation.goBack();
          }}
        />
        <View style={navbar.navbarAreaFit} />
        {children}
      </View>
    );
  }
}
