// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
// View
import PromotionPage from '../views/home/PromotionPage';
import SubscribePage from '../views/home/SubscribePage';
// Navigations
import HomeNavigation from './home/HomeNavigation';
import LoginNavigation from './login/LoginNavigation';
// Networks
import { checkSession } from '../../network';
// Actions
import { LoadingAction } from '../../reducers/Actions';

// Config
export const AppScreen = StackNavigator(
  {
    Home: { screen: HomeNavigation },
    Login: { screen: LoginNavigation },
    Promotion: { screen: PromotionPage },
    Subscribe: { screen: SubscribePage },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
);

const UNMOUNT = 'UNMOUNT';

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.state = { isChecked: false };

    dispatch({ type: LoadingAction.SHOW_LOADING });
    checkSession(dispatch);
  }

  componentWillReceiveProps(props) {
    if (!this.state.isChecked && props.auth.isLoggedIn !== UNMOUNT) {
      this.setState({ isChecked: true });
    }
  }

  render() {
    const { dispatch, navState } = this.props;
    return this.state.isChecked ? (
      <AppScreen
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navState,
        })}
      />
    ) : null;
  }
}

const mapStateToProps = state => {
  return { navState: state.appReducer, auth: state.auth };
};

export default connect(mapStateToProps)(AppNavigation);
