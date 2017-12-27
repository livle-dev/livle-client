// Libraries
import React, { Component } from 'react';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
// View
import PromotionPage from '../views/home/PromotionPage';
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
    Promotion: { screen: PromotionPage },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
);

const UNMOUNT = 'UNMOUNT';

class AppNavigation extends Component {
  componentWillMount() {
    checkSession(this.props.dispatch);
  }

  render() {
    const { dispatch, auth, navState } = this.props;
    const isMount = auth.isLoggedIn !== UNMOUNT;

    return isMount ? (
      <AppScreen
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navState,
        })}
      />
    ) : (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>로딩중...</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return { navState: state.appReducer, auth: state.auth };
};

export default connect(mapStateToProps)(AppNavigation);
