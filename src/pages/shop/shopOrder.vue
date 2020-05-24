<template>
  <div>
    <!-- 内容 -->
      <div class="order-evaluation__item">
          <!-- 左侧导航栏 -->
          <div class="order-evaluation__item__left">
            <div class="order-evaluation__item__left__warpper">
              <div class="order-evaluation__item__left__item"
                  v-for="(item,index) in sellData" :key="index"
                  :class="{active:index==value}"
                  @click="choose(index,item)">
                <span class="order-evaluation__item__left__item__text">{{ item }}</span>
              <!--  <span class="order-evaluation__item__left__item__count">1</span> -->
              </div>
            </div>
          </div>
          <!-- 右侧内容 -->
          <div class="order-evaluation__item__right">
              <div>
                <!-- 标题 -->
                <div class="order-evaluation__item__right__title">{{ titleName }}</div>
                <!-- 内容 -->
                <div class="order-evaluation__item__right__item">
                      <div class="index-film"
                        v-for="(item,index) in evaluationItem" :key="index" >
                            <div class="index-film__pic">
                                <img :src="showPicUrl+item.image_path" alt=""
                                class="index-film__pic__img"/>
                            </div>
                            <div class="index-film__text">
                                <div class="index-film__text__title">
                                  {{ item.name }}</div>
                                <div class="index-film__text__description">
                                  {{ item.description | toPrivacy() }}</div>
                                <div class="index-film__text__score">
                                  月售{{ item.month_sales }}份</div>
                                <div class="index-film__text__discount">
                                  <span class="index-film__text__discount__item">
                                      7.1折</span>
                                </div>
                                <div class="index-film__text__money">
                                  <span class="index-film__text__money__currentPrice">
                                    ￥{{ item.specfoods[0].price }}
                                  </span>
                                  <span class="index-film__text__money__originalPrice">
                                    ￥100
                                  </span>
                                  <!-- <span class="index-film__text__money__add">+</span> -->
                                  <buycart :shopId="shopId" :foods='item'  @c="listenInCart"  @showMoveDot="showMoveDotFun"></buycart>
                                </div>
                            </div>
                      </div>
                </div>
              </div>
          </div>
      </div>
      <!-- 结算内容 -->
      <section class="buy_cart_container">
          <section class="cart_icon_num">
              <div class="cart_icon_container" :class="{cart_icon_activity: totalPrice > 0 , move_in_cart: receiveInCart}" ref="cartContainer" @click="isShowContenter">
                  <span v-if="totalNum" class="cart_list_length">
                    {{ totalNum }}
                  </span>
                  <div class="cart_icon">
                    <i :class="['iconfont icon-gouwuche1 ',{'iconColor': totalPrice > 0}]"></i>
                  </div>
              </div>
              <div class="cart_num" v-if="!(totalPrice > 0)">
                  <div>未选购商品</div>
                  <div>另需配送费0.6元</div>
              </div>
              <div class="cart_num cart_num__active" v-if="totalPrice > 0">
                  <div>¥ {{totalPrice}}</div>
                  <div>{{ $route.query.tips }}</div>
              </div>
          </section>
          <section :class="['gotopay',{'gotopay_acitvity' :totalPrice > 0 }]">
              <span class="gotopay_button_Start" v-if="!(totalPrice > 0)">
                20元起送
              </span>
              <span class="gotopay_button_style " v-if="totalPrice > 0">
                去结算
              </span>
          </section>
      </section>
      <van-action-sheet v-model="show" class="action-sheet">
          <div class="content">
               <header>
                  <div class="content_title">购物车</div>
                  <div class="content_icon">
                    <div @click="shoppingCart">
                      <i class="iconfont icon-shanchu"></i>
                      <span class="clear_cart">清空</span>
                    </div>
                  </div>
              </header>
              <!-- 内容 -->
              <div class="content-buttom">
                  <div class="content-buttom__item" v-for="item in cartFoodList" :key="item.image_path">
                        <div class="content-buttom__item__pic">
                            <img :src="showPicUrl+item.image_path" alt=""
                            class="content-buttom__item__pic__img"/>
                        </div>
                        <div class="content-buttom__item__text">
                            <div class="content-buttom__item__text__name">{{ item.name }}</div>
                            <div class="content-buttom__item__text__price">
                                <span class="content-buttom__item__text__price__currentprice">¥{{ item.price }}</span>
                                <span class="content-buttom__item__text__price__oldprice">¥78.9</span>
                                <section class="cart_button">
                                      <transition name="showReduce">
                                        <span class="showReduce" v-if="item.num"
                                        @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                            <i class="iconfont icon-jianshao"></i>
                                        </span>
                                      </transition>
                                      <transition name="fade">
                                        <span class="fade" v-if="item.num">{{ item.num }}</span>
                                      </transition>
                                      <span  class="increase"
                                        @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                                            <i class="iconfont icon-anonymous-iconfont"></i>
                                      </span>
                                  </section>

                            </div>
                        </div>
                  </div>
              </div>
              <div class="content-Space"></div>
          </div>
      </van-action-sheet>
      <!-- 加号 -->
      <transition appear  @after-appear="afterEnter" @before-appear="beforeEnter" v-for="(item,index) in showMoveDot" :key="index">
        <div class="move_dot" v-if="item">
           <!--  <i class="iconfont icon-anonymous-iconfont"></i> -->
           <img src="../../assets/images/增加.png" alt="">
        </div>
      </transition>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import buycart from '../../components/common/buyCart.vue';

