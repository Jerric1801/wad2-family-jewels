import axios from 'axios';
import config from '../../config/default'

class API {
  constructor() {
    if (!API.instance) {
      this.api = axios.create({
        baseURL: config.baseUrl,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      this.api.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      this.api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
          }
          return Promise.reject(error);
        }
      );

      API.instance = this;
    }

    return API.instance;
  }

  getInstance() {
    return this.api;
  }
}

const api = new API().getInstance();
export default api;