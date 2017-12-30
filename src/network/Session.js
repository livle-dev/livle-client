import axios from './axios';
import { AsyncStorage } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AppAction, MessageBarAction, ModalAction } from '../reducers/Actions';
import { consts } from '../assets/strings';
import { getAllTicket } from './Ticket';

/**
 *  TEST SESSION
 *  EMAIL: contacts@livle.kr
 *  PW: 라이블12
 */
function setHeader(item) {
  if (item) axios.defaults.headers.common['Authorization'] = item.token;
}
/* MANAGE TOKEN */
async function _getToken() {
  const result = await AsyncStorage.getItem(consts.asyncToken);
  const item = await JSON.parse(result);
  setHeader(item);
  return item;
}
async function _setToken(token) {
  const item = { token: token };
  const response = await _getToken();
  if (!response) {
    setHeader(item);
    AsyncStorage.setItem(consts.asyncToken, JSON.stringify(item));
  }
}
function _removeToken() {
  AsyncStorage.removeItem(
    consts.asyncToken,
    err => delete axios.defaults.headers.common['Authorization']
  );
}
/* END */

/* GET DATA & DISPATCH FROM SERVER */
const dispatchUserData = data => dispatch => {
  const { token, ...option } = data;
  dispatch({
    type: AppAction.LOGIN,
    data: { ...option },
  });
  getAllTicket(dispatch);
  dispatch({
    type: MessageBarAction.SHOW_MESSAGE_BAR,
    message: '로그인 되었습니다',
  });
};

function getLivleData(dispatch) {
  return axios
    .get('/user')
    .then(response => {
      const { data } = response;
      dispatchUserData(data)(dispatch);
    })
    .catch(err => {
      if (err.status === 403) _removeToken();
      dispatch({ type: AppAction.LOGOUT });
    });
}

const getFacebookData = facebookToken => dispatch => {
  return axios
    .post(`/user/facebook`, { accessToken: facebookToken })
    .then(response => {
      const { data } = response;
      _setToken(data.token);
      dispatchUserData(data)(dispatch);
    })
    .catch(err => {
      dispatch({ type: AppAction.LOGOUT });
    });
};
/* END */

export const checkSession = dispatch => {
  return _getToken().then(response => {
    if (response) {
      return getLivleData(dispatch);
    } else {
      dispatch({ type: AppAction.LOGOUT });
    }
  });
};

export const login = (email, password) => dispatch => {
  return axios
    .post(`/user/session`, { email: email, password: password })
    .then(response => {
      const { data } = response;
      _setToken(data.token);
      dispatchUserData(data)(dispatch);
    })
    .catch(err => {
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'notice',
          text: err.response.data,
        },
      });
    });
};

export const facebookLogin = dispatch => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
    result => {
      if (!result.isCancelled) {
        AccessToken.getCurrentAccessToken().then(data => {
          const facebookToken = data.accessToken;
          getFacebookData(facebookToken)(dispatch);
        });
      }
    },
    err => {
      console.log(err);
    }
  );
};

export const logout = dispatch => {
  _removeToken(); // Logout Locally
  LoginManager.logOut(); // Logout Facebook
  dispatch({ type: AppAction.LOGOUT });
  dispatch({
    type: MessageBarAction.SHOW_MESSAGE_BAR,
    message: '로그아웃 되었습니다',
  });
};

export const signUp = (email, password, nickname) => dispatch => {
  return axios
    .post('/user', { email: email, password: password, nickname: nickname })
    .then(response => {
      const { data } = response;
      _setToken(data.token);
      dispatchUserData(data)(dispatch);
      return Promise.resolve();
    })
    .catch(err => {
      const { status } = err.response;
      Promise.reject(status);
    });
};

export const confirmEmail = email => dispatch => {
  return axios
    .get(`/user/password?email=${email}`)
    .then(response => {
      return Promise.resolve();
    })
    .catch(err => {
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'notice',
          text: err.response.data,
        },
      });
      return Promise.reject();
    });
};

export const withdraw = (email, password) => dispatch => {
  return axios
    .delete('/user', { email: email, password: password })
    .then(() => {
      dispatch({ type: AppAction.LOGOUT });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: '계정이 삭제되었습니다',
      });
    })
    .catch(err => {
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'notice',
          text: err.response.data,
        },
      });
    });
};
