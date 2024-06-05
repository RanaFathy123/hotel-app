/* eslint-disable prefer-const */
import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_API_URL;

let axiosInstance = axios.create({
  baseURL: baseUrl,
});
let axiosInstanceWithHeaders = axios.create({
  baseURL: baseUrl,
});

axiosInstanceWithHeaders.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;
  return config;
});
export {axiosInstance, axiosInstanceWithHeaders };