export default {
  name: 'shopOrder',
  data() {
    return {
      sellData: [], // 选线卡标题
      value: 0, // 选项卡下标,默认为0
      titleName: '', // 点击标题的内容
      allDataList: [], // 全部数据
      evaluationItem: [], // 每一项的内容
      showPicUrl: 'https://elm.cangdu.org/img/',
      isCartShow: true,
      show: false,
      totalPrice: '',
      shopId: this.$route.query.id,
      showMoveDot: [], // 控制下落的小圆点显示隐藏
      cartFoodList: [], // 购物车里的数据
      ShoppingDataList: [], // 全部的数据存放
      elLeft: 0, // 当前点击加按钮在网页中的绝对top值
      elBottom: 0, // 当前点击加按钮在网页中的绝对left值
      elTop: 0,
      windowHeight: null, // 屏幕的高度
      windowWidht: null, // 屏幕的高度
      receiveInCart: false, // 购物车组件下落的圆点是否到达目标位置
    };
  },
  created() {
    this.UpdateName();
    this.restaurantId();
    this.INIT_BUYCART();
  },
  methods: {
    ...mapMutations([
      'ADD_CART', 'INIT_BUYCART', 'REDUCE_CART', 'CLEAR_CART',
    ]),
    choose(val, item) {
      this.value = val;
      this.titleName = item;
      this.evaluationItem = this.allDataList[val].foods;
    },
    UpdateName() {
      // eslint-disable-next-line prefer-destructuring
      this.titleName = this.sellData[0];
    },
    // 加入购物车
    // eslint-disable-next-line camelcase
    addToCart(category_id, item_id, food_id, name, price, specs) {
      this.ADD_CART({
        // eslint-disable-next-line no-undef
        shopid: this.shopId, category_id, item_id, food_id, name, price, specs,
      });
      this.INIT_BUYCART();
    },
    // 移出购物车
    // eslint-disable-next-line camelcase
    removeOutCart(category_id, item_id, food_id, name, price, specs) {
      this.REDUCE_CART({
        // eslint-disable-next-line no-undef
        shopid: this.shopId, category_id, item_id, food_id, name, price, specs,
      });
      this.INIT_BUYCART();
    },

    // 餐馆信息
    restaurantId() {
      this.$http.gitShoppingData({
        restaurant_id: this.$route.query.id,
      })
        .then((res) => {
          res.data.forEach((item) => {
            this.sellData.push(item.name);
          });
          this.allDataList = res.data;
          // eslint-disable-next-line prefer-destructuring
          this.evaluationItem = this.allDataList[0].foods;
          this.titleName = res.data[0].name;
          this.ShoppingDataList = res.data;
          // 获取购物车数据
          this.initCategoryNum();
        }).catch((err) => {
          console.log(err.message);
        });
    },
    // 是否显示购物车
    isShowContenter() {
      this.show = !this.show;
    },
    // 获取购物车的数据
    initCategoryNum() {
      let cartFoodNum = 0;
      this.totalPrice = 0;
      this.cartFoodList = [];
      this.ShoppingDataList.forEach((item, index) => {
        if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
          let num = 0;
          Object.keys(this.shopCart[item.foods[0].category_id]).forEach((itemid) => {
            Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach((foodid) => {
              const foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid];
              num += foodItem.num;
              if (item.type === 1) {
                this.totalPrice += foodItem.num * foodItem.price;
                if (foodItem.num > 0) {
                  this.cartFoodList[cartFoodNum] = {};
                  this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id;
                  this.cartFoodList[cartFoodNum].item_id = itemid;
                  this.cartFoodList[cartFoodNum].food_id = foodid;
                  this.cartFoodList[cartFoodNum].num = foodItem.num;
                  this.cartFoodList[cartFoodNum].price = foodItem.price;
                  this.cartFoodList[cartFoodNum].name = foodItem.name;
                  this.cartFoodList[cartFoodNum].specs = foodItem.specs;
                  this.cartFoodList[cartFoodNum].image_path = foodItem.image_path;
                  cartFoodNum += 1;
                }
              }
            });
          });
        }
      });
      this.totalPrice = this.totalPrice.toFixed(2);
    },
    // 清空购物车
    shoppingCart() {
      this.CLEAR_CART(this.shopId);
      this.show = false;
    },
    // 显示下落圆球
    // eslint-disable-next-line camelcase
    showMoveDotFun(showMoveDot, elLeft, elBottom, elTop) {
      this.showMoveDot = [...this.showMoveDot, ...showMoveDot];
      this.elLeft = elLeft;
      this.elBottom = elBottom;
      this.elTop = elTop;
    },
    // 监听圆点是否进入购物车
    listenInCart() {
      if (!this.receiveInCart) {
        this.receiveInCart = true;
        this.$refs.cartContainer.addEventListener('animationend', () => {
          this.receiveInCart = false;
        });
        this.$refs.cartContainer.addEventListener('webkitAnimationEnd', () => {
          this.receiveInCart = false;
        });
      }
    },
    // 动画
    beforeEnter(el) {
      const x = this.elLeft - 40; // 点击元素的左边距离 - 下面购物车左边的距离，就是小球要运动的X轴距离
      const y = -(window.innerHeight - this.elTop - 11); // 窗口的高度 - 点击元素离窗口的高度 - 购物车底部的padding,margin高度，就是小球要运动的y轴距离，且是向下运动，所以是负值
      // eslint-disable-next-line no-param-reassign
      el.style.transform = `translate3d( 0, ${y}px, 0)`; // 外层做纵轴运动
      // eslint-disable-next-line no-param-reassign
      el.children[0].style.transform = `translate3d( ${x}px,0, 0)`; // 内层做横轴运动
      // eslint-disable-next-line no-param-reassign
      el.children[0].style.opacity = 0;
    },
    afterEnter(el) {
      // eslint-disable-next-line no-param-reassign
      el.style.transform = 'translate3d(0,0,0)';
      // eslint-disable-next-line no-param-reassign
      el.children[0].style.transform = 'translate3d(0,0,0)';
      // eslint-disable-next-line no-param-reassign
      el.style.transition = 'transform .55s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
      // eslint-disable-next-line no-param-reassign
      el.children[0].style.transition = 'transform .55s linear';
      this.showMoveDot = this.showMoveDot.map(() => false);
      // eslint-disable-next-line no-param-reassign
      el.children[0].style.opacity = 1;
      el.children[0].addEventListener('transitionend', () => {
        this.listenInCart();
      });
      el.children[0].addEventListener('webkitAnimationEnd', () => {
        this.listenInCart();
      });
    },
  },
  mounted() {
    this.windowHeight = window.innerHeight;
    this.windowWidht = window.innerWidth;

    /*  this.scroller = new BScroll(this.$refs.wrapper, {
      scrollY: true, // 纵向滚动
      click: true, // 点击触发事件
    }); */
  },
  computed: {
    ...mapState([
      'cartList',
    ]),
    // 当前商店购物信息
    shopCart() {
      return { ...this.cartList[this.shopId] };
    },
    // 购物车中总共商品的数量
    totalNum() {
      let num = 0;
      this.cartFoodList.forEach((item) => {
        num += item.num;
      });
      return num;
    },
  },
  // 检测购物车数据的变化
  watch: {
    shopCart() {
      this.initCategoryNum();
    },
  },
  filters: {
    toPrivacy(value) {
      if (value.length > 5) {
        return `${value.substring(0, 15)}...`;
      }
      return value;
    },
  },
  components: {
    buycart,
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/commonStyle.scss';
 @keyframes mymove{
      0%   { transform: scale(1) }
      25%  { transform: scale(.8) }
      50%  { transform: scale(1.1) }
      75%  { transform: scale(.9) }
      100% { transform: scale(1) }
  }
.order-evaluation{
  width: 100%;
  &__item{
    width: 100%;
    height:63vh;
    margin-top: 10px;
    display: flex;
    overflow: hidden;
    &__contenter{
      width: 100%;
      height:63vh;
    }
    &__left{
      width: 20%;
      height: 64vh;
      background-color: #F8F8F8;
      &__warpper{
        width: 100%;
        height: 70vh;
      }
      &__item{
        width: 100%;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &__text{
          font-size: 22px;
          color: #000;
        }
        &__count{
          width: 30px;
          height: 30px;
          background-color: #ff461d;
          line-height:30px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #ff461d;
          font-size: 22px;
          color: #fff;
          position: absolute;
          right: 0px;
          top: 0px;
        }
      }
    }
    &__right{
      width: 75%;
      height: inherit;
      padding-left: 5%;
      background-color: #fff;
      &__title{
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 23px;
        color: #666666;
      }
      &__item{
        width: 100%;
        margin-top: 35px;
        .index-film{
          width: 100%;
          height: 350px;
          display: flex;
          margin-left: 2%;
          &__pic{
            width: 30%;
            height: inherit;
            display: flex;
            justify-content: center;
            &__img{
              width: 250px;
              height: 250px;
            }
          }
          &__text{
            width: 67%;
            margin-left: 3%;
            height: inherit;
            &__title{
              width:100%;
              height: 35px;
              font-weight: 800;
              font-size: 27px;
              color: #000;
              line-height:35px;
            }
            &__description{
              width: 100%;
              height: 52px;
              font-size: 18px;
              color: #B1B1B1;
              line-height:52px;
              margin: 17px 0px 16px;
            }
            &__score{
              width: 100%;
              height: 32px;
              font-size: 21px;
              color: #B1B1B1;
              line-height:21px;
            }
            &__discount{
               margin: 15px 0px 13px;
              &__item{
                font-size: 18px;
                color: #F29385;
                border: 1px solid;
                padding:5px 6px;
              }
            }
            &__money{
              display: flex;
              position: relative;
              margin-top: 20px;
              &__currentPrice{
                font-size: 22px;
                color: #FF5339;
              }
              &__originalPrice{
                font-size: 15px;
                color: #999999;
                text-decoration:line-through;
                margin-left: 12px;
              }
              /* &__add{
                width: 45px;
                height: 45px;
                border-radius:50px;
                background-color: #2295FF;
                display: flex;
                justify-content: center;
                color: #fff;
                font-size: 24px;
                position: absolute;
                right: 60px;
              } */
            }

          }
        }
      }
    }
  }
  &__businesSreviews{
    width: 100%;
    height: 64vh;
    background-color:#F5F5F5;
    &__item{
      width: 100%;
      height:195px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      padding: 58px 0px 74px;
      &__merchant{
        width: 170px;
        height: inherit;
        font-size: 55px;
        color: #FF6002;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &__rating{
        width: 170px;
        height: inherit;
        text-align: center;
        &__text{
          font-size:22px ;
          color: #7F7F7F;
          padding-top: 45%;
        }
        &__copies{
          font-size:18px ;
          color: #FFCF01;
          margin-top: 14px;
        }
      }
      &__taste{
        @include commShopStyle();
        &__text{
          @include commShopSize(22px,#7F7F7F,43%);
        }
        &__copies{
          @include commShopSize(18px,#6A6A6A,22px);
        }
      }
      &__package{
        @include commShopStyle();
        &__text{
          @include commShopSize(22px,#7F7F7F,43%);
        }
        &__copies{
          @include commShopSize(18px,#6A6A6A,22px);
        }
      }
      &__line{
        width: 2px;
        height: 150px;
        background-color:#DDDDDD;
        margin-top:4%;
      }
      &__delivery{
        @include commShopStyle();
        &__text{
          @include commShopSize(22px,#7F7F7F,43%);
        }
        &__copies{
           @include commShopSize(18px,#6A6A6A,22px);
        }
      }
    }
    &__select{
      width:100%;
      background-color: #fff;
      &__condition{
        width:95%;
        height: 110px;
        margin-top: 20px;
        margin: 0px auto;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #EEEEEE;
        &__item{
          padding:17px 21px;
          font-size:23px;
          color: #6D7885;
          background-color: #EBF5FF;
          margin: 0px 16px 0px 0px;

        }
        .negativeRatings{
          background-color: #F5F5F5;
          color: #AAAAAA;
        }
      }
      &__options{
        width:95%;
        margin: 0px auto;
        height: 80px;
        font-size: 24px;
        color: #676767;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #EEEEEE;
        .icon-fuxuankuang-yuan-xuanzhong{
          margin: 0px 10px 0px;
          color: #E8E8E8;
        }
        .iconColor{
          color: #01E46E;
        }
      }
      &__commentList{
        width: 100%;
        &__item{
          width:95%;
          margin: 0px auto;
         /*  height: 150px; */
          border-bottom: 1px solid #EEEEEE;
          display: flex;
          &__left{
            width: 10%;
            height: inherit;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
              width: 75px;
              height: 75px;
              border-radius:50px ;
            }
          }
          &__right{
            width: 88%;
            height: inherit;
            display: flex;
            padding-left: 10px;
            &__text{
              width: 80%;
              height: inherit;
              &__number{
                font-size: 21px;
                color: #333333;
                padding: 37px 0px 20px 0px;
              }
              &__text{
                font-size: 20px;
                color: #FEB300;
                span{
                  color: #FE6512;
                }
              }
              &__literal{
                width: 100%;
                font-size: 21px;
                color: #000;
                margin: 20px 0px;
              }
            }
            &__Date{
              width: 20%;
              height: inherit;
              font-size: 16px;
              color: #999999;
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }

  }
  .buy_cart_container{
    position: absolute;
    background-color: #3d3d3f;
    bottom: 90px;
    z-index: 130;
    opacity: 0.9;
    display: flex;
    @include wh(100%,170px);
    z-index: 10000;
    .cart_icon_num{
        flex: 1;
        .cart_icon_container{
            display: flex;
            background-color: #3d3d3f;
            position: absolute;
            padding: 35px;
            border: 15px solid #444;
            border-radius: 50%;
            left: .5rem;
            top: -.7rem;
            .cart_icon{
                @include wh(1.2rem, 1.2rem);
                display: flex;
                justify-content:center;
                align-items: center;
                .icon-gouwuche1{
                  font-size: 70px;
                  color: #5F5F63;
                }
                .iconColor{
                  color: #fff;
                }
            }
            .cart_list_length{
                position: absolute;
                top: -.25rem;
                right: -.25rem;
                background-color: #ff461d;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                border: 0.025rem solid #ff461d;
                min-width: .8rem;
                height: .8rem;
                @include sc(.5rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
            }
        }
        .move_in_cart{
          animation: mymove .5s ease-in-out;
        }
        .cart_icon_activity{
          background-color: #3190e8;
        }
        .cart_num{
            @include ct;
            left: 300px;
            div{
                color: #999999;
            }
            div:nth-of-type(1){
              font-size: 24px;
              margin:15px 0px 11px;
            }
            div:nth-of-type(2){
              font-size: 18px;
            }
        }
        .cart_num__active{
          div{
            color: #fff;
          }
          div:nth-of-type(1){
            font-size: 55px;
            margin:15px 0px 11px;
          }
        }
    }
    .gotopay{
        position: absolute;
        right: 0;
        background-color: #535356;
        @include wh(5rem, 100%);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        .gotopay_button_style{
            @include sc(40px, #fff);
            font-weight: bold;
        }
        .gotopay_button_Start{
          background-color: #535356;
          color: #fff;
          font-size: 28px;
          font-weight: 800;
        }
    }
    .gotopay_acitvity{
        background-color: #4cd964;
    }
  }
  .action-sheet{
    position: absolute;
    bottom: 0px;
    overflow: hidden;
    .content{
      width: 100%;
      header{
        width: 100%;
        height: 174px;
        display: flex;
        position: relative;
        .content_title{
          width: 50%;
          padding: 58px 72px;
          font-size: 42px;
          color: #000;
          font-weight:bold;
        }
        .content_icon{
          width: 50%;
          padding: 55px 0px;
          .clear_cart{
            position: absolute;
            right: 74px;
            font-size: 39px;
            color: #010101;
          }
          .icon-shanchu{
            position: absolute;
            right: 177px;
            font-size: 43px;
            color:#636363;
          }
        }
      }
      .content-buttom{
        &__item{
          width: 100%;
          height: 307px;
          display: flex;
          &__pic{
            width:30%;
            height: 256px;
            display: flex;
            align-items: center;
            &__img{
              width:256px;
              height: 256px;
              margin-left: 80px;
              border-radius:10px ;
            }
          }
          &__text{
            width:70%;
            height: 256px;
            &__name{
              width: 100%;
              font-size: 34px;
              color: #000;
              font-weight: bold;
            }
            &__price{
              margin-top:155px;
              position: relative;
              &__currentprice{
                font-size: 35px;
                color: #FF1815;
                margin-right: 15px;
              }
              &__oldprice{
                font-size: 24px;
                color: #8F8F8F;
                text-decoration:line-through;
              }
              &__icon{
                position: absolute;
                right: 70px;
                top: 2px;
              }

            }
          }
        }
      }
      .content_buttom{
        width: 100%;
        height: 100px;
      }
      .content-Space{
        width: 100%;
        height: 400px;
      }
    }
  }
}
.active{
   background: #fff;
}
.cart_button{
  display: flex;
  justify-content: space-around;
  position:absolute;
  top: -25px;
  right: 30px;
  .showReduce{
    .icon-jianshao{
      font-size: 90px;
      color: #3190E8;
    }
  }
  .increase{
    .icon-anonymous-iconfont{
      font-size: 90px;
      color: #3190E8;
    }
  }
  .fade{
      display: block;
      width: 50px;
      height: inherit;
      display: flex;
      align-items: center;
      font-size: 50px;
      color: #666;
      justify-content: center;
  }
}
.move_dot{
  position: fixed;
  bottom: 60px;
  left: 80px;
  img{
    width: 90px;
    height: 90px;
  }
  .icon-anonymous-iconfont{
    font-size: 90px;
    color: #3190E8;
  }
}
.showReduce-enter-active, .showReduce-leave-active {
      transition: all .3s ease-out;
}
.showReduce-enter, .showReduce-leave-active {
    opacity: 0;
    transform: translateX(1rem);
}
.fade-enter-active, .fade-leave-active {
    transition: all .3s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
.fadeBounce-enter-active, .fadeBounce-leave-active {
    transition: all .3s;
}
.fadeBounce-enter, .fadeBounce-leave-active {
    opacity: 0;
    transform: scale(.7);
}
</style>
