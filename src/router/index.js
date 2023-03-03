import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/main/index.vue')
  },
  {
    path: '/file-create',
    name: 'file_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/file/index.vue')
  },
  {
    path: '/tools-python-config-version',
    name: 'tools-python-config-version',
    component: () => import(/* webpackChunkName: "about" */ '../views/tools/manage/version/python.vue')
  },
  {
    path: '/tools-node-config-version',
    name: 'tools-node-config-version',
    component: () => import(/* webpackChunkName: "about" */ '../views/tools/manage/version/node.vue')
  },
  {
    path: '/tools-request-utils-about',
    name: 'tools-request-utils-about',
    component: () => import(/* webpackChunkName: "about" */ '../views/tools/request/Utils.vue')
  },
  {
    path: '/develop-feige-chuantou',
    name: 'develop-feige-chuantou',
    component: () => import(/* webpackChunkName: "about" */ '../views/develop/feige/index.vue')
  },
  {
    path: '/develop-feige-chuantou',
    name: 'develop-xiaomiqiu-chuantou',
    component: () => import(/* webpackChunkName: "about" */ '../views/develop/xiaomiqio/index.vue')
  },
  {
    path: '/develop-natapp-chuantou',
    name: 'develop-natapp-chuantou',
    component: () => import(/* webpackChunkName: "about" */ '../views/develop/natapp/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let originPush =  VueRouter.prototype.push;  //备份原push方法

VueRouter.prototype.push = function (location, resolve, reject){
  if (resolve && reject) {    //如果传了回调函数，直接使用
    originPush.call(this, location, resolve, reject);
  }else {                     //如果没有传回调函数，手动添加
    originPush.call(this, location, ()=>{}, ()=>{});
  }
}

export default router
