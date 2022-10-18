import BuscarViewVue from '@/views/BuscarView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import TelaUpload from '../views/TelaUpload.vue'
import BuscarView from '@/views/BuscarView.vue'
import AdmView from '@/views/AdmView.vue'
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    name: 'about',
    component: AboutView
  },
  {
    path: '/tela-upload',
    name: 'tela-upload',
    component: TelaUpload
  },
  {
    path: '/tela-adm',
    name: 'tela-adm',
    component: BuscarView
  },
  {
    path: '/administrador',
    name: 'administrador',
    component: AdmView
    path: '/login',
    name: 'login',
    component: Login
  }


  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  const estaAutenticado = localStorage.getItem('userToken');

  // booleana que verifica se usuario esta numa tela pertencente aos admins
  const isTelaAdmin = to.name.includes('tela-upload') || 
                      to.name.includes('Dashboard')

  if (isTelaAdmin && !estaAutenticado) {
    return { name: 'about' }
  }
})

export default router
