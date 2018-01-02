import axios from './axios';
import {
  AuthAction,
  LoadingAction,
  MessageBarAction,
  ModalAction,
} from '../reducers/Actions';
import { membership_string } from '../assets/strings';

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
        message: membership_string.compleltApplying,
      });
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: membership_string.failedVerifyPayment,
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
        message: membership_string.completeTerminate,
      });
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: LoadingAction.HIDE_LOADING });
      return Promise.reject(err.response);
    });
};
