import axios from './axios';
import {
  AuthAction,
  LoadingAction,
  MessageBarAction,
  ModalAction,
} from '../reducers/Actions';

export const subscribe = (cardNumber, birth, password, expiry) => dispatch => {
  const assembleCard = `${cardNumber[0]}-${cardNumber[1]}-${cardNumber[2]}-${
    cardNumber[3]
  }`;
  const assembleExpiry = `20${expiry[1]}-${expiry[0]}`;
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .post(`/subscription`, {
      cardNumber: assembleCard,
      password: password,
      birth: birth,
      expiry: assembleExpiry,
    })
    .then(response => {
      const { token, ...option } = response.data;
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: { ...option },
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: '멤버십 등록이 완료되었습니다',
      });
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'check',
          text: '결제정보 인증에 실패하였습니다',
        },
      });
      return Promise.reject();
    });
};

export const cancelSubscribe = dispatch => {
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .delete(`/subscription`)
    .then(response => {
      const { token, ...option } = response.data;
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: { ...option },
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: '멤버십이 해지되었습니다',
      });
      return Promise.resolve();
    })
    .catch(err => {
      dispatch({ type: LoadingAction.HIDE_LOADING });
      return Promise.reject(err.response);
    });
};
