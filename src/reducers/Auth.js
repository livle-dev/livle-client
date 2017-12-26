// Actions
import { AppAction } from './Actions';

const UNMOUNT = 'UNMOUNT';

const initialState = {
  isLoggedIn: UNMOUNT,
  provider: null,
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
        provider: action.provider,
        data: action.data,
      };
    case AppAction.LOGOUT:
      return { isLoggedIn: false, provider: null, data: null };
    default:
      return state;
  }
}
