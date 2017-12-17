// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
// Navigations
import HomeNavigation from './home/HomeNavigation';
import LoginNavigation from './login/LoginNavigation';
// Networks
import { checkSession } from '../../network';

// Config
export const AppScreen = StackNavigator(
  {
    Home: { screen: HomeNavigation },
    Login: { screen: LoginNavigation },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
);

const mapStateToProps = state => {
  return {
    navState: state.appReducer,
  };
};

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    checkSession(props.dispatch);
  }

  render() {
    const { dispatch, navState } = this.props;

    return (
      <AppScreen
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(AppNavigation);
