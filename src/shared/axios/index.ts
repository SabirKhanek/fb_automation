import {
  BASIC_BASE_URL,
  GLOBAL_HEADERS,
  MOBILE_HEADERS,
  MOBILE_BASE_URL,
} from "./../utils/requestConfig";
import { Axios } from "axios";

export const axios = new Axios({
  headers: { ...GLOBAL_HEADERS },
  baseURL: BASIC_BASE_URL,
  withCredentials: true,
});

export const mobileAxios = new Axios({
  headers: { ...MOBILE_HEADERS },
  baseURL: MOBILE_BASE_URL,
  withCredentials: true,
});
