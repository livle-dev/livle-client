import { PushNotifAction } from './Actions';

const initialNotifState = { startNotif: false, listUpdateNotif: false };
export function notif(state = initialNotifState, action) {
  switch (action.type) {
    case PushNotifAction.START_NOTIF:
      return { ...state, startNotif: !state.startNotif };
    case PushNotifAction.LIST_UPDATE_NOTIF:
      return { ...state, listUpdateNotif: !state.listUpdateNotif };
    default:
      return state;
  }
}
