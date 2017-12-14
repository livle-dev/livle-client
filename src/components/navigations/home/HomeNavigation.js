// Libraries
import React, { Component } from 'react';
import { TabNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
// Views
import MainConnector from './MainConnector';
import GoConnector from './GoConnector';
import { SettingScreen } from './SettingNavigation';
import TopNavbar from '../../views/home/TopNavbar';

// Config
export const HomeScreen = TabNavigator(
  {
    Go: { screen: GoConnector },
    Main: { screen: MainConnector },
    Setting: { screen: SettingScreen },
  },
  {
    tabBarComponent: ({ navigation }) => <TopNavbar navigation={navigation} />,
    tabBarPosition: 'top',
    headerMode: 'none',
    animationEnabled: true,
    swipeEnabled: false,
  }
);

const mapStateToProps = state => {
  return {
    navState: state.homeReducer,
  };
};

class HomeNavigation extends Component {
  render() {
    const { dispatch, navState } = this.props;
    return (
      <HomeScreen
        navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navState,
        })}
      />
    );
  }
}

export default connect(mapStateToProps)(HomeNavigation);
