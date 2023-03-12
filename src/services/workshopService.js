import axios from "axios";

const BASE_URL = "http://localhost:3000";

export default {
  // Get all workshops
  getAllWorkshops() {
    return axios.get(`${BASE_URL}/workshops`);
  },
  // Get a single workshop
  getWorkshop(id) {
    return axios.get(`${BASE_URL}/workshops/${id}`);
  },
};
