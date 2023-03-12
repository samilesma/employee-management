<template>
    <div class="container">
      <h1>Rediger medarbejder</h1>
      <form @submit.prevent="updateEmployee">
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
          <button class="button primary">Gem</button>
          <button class="button alert" @click.prevent="$router.back()">Gå tilbage</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import employeeService from '@/services/employeeService';
  import workshopService from '@/services/workshopService';
  import { useToast } from "vue-toastification";
  export default {
    data() {
      return {
        employee: {
          name: '',
          title: '',
          function: '',
          workshopId: ''
        },
        workshops: [],
        showToast: useToast()
      };
    },
    async created() {
      await this.loadWorkshops();
      await this.loadEmployee();
    },
    methods: {
      async loadEmployee() {
        const employeeId = this.$route.params.id;
        const response = await employeeService.getEmployee(employeeId);
        this.employee = response.data;
      },
      async updateEmployee() {
        await employeeService.updateEmployee(this.employee);
        this.showToast.success('Medarbejderen er opdateret.');
        this.$router.push('/');
      },
      async loadWorkshops() {
        const response = await workshopService.getAllWorkshops();
        this.workshops = response.data;
      },
    },
  };
  </script>
  