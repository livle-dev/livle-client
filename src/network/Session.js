import axios from './axios';
import { AsyncStorage } from 'react-native';
import {
  AppAction,
  HandleErrorAction,
  MessageBarAction,
} from '../reducers/Actions';

/**
 *  TEST SESSION
 *  EMAIL: abc@livle.kr
 *  PW: 123
 */
const TOKEN_KEY = '@LivleClient:token';

async function _setToken(token) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}
async function _getToken() {
  await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
    axios.defaults.headers.common['Authorization'] = `${result}`;
    return result;
  });
}
async function _removeToken() {
  await AsyncStorage.removeItem(
    TOKEN_KEY,
    err => delete axios.defaults.headers.common['Authorization']
  );
}

export const checkSession = dispatch => {
  _getToken().then(res => {
    return axios
      .get('/user')
      .then(response => {
        const data = response.data;
        console.log('SESSION: signed in');
        dispatch({
          type: AppAction.LOGIN,
          data: {
            email: data.email,
            // nickname: data.nickname,
            expire_at: data.expire_at,
            is_subsrcibing: data.is_subsrcibing,
          },
        });
      })
      .catch(err => {
        /**
         * 401: 헤더에 토큰이 없음
         * 403: 헤더에 토큰이 있지만 유효하지 않음
         */
        const status = err.response.status;
        switch (status) {
          case 401:
            break;
          case 403:
            console.log('SESSION: signed out');
            break;
        }
      });
  });
};

export const login = (email, password) => dispatch => {
  return axios
    .post(`/user/session`, { email: email, password: password })
    .then(response => {
      const data = response.data;
      _setToken(data.token);
      dispatch({
        type: AppAction.LOGIN,
        data: {
          email: data.email,
          // nickname: data.nickname,
          expire_at: data.expire_at,
          is_subsrcibing: data.is_subsrcibing,
        },
      });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        data: '로그인 되었습니다',
      });
    })
    .catch(err => {
      /**
       * 400: 이메일 또는 비밀번호가 없거나 잘못됨
       * 403: 해당 아이디로 가입된 정보는 있으나 비밀번호가 틀림
       * 404:	해당 아이디로 가입된 정보가 없음
       */
      dispatch({
        type: HandleErrorAction.LOGIN_ERROR,
        status: err.response.status,
      });
    });
};

export const logout = dispatch => {
  _removeToken()
    .then(() => {
      dispatch({ type: AppAction.LOGOUT });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        data: '로그아웃 되었습니다',
      });
    })
    .catch();
};

export const signUp = (email, password, nickname) => dispatch => {
  return axios
    .post('/user', { email: email, password: password })
    .then(response => {
      const data = response.data;
      dispatch({
        type: AppAction.LOGIN,
        token: data.token,
        data: { email: data.email, nickname: nickname },
      });
    })
    .catch(err => {
      /**
       * 400: 잘못된 요청 (이메일이나 비밀번호가 없음)
       * 403: 이미 존재하는 아이디
       * 404:	잘못된 이메일 형식
       */
      dispatch({
        type: HandleErrorAction.SIGNUP_ERROR,
        status: err.response.status,
      });
    });
};

export const confirmEmail = email => dispatch => {
  return axios
    .get(`/user/password?email=${email}`)
    .then(response => {
      console.log('send email to ' + email);
    })
    .catch(err => {
      /**
       * 400: 이메일이 없거나 잘못된 형식
       * 404:	해당하는 유저가 없음
       */
      dispatch({
        type: HandleErrorAction.CONFIRM_EMAIL_ERROR,
        status: err.response.status,
      });
    });
};
