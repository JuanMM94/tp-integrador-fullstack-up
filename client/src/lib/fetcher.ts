const fetcher = (url: string, options = {}) =>
  fetch(url, options).then((res) => res.json());

export default fetcher;
