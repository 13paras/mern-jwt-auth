import axios from "axios";
import { UNAUTHORIZED } from "../constants/http.mjs";

const options = {
  baseUrl: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { status, data } = error.message;
    return Promise.reject({ status, ...data });
  }
);

export default API;
