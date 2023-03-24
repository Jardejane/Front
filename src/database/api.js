import axios from "axios";

const api = axios;

api.defaults.baseURL = "https://buddycare.onrender.com/";
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers["Access-Control-Allow-Credentials"] = true;
api.defaults.headers["Access-Control-Allow-Origin"] =
  "https://front-neon-ten.vercel.app";
api.defaults.headers["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";
api.defaults.headers["Access-Control-Allow-Headers"] =
  "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json";

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      window.location.href = "/login";
      throw new Error(err.response.data.message);
    }

    return err?.response;
  }
);

export default api;
