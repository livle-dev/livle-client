import moment from 'moment';

export function getTime(data, key) {
  let time;
  if (key)
    time = data > 0 ? moment().add(data, key) : moment().subtract(-data, key);
  else time = moment(data && data);

  return {
    timestamp: time,
    minutes: time.minutes(),
    hours: time.hours(),
    date: time.date(),
    day: time.day(),
  };
}

export function getDday(timeTo, timeFrom) {
  const startAt = moment(timeFrom && timeFrom).startOf('date');
  const endAt = moment(timeTo).startOf('date');
  return endAt.diff(startAt, 'days');
}

export function isFuture(timeTo, timeFrom) {
  const startAt = moment(timeFrom && timeFrom);
  const endAt = moment(timeTo);
  return endAt.diff(startAt) > 0;
}
