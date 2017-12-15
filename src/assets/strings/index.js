// Libraries
import LocalizedStrings from 'react-native-localization';

export * from './Go';
export * from './Login';
export * from './Main';
export * from './Notice';
export * from './Setting';

export const global_string = new LocalizedStrings({
  en: {
    cancel: 'Cancel',
    confirm: 'Confirm',
    enterPassword: 'Enter Password',
  },
  ko: {
    cancel: '취소',
    confirm: '확인',
    enterPassword: '비밀번호를 입력하세요.',
  },
});
