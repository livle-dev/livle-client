import React, { Component } from 'react';
import { Platform } from 'react-native';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';
import { AuthAction } from '../reducers/Actions';
import { consts } from '../assets/strings';

export default class PushNotification extends Component {
  componentDidMount() {
    // this method generate fcm token.
    try {
      FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true,
      });
    } catch (e) {
      console.error(e);
    }
    FCM.getFCMToken().then(token => {
      const { dispatch } = this.props;
      dispatch({ type: AuthAction.SET_FCM_TOKEN, token: token });
    });

    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.log('INITIAL NOTIFICATION', notif);
    });

    // This method give received notifications to mobile to display.
    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      // console.log('notificationListener', notif);
      if (notif.local_notification || notif.opened_from_tray) return;
      this.sendRemote(notif);
    });

    // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    this.refreshListener = FCM.on(FCMEvent.RefreshToken, token => {
      // console.log('refreshListener', token);
      this.props.onChangeToken(token);
    });
  }

  // This method display the notification on mobile screen.
  sendRemote(notif) {
    const { fcm } = notif;
    FCM.presentLocalNotification({
      title: fcm.title || 'LIVLE',
      body: fcm.body,
      priority: 'high',
      click_action: notif.click_action,
      show_in_foreground: true,
      sound: 'default',
      local: true,
      vibrate: 500,
      lights: true, // Android only, LED blinking (default false)
    });
  }

  componentWillUnmount() {
    this.refreshListener.remove();
    this.notificationListener.remove();
  }

  render() {
    console.ignoredYellowBox = ['Setting a timer'];
    return null;
  }
}
