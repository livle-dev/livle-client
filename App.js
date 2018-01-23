// Libraries
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
// Navigator
import AppNavigation from './src/components/navigations/AppNavigation';
// Reducer
import store from './src/reducers';
// Networks
import PushNotification from './src/network/PushNotification';
// Views
import Loading from './src/components/views/partials/Loading';
import MessageBar from './src/components/views/partials/MessageBar';
import Modal from './src/components/views/partials/Modal';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppNavigation />
          {/* Global Components */}
          <PushNotification dispatch={store.dispatch} />
          <Loading />
          <MessageBar />
          <Modal />
          {/* END */}
        </View>
      </Provider>
    );
  }
}
