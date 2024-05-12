import { AxiosResponse } from "axios";
import axios from "../service/axiosService.js";

export default async function request(url: string) {
  return axios(url);
}

request.get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    return await request(url);
  } catch (err) {
    return Promise.reject(err);
  }
};

request.post = async <T>(
  url: string,
  payload: any,
  headers: any = {}
): Promise<AxiosResponse<T>> => {
  try {
    return await axios.post(url, payload);
  } catch (err) {
    return Promise.reject(err);
  }
};
