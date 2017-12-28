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

export function convertTimeToString(time) {
  hour = getTime(time).hours.toString();
  minute = getTime(time).minutes.toString();

  convertHour = hour.length > 1 ? hour : '0' + hour;
  convertMinute = minute.length > 1 ? minute : '0' + minute;
  return `${convertHour} : ${convertMinute}`;
}
