import {config} from "../config";

export const storeJWT = data => {
  if ({}.propertyIsEnumerable.call(data, "access")) {
    localStorage.setItem(config.JWToken, data.access);
  }
  if ({}.propertyIsEnumerable.call(data, "refresh")) {
    localStorage.setItem(config.JWTokenRefreshKey, data.refresh);
  }
};

export const deleteJWT = () => {
  localStorage.removeItem(config.JWTokenKey);
  localStorage.removeItem(config.JWTokenRefreshKey);
};

export const getJWT = (type = "access") => {
  let key;
  type === "access" ? key = config.JWToken : key = config.JWTokenRefreshKey;
  return localStorage.getItem(key);
};

export const getAllJWT = () => {
  let accessToken = getJWT();
  let refreshToken = getJWT("refresh");
  if (!accessToken && !refreshToken) {
    return null;
  }
  return {
    access: accessToken,
    refresh: refreshToken
  };
};
