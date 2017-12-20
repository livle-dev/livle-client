import axios, { facebook } from './axios';
import { AsyncStorage } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AppAction, MessageBarAction, ModalAction } from '../reducers/Actions';

/**
 *  TEST SESSION
 *  EMAIL: abc@livle.kr
 *  PW: 123
 */
const TOKEN_KEY = '@LivleClient:token';
const PROVIDER = { LIVLE: 'LIVLE', FACEBOOK: 'FACEBOOK' };

/* MANAGE TOKEN */
async function _setToken(token, provider) {
  const item = { token: token, provider: provider };
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(item));
}
async function _getToken() {
  const result = await AsyncStorage.getItem(TOKEN_KEY);
  const item = await JSON.parse(result);
  if (item) {
    // set header
    axios.defaults.headers.common['Authorization'] = item.token;
  }
  return item;
}
async function _removeToken() {
  await AsyncStorage.removeItem(
    TOKEN_KEY,
    err => delete axios.defaults.headers.common['Authorization']
  );
}
/* END */

/* GET DATA & DISPATCH FROM SERVER */
function getLivleData(dispatch) {
  // Call after _getToken
  return axios
    .get('/user')
    .then(response => {
      const { data } = response;
      dispatch({
        type: AppAction.LOGIN,
        provider: PROVIDER.LIVLE,
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
    });
}

function getFacebookData(token, dispatch) {
  return facebook
    .get(`/me?fields=email,name&access_token=${token}`)
    .then(response => {
      const { data } = response;
      dispatch({
        type: AppAction.LOGIN,
        provider: PROVIDER.FACEBOOK,
        data: { email: data.email, nickname: data.name },
      });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        data: '로그인 되었습니다',
      });
    })
    .catch(err => {
      const { message } = err.response.data.error;
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'notice',
          text: message,
        },
      });
    });
}
/* END */

export const checkSession = dispatch => {
  _getToken().then(res => {
    if (res) {
      switch (res.provider) {
        case PROVIDER.LIVLE:
          getLivleData(dispatch);
        case PROVIDER.FACEBOOK:
          getFacebookData(res.token, dispatch);
      }
    }
  });
};

export const login = (email, password) => dispatch => {
  return axios
    .post(`/user/session`, { email: email, password: password })
    .then(response => {
      const { data } = response;
      _getToken().then(res => {
        if (!res) _setToken(data.token, PROVIDER.LIVLE);
      });

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
          const { accessToken, expirationTime } = data;

          _getToken().then(res => {
            if (!res) _setToken(accessToken, PROVIDER.FACEBOOK);
          });
          getFacebookData(accessToken, dispatch);
        });
      }
    },
    err => {
      console.log(err);
    }
  );
};

export const logout = dispatch => {
  _removeToken()
    .then(() => {
      LoginManager.logOut(); // Logout Facebook
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
      const { data } = response;
      dispatch({
        type: AppAction.LOGIN,
        data: { email: data.email, nickname: nickname },
      });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        data: '가입 완료!',
      });
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
