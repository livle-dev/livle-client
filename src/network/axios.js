import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.livle.kr/dev',
});

export const facebook = axios.create({
  baseURL: 'https://graph.facebook.com',
});
