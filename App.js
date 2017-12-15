// Libraries
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
// Navigator
import AppNavigation from './src/components/navigations/AppNavigation';
// Reducer
import store from './src/reducers';
// Views
import MessageBar from './src/components/views/partials/MessageBar';
import Modal from './src/components/views/partials/Modal';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigation />
          {/* Global Components */}
          <MessageBar />
          <Modal />
          {/* END */}
        </View>
      </Provider>
    );
  }
}
