const API_URL =
  import.meta.env.VITE_NODE_ENV === 'production'
    ? import.meta.env.VITE_API_URL_PROD
    : import.meta.env.VITE_API_URL_DEV;

export default API_URL;
