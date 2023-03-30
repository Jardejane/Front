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
      alert(error.response.data.message);
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
  deactivateAccount: async (token) => {
    try {
      const id = await App.getDoctorIdFromToken()
      const response = await api.patch(`/doctor/${id}/activate`, { isActive: false } ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response
    } catch (error) {
      console.error(error);
    }
  },

  loginDoctor: async (login) => {
    try {
      const response = await api.post('/auth/signin', login)
      const resp = response.data;
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
      alert(error.resp.data.message);
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
      alert(error.resp.data.message);
      return null;
    }
  },

  getPacienteById: async (token, id) => {
    try {
      const res = await api.get(`/patient/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const resp = await res.data;
      return resp;
    } catch (error) {
      alert(error.resp.data.message);
    }
  },

  updatePaciente: async (id, data, token) => {
    try {
      const req = await api.patch(`/patient/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data
      return res
    } catch (error) {
      alert(error.res.data.message);
    }
  },

  deletePaciente: async (id, token) => {
    const res = await api.delete(`/patient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const resp = await res.data;
  },

  getWebSala: async (token) => {
    try {
      const res = await api.get('/webchat/room', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const resp = await res.data;
      return resp;
    } catch (error) {
      alert(error.resp.data.message);
      return null;
    }
  },
  getWebSalaById: async (id, token) => {
    try {
      const req = await api.get(`/webchat/room/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      return res;
    } catch (error) {
      alert(error.res.data.message);
      return null;
    }
  },
  getPacienteSalaId: async (token, id) => {
    try {
      const req = await api.get(`/webchat/connect/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      return res;
    } catch (error) {
      alert(error.res.data.message);
    }
  },
  searchTesteGet: async (token, query) => {
    try {
      const req = await api.get(`/record?patientId=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const res = await req.data;
      return res
    } catch (error) {
      alert(error.res.data.message);
    }
  },

  updateTestePatch: async (id, data, token) => {
    try {
      const req = await api.patch(`/record/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data
      return res
    } catch (error) {
      alert(error.res.data.message);
    }
  },

  getTesteById: async (id, token) => {
    try {
      const req = await api.get(`/record/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      return res;
    } catch (error) {
      alert(error.res.data.message);
    }
  },

  getAllPsicologoNaBuddy: async (token) =>{
    try {
      const req = await api.get(`/doctor`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      console.log(res)
      return res;
    } catch (error) {
      console.log(error)
    }
  },
  
  getIdPsicologoNaBuddy: async (id, token) => {
    try {
      const req = await api.get(`/doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const res = await req.data;
      return res;
    } catch (error) {
     console.log(error)
    }
  },
  deactivateAccountBuddy: async (id) => {
    try {
      const response = await api.patch(`/doctor/${id}/activate`, { isActive: false })
      return response
    } catch (error) {
      console.error(error);
    }
  }
}
