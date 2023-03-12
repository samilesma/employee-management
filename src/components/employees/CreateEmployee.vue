<template>
    <div class="container">
      <h1>Opret medarbejder</h1>
      <form @submit.prevent="createEmployee">
        <div class="form-group">
          <label for="name">Navn:</label>
          <input type="text" id="name" v-model="employee.name" required />
        </div>
        <div class="form-group">
          <label for="title">Titel:</label>
          <input type="text" id="title" v-model="employee.title" required />
        </div>
        <div class="form-group">
          <label for="function">Arbejdsfunktion:</label>
          <input type="text" id="function" v-model="employee.function" required />
        </div>
        <div class="form-group">
          <label for="workshop">Værksted:</label>
          <select id="workshop" v-model="employee.workshopId" required>
            <option value="">Vælg et værksted</option>
            <option v-for="workshop in workshops" :key="workshop.id" :value="workshop.id">{{ workshop.name }}</option>
          </select>
        </div>
        <div class="button-group">
          <button class="button primary">Opret</button>
          <button class="button alert" @click="$router.back()">Gå tilbage</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import employeeService from '@/services/employeeService';
  import workshopService from '@/services/workshopService';

  export default {
    data() {
      return {
        employee: {
          name: '',
          title: '',
          function: '',
          workshopId: ''
        },
        workshops: []
      };
    },
    async created() {
      this.workshops = (await workshopService.getAllWorkshops()).data
    },
    methods: {
      async createEmployee() {
        await employeeService.createEmployee(this.employee)
        this.$router.push('/')
      }
    }
  };
  </script>
  