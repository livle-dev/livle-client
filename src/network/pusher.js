import Pusher from 'pusher-js/react-native';
import { api_key } from '../assets/strings';

export default new Pusher(api_key.pusher, {
  cluster: 'ap1',
  encrypted: true,
});
