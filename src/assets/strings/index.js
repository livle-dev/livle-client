// Libraries
import LocalizedStrings from 'react-native-localization';

export * from './Constant';
export * from './Main';
export * from './Membership';
export * from './Notice';
export * from './Session';
export * from './Setting';
export * from './Ticket';

export const global_string = new LocalizedStrings({
  en: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    enterPassword: 'Enter Password',
    errorOccured: 'Error has been occured',
    subscribe: 'Subscribe',
  },
  ko: {
    cancel: '취소',
    confirm: '확인',
    enterPassword: '비밀번호를 입력하세요',
    errorOccured: '에러가 발생했습니다',
    subscribe: '구독하기',
  },
});
