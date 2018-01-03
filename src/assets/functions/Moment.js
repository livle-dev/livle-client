import moment from 'moment';

export function getTime(data, key) {
  let time;
  if (key) time = moment().add(data, key);
  else time = moment(data && data);

  return {
    timestamp: time,
    minutes: time.minutes(),
    hours: time.hours(),
    date: time.date(),
    day: time.day(),
  };
}

export function getDday(data) {
  const today = moment().startOf('date');
  const d_day = moment(data).startOf('date');
  return d_day.diff(today, 'days');
}

export function isFuture(timeTo, timeFrom) {
  const startAt = moment(timeFrom && timeFrom);
  const endAt = moment(timeTo);
  return endAt.diff(startAt) > 0;
}
