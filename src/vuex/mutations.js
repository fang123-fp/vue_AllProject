/* 一个包含n个用于直接修改状态数据的方法的对象
* mutations方法不要包含异步或逻辑处理代码
 */
import {
  ADD_CART,
  INIT_BUYCART,
  REDUCE_CART,
  CLEAR_CART,
} from './mutation-types';

import { setStore, getStore } from '../config/mStorage';


export default {
  // 加入购物车
  [ADD_CART](state, {
    // eslint-disable-next-line camelcase
    shopid, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, image_path,
  }) {
    const cart = state.cartList;
    // eslint-disable-next-line no-multi-assign
    const shop = cart[shopid] = (cart[shopid] || {}); // 商品id
    // eslint-disable-next-line no-multi-assign
    const category = shop[category_id] = (shop[category_id] || {}); // 分类id
    // eslint-disable-next-line no-multi-assign
    const item = category[item_id] = (category[item_id] || {}); // 项目编号
    if (item[food_id]) {
      // eslint-disable-next-line dot-notation
      item[food_id]['num'] += 1;
    } else {
      item[food_id] = {
        num: 1,
        id: food_id,
        name,
        price,
        specs,
        packing_fee,
        sku_id,
        stock,
        image_path,
      };
    }
    // 存入localStorage
    setStore('buyCart', state.cartList);
  },
  // 移出购物车
  [REDUCE_CART](state, {
    // eslint-disable-next-line camelcase
    shopid, category_id, item_id, food_id,
  }) {
    const cart = state.cartList;
    const shop = (cart[shopid] || {});
    const category = (shop[category_id] || {});
    const item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id].num > 0) {
        item[food_id].num -= 1;
        if (item[food_id].num === 0) {
          delete cart[shopid][category_id][item_id];
        }
      } else {
        // 商品数量为0，则清空当前商品的信息
        delete cart[shopid][category_id][item_id];
      }
    }
    // 存入localStorage
    setStore('buyCart', state.cartList);
  },
  // 清除购物车
  [CLEAR_CART](state, shopid) {
    state.cartList[shopid] = null;
    state.cartList = { ...state.cartList };
    setStore('buyCart', state.cartList);
  },

  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART](state) {
    const initCart = getStore('buyCart');
    if (initCart) {
      state.cartList = JSON.parse(initCart);
    }
  },
};
