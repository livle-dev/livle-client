import { getTime, isFuture } from './Moment';

export const isConcertToday = ticket => {
  // 콘서트가 4시간 전인지 여부 체크
  const fourHourBefore = getTime(ticket.startAt).timestamp.subtract(4, 'hours');
  return !isFuture(fourHourBefore);
};
