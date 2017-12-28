import axios from './axios';
import {} from '../reducers/Actions';

export const subscribe = (cardNumber, password, birth, expiry) => dispatch => {
  return axios
    .post(`/subscription`, {
      cardNumber: cardNumber,
      password: password,
      birth: birth,
      expiry: expiry,
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response);
    });
};
