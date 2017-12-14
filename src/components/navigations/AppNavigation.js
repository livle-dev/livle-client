// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
// Navigations
import HomeNavigation from './home/HomeNavigation';
import { LoginScreen } from './login/LoginNavigation';
// Networks
import { checkSession } from '../../network';

// Config
export const AppScreen = StackNavigator(
  {
    Home: { screen: HomeNavigation },
    Login: { screen: LoginScreen },
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
  componentDidMount() {
    // Check Token from AsyncStorage
    checkSession(this.props.dispatch);
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
