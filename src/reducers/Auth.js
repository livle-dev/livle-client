// Actions
import { AppAction } from './Actions';

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
        data: action.data,
      };
    case AppAction.LOGOUT:
      return { isLoggedIn: false, data: null };
    default:
      return state;
  }
}
