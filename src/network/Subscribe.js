import axios from './axios';
import { AuthAction } from '../reducers/Actions';

export const subscribe = (cardNumber, password, birth, expiry) => dispatch => {
  const sortCardNumber = `${cardNumber[0]}-${cardNumber[1]}-${cardNumber[2]}-${
    cardNumber[3]
  }`;
  const sortExpiry = `20${expiry[1]}-${expiry[0]}`;
  return axios
    .post(`/subscription`, {
      cardNumber: sortCardNumber,
      password: password,
      birth: birth,
      expiry: sortExpiry,
    })
    .then(response => {
      const { token, ...option } = response.data;
      dispatch({
        type: AuthAction.UPDATE_USER_DATA,
        data: { ...option },
      });
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
    })
    .catch(err => {
      console.log(err.response);
    });
};
