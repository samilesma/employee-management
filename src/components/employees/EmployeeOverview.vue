<template>
  <div class="container">
    <h1>Medarbejderoversigt</h1>
    <div class="button-group">
      <button class="button primary" @click="createEmployee">Opret medarbejder</button>
      <input type="text" v-model="searchQuery" placeholder="Søg efter navn" />
    </div>
    <table>
      <thead>
        <tr>
          <th @click="sort('name')">Navn
            <span v-if="sorting.field === 'name' && sorting.direction === 'asc'">&#x25B2;</span>
            <span v-if="sorting.field === 'name' && sorting.direction === 'desc'">&#x25BC;</span>
          </th>
          <th @click="sort('title')">Titel
            <span v-if="sorting.field === 'title' && sorting.direction === 'asc'">&#x25B2;</span>
            <span v-if="sorting.field === 'title' && sorting.direction === 'desc'">&#x25BC;</span>
          </th>
          <th @click="sort('function')">Arbejdsfunktion
            <span v-if="sorting.field === 'function' && sorting.direction === 'asc'">&#x25B2;</span>
            <span v-if="sorting.field === 'function' && sorting.direction === 'desc'">&#x25BC;</span>
          </th>
          <th @click="sort('workshop.name')">
            Værksted
            <span v-if="sorting.field === 'workshop.name' && sorting.direction === 'asc'">&#x25B2;</span>
            <span v-if="sorting.field === 'workshop.name' && sorting.direction === 'desc'">&#x25BC;</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.title }}</td>
          <td>{{ employee.function }}</td>
          <td>{{ employee.workshop.name }}</td>
          <td>
            <button class="button secondary" @click="editEmployee(employee)">Rediger</button>
            <button class="button alert" @click="deleteEmployee(employee.id)">Slet</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import EmployeeService from '@/services/employeeService';

export default {
  data() {
    return {
      employees: [],
      sorting: {
        field: 'name',
        direction: 'asc'
      }
    };
  },
  async created() {
    this.employees = (await EmployeeService.getAllEmployees()).data
  },
  computed: {
    // return a filtered list of employees based on the search query
    filteredEmployees() {
      const employees = [...this.employees]
      const field = this.sorting.field
      const direction = this.sorting.direction === 'asc' ? 1 : -1
      employees.sort((a, b) => {
        if (field === 'workshop.name') {
          a = a.workshop.name
          b = b.workshop.name
        } else {
          a = a[field].toLowerCase()
          b = b[field].toLowerCase()
        }
        if (a < b) {
          return -direction
        }
        if (a > b) {
          return direction
        }
        return 0
      })
      return employees
    }
  },
  methods: {
    // redirect to the create employee page
    createEmployee() {
      this.$router.push('/employees/create');
    },
    // remove the employee from the list of employees
    async deleteEmployee(id) {
      await EmployeeService.deleteEmployee(id)
      this.employees = this.employees.filter(employee => employee.id !== id)
      this.showToast('Employee deleted successfully')
    },
    // redirect to the edit employe page
    editEmployee(employee) {
      this.$router.push(`/employees/${employee.id}/edit`);
    },
    // sort the employees by field
    sort(field) {
      if (field === this.sorting.field) {
        this.sorting.direction = this.sorting.direction === 'asc' ? 'desc' : 'asc'
      } else {
        this.sorting.field = field
        this.sorting.direction = 'asc'
      }
    }
  }
};
</script>