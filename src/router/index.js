import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/views/Shop')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout')
  },
	{
    path: '/404',
    name: '404',
		component: () => import('@/views/Error'),
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
	routes,
	
	scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
