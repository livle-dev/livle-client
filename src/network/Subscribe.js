import axios from './axios';
import { AuthAction, MessageBarAction, ModalAction } from '../reducers/Actions';

export const subscribe = (cardNumber, birth, password, expiry) => dispatch => {
  const assembleCard = `${cardNumber[0]}-${cardNumber[1]}-${cardNumber[2]}-${
    cardNumber[3]
  }`;
  const assembleExpiry = `20${expiry[1]}-${expiry[0]}`;
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
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: '멤버십 등록이 완료되었습니다',
      });
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err.response);
    });
};

export const cancelSubscribe = dispatch => {
  return axios
    .delete(`/subscription`)
    .then(response => {
      const { token, ...option } = response.data;
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: { ...option },
      });
      dispatch({
        type: MessageBarAction.SHOW_MESSAGE_BAR,
        message: '멤버십이 해지되었습니다',
      });
      return Promise.resolve();
    })
    .catch(err => {
      console.log(err.response);
    });
};
