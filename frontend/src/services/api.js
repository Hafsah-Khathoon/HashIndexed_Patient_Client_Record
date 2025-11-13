import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const patientAPI = {
  // Get all patients
  getAllPatients: async () => {
    const response = await api.get('/patients');
    return response.data;
  },

  // Get patient by ID
  getPatientById: async (pid) => {
    const response = await api.get(`/patients/${pid}`);
    return response.data;
  },

  // Add new patient
  addPatient: async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },

  // Delete patient by ID
  deletePatient: async (pid) => {
    const response = await api.delete(`/patients/${pid}`);
    return response.data;
  },
};

export default api;

