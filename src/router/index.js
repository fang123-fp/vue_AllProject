import Vue from 'vue';
import VueRouter from 'vue-router';

const components = {};
const getFiles = require.context('../pages', true, /\.vue$/);
getFiles.keys().forEach((path) => {
  const component = getFiles(path).default;
  components[component.name] = component;
});

Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'index',
    component: components.index,
  },
  {
    path: '/city',
    name: 'cityIndex',
    component: components.cityIndex,
  },
  {
    path: '/login',
    name: 'loginIndex',
    component: components.loginIndex,
  },
  {
    path: '/reset',
    name: 'resetIndex',
    component: components.resetIndex,
  },
  {
    path: '/home',
    name: 'homeIndex',
    component: components.homeIndex,
  },
  {
    path: '/search',
    name: 'searchIndex',
    component: components.searchIndex,
  },
  {
    path: '/shop',
    name: 'shopIndex',
    component: components.shopIndex,
  },
  {
    path: '/mine',
    name: 'mine',
    component: components.mine,
  },
  {
    path: '/mine/info',
    name: 'info',
    component: components.info,
  },
  {
    path: '/order',
    name: 'order',
    component: components.order,
  },
  {
    path: '/confirmOrder',
    name: 'confirmOrder',
    component: components.confirmOrder,
  },
  {
    path: '/confirmOrder/addAddress',
    name: 'addAddress',
    component: components.addAddress,
  },
  {
    path: '/confirmOrder/addAddress/searchAddress',
    name: 'searchAddress',
    component: components.searchAddress,
  },
  {
    path: '/mine/redEnvelope',
    name: 'redEnvelope',
    component: components.redEnvelope,
  },

];

const router = new VueRouter({
  routes,
});

export default router;
