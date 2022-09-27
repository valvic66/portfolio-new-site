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

export const storeToLocalStorage = (name, value) => {
  localStorage.setItem(name, value);
};

export const getFromLocalStorage = (name) => {
  if (typeof name === 'object') {
    return JSON.parse(localStorage.getItem(name));
  }

  return localStorage.getItem(name);
};

export const removeFromLocalStorage = (name) => {
  localStorage.removeItem(name);
};
