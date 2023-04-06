export const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#555" offset="0%" />
      <stop stop-color="#666" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#555" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};

export const getFormattedDate = (d) => {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Janurary',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const date = new Date(d);
  const [day, month, year, weekDay] = [
    date.getDate(),
    months[date.getMonth()],
    date.getFullYear(),
    weekdays[date.getDay()],
  ];

  return `${month} ${day}, ${year}`;
};
