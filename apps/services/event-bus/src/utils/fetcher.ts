import { AxiosResponse } from "axios"
import { API_BASE_URLS } from "./apiConfig"
import axiosInstance from "./axios"

// utils/fetcher.ts
export async function apiRequest<T>(
  service: 'users' | 'blogs',
  endpoint: string,
  options: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    params?: any;
    headers?: any;
  } = {}
): Promise<AxiosResponse<T>> {
  const baseURL = API_BASE_URLS[service];
  const url = `${baseURL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  console.log(`[API] ${options.method || 'GET'} ${url}`);

  const response = await axiosInstance({
    baseURL,
    url: endpoint,
    method: options.method || 'GET',
    data: options.data || {},
    params: options.params || {},
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    responseType: 'json',
  });

  return response;
}
