import Vue from 'vue';

export default {
  install(ins) {
    // eslint-disable-next-line no-param-reassign
    ins.prototype.$bus = new Vue();
  },
};
