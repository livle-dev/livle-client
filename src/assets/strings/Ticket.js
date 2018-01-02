import LocalizedStrings from 'react-native-localization';

export const ticket_string = new LocalizedStrings({
  en: {
    noReservation: 'No Reservation Available.',
    bookTicket: 'Press Ticket',
    toEnjoyConcert: ' to enjoy concert!',
    confirmEntry: 'Confirm Entry',
    concertBooked: 'Successfully Booked',
    entryConfirmed: 'Entry Confirmed!',
    showToStaff: 'Show to staff when entering',
    wannaCancelReservation: 'Want to cancel reservation?',
    cancelReservation: 'Cancel Reservation',
    penaltyFront: `Cannot make reservation until`,
    penaltyTime: 'MMMM, DD hh:mm',
    penaltyBack: `as a panelty for No-Show`,
    unableCancelReservation:
      'Reservations cannot be canceled 4 hours before concert begins',
    reservationCanceled: 'Reservation has been canceled',
    invalidCode: 'Invalid Code',
    fullCapacity: 'Seats has been fully booked',
    reApplyMembership: `Re-Apply Membership and
enjoy tons of concerts that
make your heart shaking everyday`,
  },
  ko: {
    noReservation: '예약내역이 없습니다.',
    bookTicket: '티켓 버튼',
    toEnjoyConcert: '을 눌러 콘서트를 즐기세요!',
    confirmEntry: '입장 확인',
    concertBooked: '예약되었습니다',
    entryConfirmed: '입장이 확인되었습니다',
    showToStaff: '공연장에 입장할 때 보여주세요',
    wannaCancelReservation: '예약을 취소하시겠습니까?',
    cancelReservation: '예약취소',
    penaltyFront: `노쇼에 대한 패널티로`,
    penaltyTime: 'MM월 DD일 hh시 mm분',
    penaltyBack: `까지 예약하실 수 없습니다`,
    unableCancelReservation: '공연시작 4시간 전에는 예약을 취소할 수 없습니다',
    reservationCanceled: '예약이 취소되었습니다',
    invalidCode: '잘못된 코드입니다',
    fullCapacity: '좌석이 매진되었습니다',
    reApplyMembership: `멤버십을 다시 등록하여
당신을 설레게 할
수많은 공연들을 즐겨보세요!`,
  },
});
