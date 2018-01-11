import React, { Component } from 'react';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType,
} from 'react-native-fcm';
import { AuthAction } from '../reducers/Actions';
import { consts } from '../assets/strings';

const setBadgeNumber = number => FCM.setBadgeNumber(number);
const getBadgeNumber = async () => await FCM.getBadgeNumber();

// `${NotifId['object']}${id}`
export const NotifId = {
  RESERVATION: 'RESERVATION',
};

export const PresentNotification = async (
  title,
  body,
  click_action = null,
  id = null
) => {
  const addBadge = (await getBadgeNumber()) + 1;
  let notifSetting = {
    title: 'LIVLE',
    body: body,
    priority: 'high',
    show_in_foreground: true,
    // iOS
    badge: addBadge,
    // Android
    number: addBadge,
    vibrate: 500,
    wake_screen: true, // wake up screen when notification arrives
    lights: true, // LED blinking
  };
  if (click_action) notifSetting.click_action = click_action;
  if (id) notifSetting.id = id;

  FCM.presentLocalNotification(notifSetting);
};

export const scheduleLocalNotification = (type, id, body, moment) =>
  FCM.scheduleLocalNotification({
    fire_date: moment.toDate().getTime(),
    id: `${type}${id}`, // this is what you use to lookup and delete notification. In android notification with same ID will override each other
    title: 'LIVLE',
    body: body,
    priority: 'high',
    show_in_foreground: true,
  });

export default class PushNotification extends Component {
  componentDidMount() {
    try {
      // iOS
      FCM.requestPermissions({ badge: true, sound: true, alert: true });
    } catch (err) {
      console.error(err);
    }

    // this method generate fcm token.
    FCM.getFCMToken().then(token => {
      const { dispatch } = this.props;
      dispatch({ type: AuthAction.SET_FCM_TOKEN, token: token });
    });

    // This method get all notification from server side.
    FCM.getInitialNotification().then(notif => {
      console.log('InitialNotification', notif);
    });

    // This method give received notifications to mobile to display.
    this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
      if (notif.local_notification || notif.opened_from_tray) {
        /**
         * opened_from_tray
         * iOS: app is open/resumed because user clicked banner
         * Android: app is open/resumed because user clicked banner or tapped app icon
         */
        switch (notif.click_action) {
          case 'SUBTRACK_BADGE':
            return getBadgeNumber().then(number => setBadgeNumber(number - 1));
          case 'CLEAR_BADGE':
            return setBadgeNumber(0);
          default:
            return;
        }
      }
      this.sendRemote(notif);
    });

    // this method call when FCM token is update(FCM token update any time so will get updated token from this method)
    this.refreshListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log('refreshListener', token);
      dispatch({ type: AuthAction.SET_FCM_TOKEN, token: token });
    });
  }

  // This method display the notification on mobile screen.
  sendRemote(notif) {
    const { fcm } = notif;
    PresentNotification(fcm.title, fcm.body, 'SUBTRACK_BADGE');
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
