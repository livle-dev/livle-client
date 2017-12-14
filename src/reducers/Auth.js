// Actions
import { AppAction, HandleErrorAction } from './Actions';

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

const initialHandleError = {
  SIGNUP_ERROR: { status: 200, message: '' },
  LOGIN_ERROR: { status: 200, message: '' },
  CONFIRM_EMAIL_ERROR: { status: 200, message: '' },
};
export function handleError(state = initialHandleError, action) {
  let setMessage = '';
  switch (action.type) {
    case HandleErrorAction.SIGNUP_ERROR:
      /**
       * action.status = PropTypes.number.isRequired
       **/
      if (action.status === 400)
        setMessage = '잘못된 요청 (이메일이나 비밀번호가 없음)';
      else if (action.status === 403)
        setMessage = '이미 존재하는 아이디입니다.';
      else if (action.stats === 404)
        setMessage = '잘못된 이메일입니다. 다시 입력해주세요';
      break;
    case HandleErrorAction.LOGIN_ERROR:
      /**
       * action.status = PropTypes.number.isRequired
       **/
      if (action.status === 400)
        setMessage = '이메일 또는 비밀번호가 없거나 잘못됨';
      else if (action.status === 403)
        setMessage = '해당 아이디로 가입된 정보는 있으나 비밀번호가 틀림';
      else if (action.status === 404)
        setMessage = '해당 아이디로 가입된 정보가 없음';
      break;
    case HandleErrorAction.CONFIRM_EMAIL_ERROR:
      /**
       * action.status = PropTypes.number.isRequired
       **/
      if (action.status === 400)
        setMessage = '이메일 또는 비밀번호가 없거나 잘못됨';
      else if (action.status === 404)
        setMessage = '이메일 또는 비밀번호가 없거나 잘못됨';
      break;
    case HandleErrorAction.RESET:
      return initialHandleError;
    default:
      return state;
  }
  // TODO: alert -> local message
  alert(setMessage);
  return {
    ...state,
    [action.type]: { status: action.status, message: setMessage },
  };
}
