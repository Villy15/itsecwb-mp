import Axios, { InternalAxiosRequestConfig } from 'axios';

import API_URL from './config';

// Function to delay a promise
function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return delay(0, config);
}

export const api = Axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // const message = error.response?.data?.message || error.message;

    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    // if (error.response?.status === 401) {
    //   const searchParams = new URLSearchParams();
    //   const redirectTo = searchParams.get('redirectTo');
    //   window.location.href = `/login?redirectTo=${redirectTo}`;
    // }

    return Promise.reject(error);
  }
);
