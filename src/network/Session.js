import axios from './axios';
import { AsyncStorage } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AppAction, MessageBarAction, ModalAction } from '../reducers/Actions';

/**
 *  TEST SESSION
 *  EMAIL: abc@livle.kr
 *  PW: 123
 */
const TOKEN_KEY = '@LivleClient:token';

/* MANAGE TOKEN */
async function _getToken() {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  const item = await JSON.parse(result);
  if (item) {
    // set header
    axios.defaults.headers.common['Authorization'] = item.token;
  }
  return item;
}
async function _setToken(token) {
  const item = { token: token };

  response = await _getToken();
  if (!response) {
    AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(item));
  }
}
function _removeToken() {
  AsyncStorage.removeItem(
    TOKEN_KEY,
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
  dispatch({
    type: MessageBarAction.SHOW_MESSAGE_BAR,
    data: '로그인 되었습니다',
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
      /**
       * 401: 헤더에 토큰이 없음
       * 403: 헤더에 토큰이 있지만 유효하지 않음
       */

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
  return _getToken().then(res => {
    if (res) {
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
      /**
       * 400: 이메일 또는 비밀번호가 없거나 잘못됨
       * 403: 해당 아이디로 가입된 정보는 있으나 비밀번호가 틀림
       * 404:	해당 아이디로 가입된 정보가 없음
       */
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
    data: '로그아웃 되었습니다',
  });
};

export const signUp = (email, password, nickname) => dispatch => {
  return axios
    .post('/user', { email: email, password: password, nickname: nickname })
    .then(response => {
      const { data } = response;
      _setToken(data.token);
      dispatchUserData(data)(dispatch);
    })
    .catch(err => {
      /**
       * 400: 잘못된 요청 (이메일이나 비밀번호가 없음)
       * 403: 이미 존재하는 아이디
       * 404:	잘못된 이메일 형식
       */
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'notice',
          text: err.response.data,
        },
      });
    });
};

export const confirmEmail = email => dispatch => {
  return axios
    .get(`/user/password?email=${email}`)
    .then(response => {
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        data: '메일을 보냈습니다!',
      });
    })
    .catch(err => {
      /**
       * 400: 이메일이 없거나 잘못된 형식
       * 404:	해당하는 유저가 없음
       */
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'notice',
          text: err.response.data,
        },
      });
    });
};

export const withdraw = (email, password) => dispatch => {
  return axios
    .delete('/user', { email: email, password: password })
    .then(() => {
      dispatch({ type: AppAction.LOGOUT });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        data: '계정이 삭제되었습니다',
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
