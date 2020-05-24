import Vue from 'vue';
import { setStore } from '../config/mStorage';

export const state = Vue.observable({
  vantLoadingIsShow: false, // 更改loading状态
  userInfo: '', // 存放登录信息
  shoppingAttrs: {
    category_id: '',
    item_id: '',
    food_id: '',
    name: '',
    price: '',
    specs: '',
    packing_fee: '',
    sku_id: '',
    stock: '',
  },

});


export const mutations = {
  showLoading() {
    state.vantLoadingIsShow = true;
  },
  hideLoading() {
    state.vantLoadingIsShow = false;
  },
  setState(val) {
    state.userInfo = val;
    setStore('userInfo', state.userInfo);
  },
  setshoppingAttrs(val) {
    state.shoppingAttrs = val;
  },
};
