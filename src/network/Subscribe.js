import axios from './axios';
import {
  AppAction,
  AuthAction,
  LoadingAction,
  MessageBarAction,
  ModalAction,
} from '../reducers/Actions';
import { getAllTicket } from './Ticket';
import { global_string, membership_string } from '../assets/strings';

export const subscribe = (
  cardNumber,
  birth,
  password,
  expiry,
  skipTrial = false
) => dispatch => {
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
      skipTrial: skipTrial,
    })
    .then(response => {
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: response.data,
      });
      dispatch({ type: AppAction.RESET });
      return Promise.resolve();
    })
    .then(() => {
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: membership_string.compleltApplying,
      });
      getAllTicket(dispatch);
    })
    .catch(err => {
      dispatch({ type: LoadingAction.HIDE_LOADING });
      if (status === 406)
        return dispatch({
          type: ModalAction.SHOW_MODAL,
          data: {
            type: 'select',
            text: membership_string.alreadyUsedFreeTrial,
            buttonText: global_string.confirm,
            onPress: () => subscribe(cardNumber, birth, password, expiry, true),
          },
        });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: `${membership_string.failedVerifyPayment}
ERROR: ${err.response.status}`,
        },
      });
      return Promise.reject();
    });
};

export const restoreSubscribe = dispatch => {
  dispatch({ type: LoadingAction.SHOW_LOADING });
  return axios
    .post(`/subscription/restore`)
    .then(response => {
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: response.data,
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: membership_string.compleltApplying,
      });
      return Promise.resolve();
    })
    .catch(err => {
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: ModalAction.SHOW_MODAL,
        data: {
          type: 'alert',
          text: `${membership_string.failedVerifyPayment}
ERROR${err.response.status}`,
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
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: response.data,
      });
      dispatch({ type: LoadingAction.HIDE_LOADING });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: membership_string.completeTerminate,
      });
      return Promise.resolve();
    })
    .catch(err => {
      dispatch({ type: LoadingAction.HIDE_LOADING });
      return Promise.reject(err.response);
    });
};
