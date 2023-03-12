<template>
  <div class="container">
    <h1>Medarbejderoversigt</h1>
    <div class="button-group">
      <button class="button create" @click="createEmployee">Opret medarbejder</button>
      <input type="text" v-model="searchQuery" placeholder="Søg efter navn" />
    </div>
    <table>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Titel</th>
          <th>Arbejdsfunktion</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.title }}</td>
          <td>{{ employee.function }}</td>
          <td>
            <button class="button edit" @click="editEmployee(employee)">Edit</button>
            <button class="button delete" @click="deleteEmployee(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      employees: [],
      searchQuery: ''
    };
  },
  computed: {
    // return a filtered list of employees based on the search query
    filteredEmployees() {
      return this.employees.filter(employee => {
        return employee.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    createEmployee() {
      // redirect to the create employee page
      this.$router.push('/employees/create');
    },
    deleteEmployee(id) {
      axios.delete(`http://localhost:3000/employees/${id}`)
        .then(() => {
          // remove the employee from the list of employees
          this.employees = this.employees.filter(employee => employee.id !== id);
        })
        .catch(error => console.log(error));
    },
    editEmployee(employee) {
      // redirect to the edit employee page
      this.$router.push(`/employees/${employee.id}/edit`);
    }
  },
  mounted() {
    // fetch the list of employees from the API
    axios.get('http://localhost:3000/employees')
      .then(response => {
        this.employees = response.data;
      })
      .catch(error => console.log(error));
  }
};
</script>