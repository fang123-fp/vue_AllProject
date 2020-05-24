import Vue from 'vue';
import {
  Loading, PullRefresh,
  Tab, Tabs, Rate, ActionSheet,
} from 'vant';
import App from './App.vue';
import router from './router';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'normalize.css';
import './assets/icon/iconfont.css';
import $http from './http';
import $bus from './EventBus/index';
import store from './vuex/store';

Vue.config.productionTip = false;
Vue.use($http);
Vue.use($bus);
Vue.use(PullRefresh).use(Loading).use(Tab).use(Tabs)
  .use(Rate)
  .use(ActionSheet);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
