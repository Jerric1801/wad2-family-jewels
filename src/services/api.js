import axios from 'axios';

class API { 
  constructor(baseUrl) {
    if (!API.instance) {
      this.api = axios.create({
        baseURL: 'YOUR_API_BASE_URL',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      this.api.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            //  localStorage.removeItem('token'); 
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