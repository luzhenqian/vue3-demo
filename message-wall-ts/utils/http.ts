import axios from "axios";

declare module 'axios' {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>,
    request<T = any>(config: AxiosRequestConfig): Promise<T>,
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>,
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>,
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>,
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>,
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>,
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>
  }
}

const httpClient = axios.create({
  baseURL: "https://3yya.com/u/d8cf630cf5f367cc/rest/app",
  timeout: 5000,
});

httpClient.interceptors.response.use((response) => {
  return response.data;
});

export default httpClient
