import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

export default {
  // Get all workshops
  getAllWorkshops() {
    return apiClient.get('/workshops');
  },
  // Get a single workshop
  getWorkshop(id) {
    return apiClient.get(`/workshops/${id}`);
  },
};
