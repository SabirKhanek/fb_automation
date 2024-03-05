import { Axios } from "axios";
import { axios, mobileAxios } from "../axios";

export async function fetchPageDefault(
  url: string,
  cookies: string,
  client: Axios
) {
  url = url.split("facebook.com")[1];
  const res = await client.get<string>(url, {
    headers: { ...client.defaults.headers.get, cookie: cookies },
  });
  // console.log(res);
  return res.data;
}

export async function fetchPage(url: string, cookies: string) {
  return fetchPageDefault(url, cookies, axios);
}

export async function fetchMobilePage(url: string, cookies: string) {
  return fetchPageDefault(url, cookies, mobileAxios);
}
