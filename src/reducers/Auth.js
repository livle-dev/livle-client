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
       * action.data = PropTypes.object.isRequired
       **/
      console.log('DISPATCH login');
      return {
        isLoggedIn: true,
        provider: action.provider,
        data: action.data,
      };
    case AppAction.LOGOUT:
      console.log('DISPATCH logout');
      return initialState;
    default:
      return state;
  }
}
