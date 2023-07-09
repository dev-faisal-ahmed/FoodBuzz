const roundDigit = (value, length) => {
  let len = length - ('' + value).length;
  return (len > 0 ? new Array(++len).join('0') : '') + value;
};

export function getDateObject(date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'April',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let hour = date.getHours();
  const minute = date.getMinutes();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let meridian = 'AM';

  // fixing meridian
  if (hour >= 12 || hour <= 23) {
    meridian = 'PM';
  }
  // fixing hours
  if (hour > 12) hour -= 12;

  return {
    time: `${roundDigit(hour, 2)}:${roundDigit(minute, 2)} ${meridian}`,
    date: `${month} ${day}, ${year}`,
  };
}

export function idGenerator(time) {
  const char = `abcdefghijklmnopqrstuv`;
  let str = '';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    str += char[randomIndex];
  }
  str += time;

  return slicer(str, 9, 3, '-');
}

export function slicer(data, length, interval, character) {
  let str = '';
  // const loopDuration = length > str.length ? str.length : length;
  let counter = 0;
  for (let i = 0; i < length; i++) {
    if (counter === interval) {
      str += character;
      counter = 0;
    }
    str += data[i];
    counter++;
  }

  return str;
}
