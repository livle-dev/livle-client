import LocalizedStrings from 'react-native-localization';

export const main_string = new LocalizedStrings({
  en: {
    vacancies: ' seats left',
    booked: 'FULL',
    lineUP: 'LINE - UP',
    concertBooked: 'Successfully Booked!',
  },
  ko: {
    vacancies: '석 남음',
    booked: '좌석 매진됨',
    lineUp: '출연진',
    concertBooked: '예약되었습니다!',
  },
});
