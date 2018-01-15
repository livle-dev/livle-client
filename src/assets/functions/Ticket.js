import { getTime, isFuture } from './Moment';

export const fourHourBeforeConcert = ticket =>
  getTime(ticket.startAt).timestamp.subtract(4, 'hours');

export const isConcertToday = ticket => {
  // 콘서트가 4시간 전인지 여부 체크
  return !isFuture(fourHourBeforeConcert(ticket));
};
