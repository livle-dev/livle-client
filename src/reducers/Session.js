// Functions
import { subscriptionStatus } from '../assets/functions';
// Actions
import { AuthAction, AppAction } from './Actions';

const UNMOUNT = 'UNMOUNT';

const initialState = {
  isLoggedIn: UNMOUNT,
  data: null,
};
export function auth(state = initialState, action) {
  switch (action.type) {
    case AppAction.LOGIN:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      return {
        isLoggedIn: true,
        data: { ...action.data, status: subscriptionStatus(action.data) },
      };
    case AppAction.LOGOUT:
      return { isLoggedIn: false, data: null };
    case AuthAction.UPDATE_USER_DATA:
      /**
       * action.data = PropTypes.object.isRequired
       **/
      return {
        ...state,
        data: { ...action.data, status: subscriptionStatus(action.data) },
      };
    default:
      return state;
  }
}
