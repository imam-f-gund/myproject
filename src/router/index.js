import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Listdata from '@/components/Listdata'
import Login from '@/components/authentication/Login'
import Hello from '@/components/HelloWorld'
import category from '@/components/category'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component:Home
    },
    {
      path: '/img',
      name: 'Listdata',
      component: Listdata
    },
     {
        path: "/Login/:id", //params
        name: 'Login',
        component: Login
      },
      {
        path: '/img2',
      name: 'HelloWorld',
      component: Hello
      },
      {
        path: '/category',
      name: 'category',
      component: category
      }
  ]
})
