export const encodeGetParams = params => Object.keys(params).map((key) => {
  // turn params object to params string.
  return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
}).join("&");

export const decodeUrlParams = url => {
  // turn a url to params object.
  const hashes = url.slice(url.indexOf("?") + 1).split("&");
  const params = {};
  hashes.forEach(hash => {
    const [key, val] = hash.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params;
};
