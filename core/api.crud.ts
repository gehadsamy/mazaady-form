import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export const getData = async (
  url: string,
  id?: number
): Promise<AxiosResponse<any>> => {
    const _url = id ? `${url}/${id}` : url
  return await axiosInstance.get(`${_url}`);
};
