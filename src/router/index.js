/**
 * create by zhangxiang on 2021-11-30 21:49
 * 类注释：
 * 备注：
 */

import Vue from 'vue'
import Router from 'vue-router'

const routers = [
  {
    path: '/',
    name: 'homes',
    redirect: '/home',
    component: resolve => require(['@/components/layout.vue'], resolve),
    meta: { index: 1 },
    children: [
      {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/views/home.vue'], resolve),
        meta: { index: 1 }
      },
      {
        path: '/mine',
        name: 'mine',
        component: resolve => require(['@/views/mine.vue'], resolve),
        meta: { index: 1 }
      }
    ]
  },
  {
    path: '/menuList',
    name: 'menuList',
    component: resolve => require(['@/views/menuList.vue'], resolve),
    meta: { index: 3 }
  },
  {
    path: '/bookDetail',
    name: 'bookDetail',
    component: resolve => require(['@/views/bookDetail.vue'], resolve),
    meta: { index: 4 }
  },
  {
    path: '/typeList',
    name: 'typeList',
    component: resolve => require(['@/views/typeList.vue'], resolve),
    meta: { index: 2 }
  },
  {
    path: '/topFifty',
    name: 'topFifty',
    component: resolve => require(['@/views/topFifty.vue'], resolve),
    meta: { index: 2 }
  },
  {
    path: '/search',
    name: 'search',
    component: resolve => require(['@/views/search.vue'], resolve),
    meta: { index: 2 }
  },
  {
    path: '/bookFrom',
    name: 'bookFrom',
    component: resolve => require(['@/views/bookFrom.vue'], resolve),
    meta: { index: 2 }
  },
  {
    path: '/history',
    name: 'history',
    component: resolve => require(['@/views/history.vue'], resolve),
    meta: { index: 2 }
  },
  {
    path: '/setting',
    name: 'setting',
    component: resolve => require(['@/views/setting.vue'], resolve),
    meta: { index: 3 }
  },
  {
    path: '/test',
    name: 'test',
    component: resolve => require(['@/views/test.vue'], resolve),
    meta: { index: 2 }
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
})

export default vueRouter
