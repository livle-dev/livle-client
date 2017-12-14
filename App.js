// Libraries
import React, { Component } from 'react';
import { Provider } from 'react-redux';
// Navigator
import AppNavigation from './src/components/navigations/AppNavigation';
// Reducer
import store from './src/reducers';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
