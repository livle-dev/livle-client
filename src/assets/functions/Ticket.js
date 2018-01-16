import { getTime, isFuture } from './Moment';

export const fourHourBeforeConcert = ticket =>
  getTime(ticket.startAt).timestamp.subtract(4, 'hours');

export const fifteenMinuteBeforeConcert = ticket =>
  getTime(ticket.startAt).timestamp.subtract(15, 'minutes');

export const isConcertToday = ticket => {
  // 콘서트 4시간 전인지 여부 체크
  return !isFuture(fourHourBeforeConcert(ticket));
};

export const isConcertNow = ticket => {
  // 콘서트 15분 전인지 여부 체크
  return !isFuture(fifteenMinuteBeforeConcert(ticket));
};
