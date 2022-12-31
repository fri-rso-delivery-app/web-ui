import React from 'react';
import axios, { AxiosRequestHeaders } from 'axios';
import { QueryClient, QueryFunction } from "react-query";


// auth context
export type AuthContextState = {
  auth: boolean
  setAuth:(c: boolean) => void
}
export const AuthContext = React.createContext<AuthContextState>({ 'auth': false, 'setAuth': () => null });

// base url for prod/dev
const getBaseUrl = () => {
  let url;
  switch(import.meta.env.MODE) {
    case 'production':
      url = '/api';
      break;
    case 'development':
    default:
      url = 'http://localhost:8080/api';
  }
  
  return url;
}

function setupApi() {

  // declare a request interceptor
  axios.interceptors.request.use(config => {
    // perform a task before the request is sent

    let token = localStorage.getItem('jwt_token');

    // set auth
    if (token && config.headers)
      config.headers = {
          ...(config.headers),
          'Authorization': `Bearer ${token}`,
      } as unknown as AxiosRequestHeaders;

    
    // default api version
    let api_version = '/v1';

    // url prefix
    config.url = `${getBaseUrl()}${api_version}${config.url}`;

    return config;
  }, error => {
    // show alert
    alert(error);

    // handle request err
    return Promise.reject(error);
  });


  // declare a response interceptor
  axios.interceptors.response.use(response => {
    // response was received

    return response;
  }, error => {
    if (error.response != null) {

      // auth err
      if (error.response.status === 401) {
        alert('Login expired!');
        localStorage.setItem('jwt_token', '');
        window.location.reload();
      }
      // other errors
      else if ('detail' in error.response.data) {
        let detail = error.response.data.detail;

        let errors = '';

        // check for messages list
        if (Array.isArray(detail)) {
          detail.forEach((e) => {
            if ('msg' in e) errors += `${e.msg}\n`;
          });
        } else {
          errors = detail;
        }

        // show alert
        alert(errors);
      }
    }

    // handle response err
    return Promise.reject(error);
  });
}

setupApi();

export const queryFn: QueryFunction = async ({ queryKey }) => {
  // In a production setting the host would be remplaced by an environment variable
  const { data } = await axios.get(`/${queryKey[0]}`);
  return data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: queryFn,
    },
  },
});
