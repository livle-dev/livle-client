import React, { Component } from 'react';
import { Platform } from 'react-native';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';
import { consts } from '../assets/strings';

export default class PushNotification extends Component {
  componentDidMount() {
    // this method generate fcm token.
    FCM.requestPermissions();
    FCM.getFCMToken().then(token => {
      console.log('TOKEN (getFCMToken)', token);
    });

    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.log('INITIAL NOTIFICATION', notif);
    });

    // This method give received notifications to mobile to display.
    this.notificationUnsubscribe = FCM.on(FCMEvent.Notification, notif => {
      if (notif && notif.local_notification) return;
      this.sendRemote(notif);
    });

    // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    this.refreshUnsubscribe = FCM.on(FCMEvent.RefreshToken, token => {
      console.log('TOKEN (refreshUnsubscribe)', token);
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
      large_icon: 'ic_launcher', // Android only
      local: true,
      vibrate: 500,
      lights: true, // Android only, LED blinking (default false)
    });
  }

  componentWillUnmount() {
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  render() {
    return null;
  }
}
