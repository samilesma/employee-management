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
  getAllEmployees(page, pageSize, searchQuery, orderByField, orderByDirection) {
    let url = `/employees?_expand=workshop`;
    
    url += `&_page=${page}&_limit=${pageSize}`;
  
    if (searchQuery) {
      url += `&name_like=${searchQuery}`;
    }
  
    if (orderByField && orderByDirection) {
      if (orderByField === 'workshop.name') {
        url += `&_expand=workshop&_sort=workshop.name&_order=${orderByDirection}`;
      } else {
        url += `&_sort=${orderByField}&_order=${orderByDirection}`;
      }
    }
  
    return apiClient.get(url);
  },
  // Get an employee by ID
  getEmployee(id) {
    return apiClient.get(`/employees/${id}?_expand=workshop`);
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
