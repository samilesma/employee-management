import { createRouter, createWebHistory } from 'vue-router';
import EmployeeOverview from '@/components/employees/EmployeeOverview.vue';
import CreateEmployee from '@/components/employees/CreateEmployee.vue';
import UpdateEmployee from '@/components/employees/UpdateEmployee.vue';

const routes = [
  {
    path: '/',
    name: 'employee-overview',
    component: EmployeeOverview
  },
  {
    path: '/employees/create',
    name: 'create-employee',
    component: CreateEmployee
  },
  {
    path: '/employees/:id/edit',
    name: 'update-employee',
    component: UpdateEmployee
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;