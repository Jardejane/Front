import axios from 'axios'
const api = axios.create({
    baseURL: 'https://buddycare.onrender.com/',
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // api.interceptors.response.use(
  //   (config) => {
  //     return config;
  //   },
  //   (err) => {
  //     if (err.response.status === 401 || err.response.status === 403) {
  //       if (localStorage.getItem("token")) {
  //         localStorage.removeItem("token");
  //       }
  //       window.location.href = "/login";
  //       throw new Error(err.response.data.message);
  //     }
  
  //     return err?.response;
  //   }
  // );
  
  export default api;