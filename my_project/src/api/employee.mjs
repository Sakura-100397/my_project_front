import axios from "axios";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error.response || '時間をおいてお試しください。');
  }
);

const ENDPOINT_URL = "http://localhost:5000/api/employees"; 

const employeeApi = {
  async getAll() {
    try {
      const result = await axios.get(ENDPOINT_URL);
      return result.data;
    } catch (error) {
    }
  },

  async get(id) {
    try {
      const result = await axios.get(`${ENDPOINT_URL}/${id}`);
      return result.data;
    } catch (error) {
      throw error; 
    }
  },

  async post(employee) {
    try {
      const result = await axios.post(`${ENDPOINT_URL}/register`, employee); 
      return result.data;
    } catch (error) {
      throw error;
    }
  }
};

export default employeeApi;
