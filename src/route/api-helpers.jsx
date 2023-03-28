import { Alert } from "react-bootstrap";
import api from "../database/api";

export const App = {

  fetchDataWithToken: async (token) => {
    try {
      const response = await api.get(`/auth/signed`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        const res = await response.data;
        return res;
      } else {
        throw new Error('Falha ao buscar dados.');
      }
    } catch (error) {
      console.error(error);
    }
  },
  postDoctor: async (register) => {
    const res = await api.post('/auth/signup', register)
    const resp = await res.data;
    return resp;
  },
  putDoctor: async (id, register, token) => {
    const res = await api.patch(`/doctor/${id}`, register, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const resp = await res.data;
    return resp;
  },
  getDoctorIdFromToken: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await api.get('/auth/signed');
      const { id } = response.data;
      return id;
    }
  },
  deactivateAccount: async () => {
    try {
      const id = await App.getDoctorIdFromToken()
      const response = await api.patch(`/doctor/${id}/activate`, { isActive: false })
      console.log("response", response)
    } catch (error) {
      console.error(error);
    }
  },

  loginDoctor: async (login) => {
    try {
      const response = await api.post('/auth/signin', login)
      const resp = response.data;
      console.log('veio');
      console.log(resp);
      return resp;

    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.message);
      } else {
        alert(error.response.data.message);
      }
      throw new Error(error.response.data.message)
    }
  },
  searchAPI: async (query) => {
    try {
      const res = await api.get(`/patient?q=${query}`);
      const resp = await res.data;
      return resp;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getAllPacient: async (token) => {
    try {
      const res = await api.get('/patient', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const resp = await res.data;
      return resp;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  getPacienteById: async(token, id) =>{
    try {
      const res = await api.get(`/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resp = await res.data;
      return resp;
    } catch (error) {
      console.log(error);
    }
  } , 
  
  updatePaciente : async (id, data, token) =>{
    try {
      const req = await api.patch(`/patient/${id}`, data ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data
      console.log("resApi", res)
      return res
    } catch (error) {
      console.log(error)
    }
  },

  deletePaciente: async (id, token) => {
    const res = await api.delete(`/patient/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resp = await res.data;
  },
  
  getWebSala : async (token) =>{
    try {
      const res = await api.get('/webchat/room', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    const resp = await res.data;
      return resp;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getWebSalaById : async (id, token) =>{
    try {
      const req = await api.get(`/webchat/room/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getPacienteSalaId : async ( token, id) =>{
    try {
      const req = await api.get(`/webchat/connect/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      console.log(res)
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
