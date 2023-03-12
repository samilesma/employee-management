import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  // Get all employees
  getAllEmployees() {
    return apiClient.get('/employees?_expand=workshop');
  },
  // Create a new employee
  createEmployee(employee) {
    return apiClient.post('/employees', employee);
  },
  // Update an employee
  updateEmployee(employee) {
    return apiClient.put(`/employees/${employee.id}`, employee);
  },
  // Delete an employee
  deleteEmployee(id) {
    return apiClient.delete(`/employees/${id}`);
  }
};
