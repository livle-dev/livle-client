// Actions
import { AppAction } from './Actions';

const initialState = {
  isLoggedIn: false,
  data: null,
};
export function auth(state = initialState, action) {
  switch (action.type) {
    case AppAction.LOGIN:
      /**
       * action.token = PropTypes.string.isRequired
       * action.data = PropTypes.object.isRequired
       **/
      return {
        isLoggedIn: true,
        data: action.data,
      };
    case AppAction.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
