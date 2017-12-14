export function convertTimeToString(time) {
  hour = time.getHours().toString();
  minute = time.getMinutes().toString();

  convertHour = hour.length > 1 ? hour : '0' + hour;
  convertMinute = minute.length > 1 ? minute : '0' + minute;
  return `${convertHour} : ${convertMinute}`;
}
