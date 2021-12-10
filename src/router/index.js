/**
 * create by zhangxiang on 2021-11-30 21:49
 * 类注释：
 * 备注：
 */

import Vue from 'vue'
import Router from 'vue-router'

const routers = [
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index.vue'], resolve)
  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['@/views/home.vue'], resolve)
  },
  {
    path: '/menuList',
    name: 'menuList',
    component: resolve => require(['@/views/menuList.vue'], resolve)
  },
  {
    path: '/bookDetail',
    name: 'bookDetail',
    component: resolve => require(['@/views/bookDetail.vue'], resolve)
  },
  {
    path: '/history',
    name: 'history',
    component: resolve => require(['@/views/history.vue'], resolve)
  },
  {
    path: '/typeList',
    name: 'typeList',
    component: resolve => require(['@/views/typeList.vue'], resolve)
  },
  {
    path: '/topFifty',
    name: 'topFifty',
    component: resolve => require(['@/views/topFifty.vue'], resolve)
  },
  {
    path: '/search',
    name: 'search',
    component: resolve => require(['@/views/search.vue'], resolve)
  },
  /** 重定向*/
  {
    path: '*',
    redirect: { name: 'home' } // 重定向
  }
]
Vue.use(Router)
const vueRouter = new Router({
  routes: routers
}
)

export default vueRouter
