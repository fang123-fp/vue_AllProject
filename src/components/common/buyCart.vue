 <template>
    <section class="cart_button">
      <transition name="showReduce">
        <span class="showReduce" v-if="foodNum" @click="removeOutCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock)">
            <i class="iconfont icon-jianshao"></i>
        </span>
      </transition>
      <transition name="fade">
        <span class="fade" v-if="foodNum">{{ foodNum }}</span>
      </transition>
        <span  class="increase"  @touchstart="addToCart(foods.category_id, foods.item_id, foods.specfoods[0].food_id, foods.specfoods[0].name, foods.specfoods[0].price, '', foods.specfoods[0].packing_fee, foods.specfoods[0].sku_id, foods.specfoods[0].stock,foods.image_path,$event)">
            <i class="iconfont icon-anonymous-iconfont"></i>
        </span>
    </section>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'buycart',
  data() {
    return {
      showMoveDot: [], // 控制下落的小圆点显示隐藏
    };
  },
  props: ['shopId', 'foods'],
  created() {
  },
  methods: {
    ...mapMutations([
      'ADD_CART', 'INIT_BUYCART', 'REDUCE_CART',
    ]),
    // 加入购物车
    // eslint-disable-next-line camelcase
    addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, image_path, event) {
      this.ADD_CART({
        shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, image_path,
      });
      const elLeft = event.target.getBoundingClientRect().left;
      const elBottom = event.target.getBoundingClientRect().bottom;
      const elTop = event.target.getBoundingClientRect().top;
      this.showMoveDot.push(true);
      this.$emit('showMoveDot', this.showMoveDot, elLeft, elBottom, elTop);
      this.INIT_BUYCART();
    },
    // 移出购物车
    // eslint-disable-next-line camelcase
    removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
      if (this.foodNum > 0) {
        this.REDUCE_CART({
          shopid: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock,
        });
      }
      this.INIT_BUYCART();
    },
  },
  mounted() {

  },
  updated() {

  },
  computed: {
    ...mapState([
      'cartList',
    ]),
    shopCart() {
      return { ...this.cartList[this.shopId] };
    },
    // shopCart变化的时候重新计算当前商品的数量
    foodNum() {
      // eslint-disable-next-line camelcase
      const { category_id, item_id } = this.foods;
      if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
        let num = 0;
        Object.values(this.shopCart[category_id][item_id]).forEach((item) => {
          num += item.num;
        });
        return num;
      }
      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>
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
