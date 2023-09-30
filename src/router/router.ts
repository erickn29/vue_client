import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from "vue-router"
import VacancyList from '../components/VacancyList.vue'
import Stats from '../components/Stats.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'VacancyList',
    component: VacancyList
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router