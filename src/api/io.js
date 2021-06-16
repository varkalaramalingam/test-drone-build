import axios from "axios";
import { cmsApi, prodApi } from "./instances.json";

let baseUrl =
  window.location.host.startsWith("localhost") ||
  window.location.host.startsWith("qa")
    ? cmsApi
    : prodApi;

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    if(localStorage.getItem("authToken")){
      config.headers["Authorization"] = localStorage.getItem("authToken");
    }
    return config;
  },
  (error) => {
    console.log(error)
    Promise.reject(error);
  }
);

//Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log(error)
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = baseUrl;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Headers"] = "*";
axios.defaults.headers["Access-Control-Allow-origin"] = "*";

export const io = async ({ url, method, data, params, headers }) => {
  // refer here : https://www.npmjs.com/package/axios#axiosrequestconfig-1
  return await axios({
    url,
    method,
    headers,
    params,
    data,
  });
};
