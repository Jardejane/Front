import axios from "axios";
axios.defaults.baseURL = "https://buddycare.onrender.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers["Access-Control-Allow-Origin"] =
  "https://front-neon-ten.vercel.app";
axios.defaults.headers["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axios.defaults.headers["Access-Control-Allow-Headers"] =
  "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json";
const api = axios.create({});

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

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    if (err.response.status === 401 || err.response.status === 403) {
      if (localStorage.getItem("accessToken")) {
        localStorage.removeItem("accessToken");
      }
      // Redirecione o usuário para a página de login ou mostre uma mensagem de erro
      window.location.href = "/login";
      throw new Error(err.response.data.message);
    }

    return err?.response;
  }
);

export default api;
