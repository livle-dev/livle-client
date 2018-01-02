import LocalizedStrings from 'react-native-localization';

export const ticket_string = new LocalizedStrings({
  en: {
    noReservation: 'No Reservation Available.',
    bookTicket: 'Press Ticket',
    toEnjoyConcert: ' to enjoy concert!',
    confirmEntry: 'Confirm Entry',
    entryConfirmed: 'Entry Confirmed!',
    showToStaff: 'Show to Staff When Entering',
    cancelReservation: 'Cancel Reservation',
    wannaCancelReservation: 'Want to cancel Reservation?',
    unableCancelReservation:
      'Reservations cannot be canceled 4 hours before concert begins',
    reservationCanceled: 'Reservation has been Canceled.',
    invalidCode: 'Invalid Code',
  },
  ko: {
    noReservation: '예약내역이 없습니다.',
    bookTicket: '티켓 버튼',
    toEnjoyConcert: '을 눌러 콘서트를 즐기세요!',
    confirmEntry: '입장 확인',
    entryConfirmed: '입장이 확인되었습니다',
    showToStaff: '공연장에 입장할 때 보여주세요',
    cancelReservation: '예약취소',
    wannaCancelReservation: '예약을 취소하시겠습니까?',
    unableCancelReservation: '공연시작 4시간 전에는 예약을 취소할 수 없습니다',
    reservationCanceled: '예약이 취소되었습니다.',
    invalidCode: '잘못된 코드입니다',
  },
});
