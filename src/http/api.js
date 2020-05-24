import axios from 'axios';
import { mutations } from '../store/index';

const http = axios.create({
  baseURL: 'https://elm.cangdu.org',
  timeout: 2000, // 阻止发送多次请求(节流)
});
http.defaults.withCredentials = true;
// 添加请求拦截器
http.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  mutations.showLoading();
  return config;
}, (error) =>
  // 对请求错误做些什么
  // eslint-disable-next-line implicit-arrow-linebreak
  Promise.reject(error));

// 添加响应拦截器
http.interceptors.response.use((response) => {
  // 对响应数据做点什么
  mutations.hideLoading();
  return response;
}, (error) =>
  // 对响应错误做点什么
  // eslint-disable-next-line implicit-arrow-linebreak
  Promise.reject(error));


// eslint-disable-next-line import/prefer-default-export
const gitGroup = () => http.get('/v1/cities?type=group');

const gitHot = () => http.get('/v1/cities?type=hot');

const gitGuess = () => http.get('/v1/cities?type=guess');

const gitSearch = (params) => http.get('/v1/pois', { params });

const gitVerificationCode = (params) => http.post('/v1/captchas', { params });
// 登录api
const gitPhoneLogin = (params) => http.post('/v2/login', { username: params.username, password: params.password, captcha_code: params.captcha_code });
// 修改密码(重置密码)
const gitPhonepassword = (params) => http.post('/v2/changepassword', {
  username: params.username,
  oldpassWord: params.oldpassWord,
  newpassword: params.newpassword,
  confirmpassword: params.confirmpassword,
  captcha_code: params.captcha_code,
});

const gitRestaurants = (params) => http.get('/shopping/restaurants', { params });

const gitRestaurantsSearch = (params) => http.get('/v4/restaurants', { params });

const gitShoppingData = (params) => http.get('/shopping/v2/menu', { params });
// 获取评论信息
const gitShoppingRatings = (params) => http.get(`/ugc/v2/restaurants/${params.restaurant_id}/ratings`, { params });
// 获取餐馆详情
const gitRestaurantDetails = (params) => http.get(`/shopping/restaurant/${params.shopid}`, { params });
// 获取评价分类
const gitratingsTags = (params) => http.get(`/ugc/v2/restaurants/${params.restaurant_id}/ratings/tags`, { params });

// 获取收货地址列表
const gitAddresses = (params) => http.get(`/v1/users/${params.user_id}/addresses`, { params });

// 删除收货地址
const gitRemoveAddresses = (params) => http.delete(`/v1/users/${params.user_id}/addresses/${params.address_id}`, { params });
// 增加收货地址
const gitAddAddresses = (params) => http.post(`/v1/users/${params.user_id}/addresses`, {
  user_id: params.user_id,
  address: params.address,
  address_detail: params.address_detail,
  geohash: params.geohash,
  name: params.name,
  phone: params.phone,
  tag: params.tag,
  poi_type: params.poi_type,
  phone_bk: params.phone_bk,
  tag_type: params.tag_type,
  sex: params.sex,
});
// 搜索地址
const gitSearchNearby = (params) => http.get('/v1/pois', { params });

// 可用红包
const gitUsePromotion = (params) => http.get(`/promotion/v2/users/${params.user_id}/hongbaos`, { params });

// 过期红包
const gitUseExpired = (params) => http.get(`/promotion/v2/users/${params.user_id}/expired_hongbaos`, { params });

export default {
  gitGroup,
  gitHot,
  gitGuess,
  gitSearch,
  gitVerificationCode,
  gitPhonepassword,
  gitRestaurants,
  gitRestaurantsSearch,
  gitPhoneLogin,
  gitShoppingData,
  gitShoppingRatings,
  gitRestaurantDetails,
  gitratingsTags,
  gitAddresses,
  gitRemoveAddresses,
  gitAddAddresses,
  gitSearchNearby,
  gitUsePromotion,
  gitUseExpired,
};
