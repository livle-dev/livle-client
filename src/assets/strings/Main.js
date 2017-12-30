import LocalizedStrings from 'react-native-localization';

export const main_string = new LocalizedStrings({
  en: {
    capacity: ' seats left',
    booked: 'FULL',
    lineUp: 'LINE - UP',
    concertBooked: 'Successfully Booked',
    cancelReservation: 'Reservation Canceled',
  },
  ko: {
    capacity: '석 남음',
    booked: '좌석 매진됨',
    lineUp: '출연진',
    concertBooked: '예약되었습니다',
    cancelReservation: '예약이 취소되었습니다',
  },
});
