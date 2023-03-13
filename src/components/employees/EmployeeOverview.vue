<template>
  <div class="container">
    <h1>Medarbejderoversigt</h1>
    <div class="button-group">
      <input id="searchQuery" type="text" v-model="searchQuery" placeholder="Søg efter navn" @input="search"/>
      <button class="button primary" @click="createEmployee">Opret medarbejder</button>
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
        <tr v-for="employee in employees" :key="employee.id">
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
    <custom-pagination
      :current-page="page"
      :total-pages="totalPages"
      @page-changed="pageChanged"
    ></custom-pagination>
  </div>
</template>

<script>
import EmployeeService from '@/services/employeeService';
import { useToast } from "vue-toastification";
import CustomPagination from '@/components/CustomPagination.vue';

export default {
  components: {
    CustomPagination,
  },
  data() {
    return {
      employees: [],
      sorting: {
        field: 'name',
        direction: 'asc'
      },
      searchQuery: '',
      page: 1,
      pageSize: 2,
      totalEmployees: 0,  
      showToast: useToast()
    };
  },
  async created() {
    document.addEventListener('keydown', this.handleKeydown)
    this.loadEmployees();
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleKeydown)
  },
  computed: {
    filteredEmployees() {
      return this.employees;
    },
    totalPages() {
      return Math.ceil(this.totalEmployees / this.pageSize);
    },
  },
  methods: {
    // load all employees.
    async loadEmployees() {
      const response = await EmployeeService.getAllEmployees(
        this.page,
        this.pageSize,
        this.searchQuery,
        this.sorting.field,
        this.sorting.direction.toLowerCase()
      );
      this.employees = response.data;
      this.totalEmployees = response.headers['x-total-count'];
    },
    // redirect to the create employee page
    createEmployee() {
      this.$router.push('/employees/create');
    },
    // remove the employee from the list of employees
    async deleteEmployee(id) {
      await EmployeeService.deleteEmployee(id)
      this.employees = this.employees.filter(employee => employee.id !== id)
      this.showToast.success('Medarbejderen blev slettet')
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

      this.loadEmployees();
    },
    handleKeydown(event) {
      const isSearchInput =  event.target.id === 'searchQuery';
      if (isSearchInput) return;

      switch (event.key.toLowerCase()) {
        case 'n':
          this.sort('name');
          break;
        case 't':
          this.sort('title');
          break;
        case 'a':
          this.sort('function');
          break;
        case 'v':
          this.sort('workshop.name');
          break;
        case 's':
          event.preventDefault();
          document.getElementById('searchQuery').focus();
          break;
      }
    },
    // Search employee
    async search() {
      this.page = 1;
      this.totalEmployees = 0;
      await this.loadEmployees();
    },
    async pageChanged(page) {
      this.page = page;
      await this.loadEmployees();
    }
  },
};
</script>