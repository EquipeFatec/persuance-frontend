import BuscarViewVue from '@/views/BuscarView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import TelaUpload from '../views/TelaUpload.vue'
import BuscarView from '@/views/BuscarView.vue'
import AdmView from '@/views/AdmView.vue'
import Login from '../views/Login.vue'
import PalavraList from '../views/PalavraListView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: BuscarView
  },
  {
    path: '/tela-upload',
    name: 'tela-upload',
    component: TelaUpload
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/administrador',
    name: 'administrador',
    component: AdmView
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/palavra-list',
    name: 'palavra-list',
    component: PalavraList
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
                      to.name.includes('palavra-list') ||
                      to.name.includes('about')

  if (isTelaAdmin && !estaAutenticado) {
    return { name: 'home' }
  }
})

export default router