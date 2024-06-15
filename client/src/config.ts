const API_URL =
  import.meta.env.VITE_NODE_ENV === 'production'
    ? import.meta.env.VITE_NODE_ENV
    : import.meta.env.VITE_NODE_ENV;

export default API_URL;
