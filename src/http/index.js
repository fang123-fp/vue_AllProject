import http from './api';


export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$http = http;
  },
};
