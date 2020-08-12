import "isomorphic-fetch";
import {config} from "../config";
import {encodeGetParams} from "./urlParams";
import {toUnderScore} from "./formatting";
import history from "./history";


const getDefaultHeaders = () => {
  const token = localStorage.getItem(config.JWToken);
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

/**
 * @param api The config key for the API to call
 * @param query Query parameters to attach to the API call
 * @param options options object to send
 * @param _payload
 */
const apiRequest = (api, query, options = {}, _payload) => {
  const {
    HOST,
    routePath
  } = config;
  const apiRoot = api ? api + "/" : "";
  const host = HOST;
  let body;
  if (_payload) {
    let extra = {...JSON.parse(_payload)};
    body = JSON.stringify(extra);
  }

  let resource = query;
  if (resource.charAt(0) === "/") {
    resource = query.substring(1);
  }

  let requestOptions = body ? {...options, body} : options;
  const response =  fetch(`${host}/${apiRoot}${resource}`, {...requestOptions});
  response.then(
    res => {
      if (res.status === 401) {
        history.push(routePath.login);
      }
    });
  return response;
};

const get = (api, query, urlParams = {}) => {
  let _query;
  if (urlParams) {
    _query = query + "?" + encodeGetParams(urlParams);
  } else {
    _query = query;
  }
  return apiRequest(api, _query, {headers: getDefaultHeaders()});
};

const post = (api, query, _payload) => {
  const headers = {
    "content-type": "application/json",
    ...getDefaultHeaders()
  };
  let payload = toUnderScore(_payload);
  return apiRequest(
    api,
    query,
    {headers, method: "POST"},
    JSON.stringify(payload)
  );
};


const patch = (api, query, _payload) => {
  const headers = {
    "content-type": "application/json",
    ...getDefaultHeaders()
  };
  let payload = toUnderScore(_payload);
  return apiRequest(
    api,
    query,
    {headers, method: "PATCH"},
    JSON.stringify(payload)
  );
};

const put = (api, query, payload) => {
  const headers = {
    "content-type": "application/json",
    ...getDefaultHeaders()
  };
  return apiRequest(
    api,
    query,
    {headers, method: "PUT"},
    JSON.stringify(payload)
  );
};

const del = (api, query, _payload) => {
  const headers = {
    "content-type": "application/json",
    ...getDefaultHeaders()
  };
  let payload = toUnderScore(_payload);
  return apiRequest(
    api,
    query,
    {headers, method: "DELETE"},
    JSON.stringify(payload)
  );
};

export default {
  get,
  post,
  patch,
  put,
  del
};
