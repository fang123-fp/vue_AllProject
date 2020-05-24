<template>
   <div class="order-evaluation__businesSreviews"  >
      <div class="order-evaluation__businesSreviews__item">
        <div class="order-evaluation__businesSreviews__item__merchant">{{ $route.query.rating }}</div>
        <div class="order-evaluation__businesSreviews__item__rating">
          <div class="order-evaluation__businesSreviews__item__rating__text">商家评分</div>
          <div class="order-evaluation__businesSreviews__item__rating__copies">
              <van-rate v-model="valueRate" size="6px" color="#FEB300" allow-half readonly />
          </div>
        </div>
        <div class="order-evaluation__businesSreviews__item__taste">
          <div class="order-evaluation__businesSreviews__item__taste__text">味道</div>
          <div class="order-evaluation__businesSreviews__item__taste__copies">5.0</div>
        </div>
        <div class="order-evaluation__businesSreviews__item__package">
          <div class="order-evaluation__businesSreviews__item__package__text">包装</div>
          <div class="order-evaluation__businesSreviews__item__package__copies">5.0</div>
        </div>
        <div class="order-evaluation__businesSreviews__item__line"></div>
        <div class="order-evaluation__businesSreviews__item__delivery">
          <div class="order-evaluation__businesSreviews__item__delivery__text">配送</div>
          <div class="order-evaluation__businesSreviews__item__delivery__copies">5.0</div>
        </div>
      </div>
      <div class="order-evaluation__businesSreviews__select">
          <div class="order-evaluation__businesSreviews__select__condition">
              <span :class="['order-evaluation__businesSreviews__select__condition__item',{ 'negativeRatings': item.unsatisfied,'tagActivity': ratingTageIndex == index}]"  v-for="(item,index) in ratingsTagsList" :key="index" @click="changeTgeIndex(index,item.name)">
                  {{ item.name }} {{item.count }}
              </span>
          </div>
          <div class="order-evaluation__businesSreviews__select__options">
            <i :class="['iconfont icon-fuxuankuang-yuan-xuanzhong',{'iconColor':isShowComment}]" @click="seeComment"></i>只看有内容的评价
          </div>
          <div class="order-evaluation__businesSreviews__select__commentList">
            <div class="order-evaluation__businesSreviews__select__commentList__item" v-for="(item,index) in ratingsList" :key="index">
              <div class="order-evaluation__businesSreviews__select__commentList__item__left">
                <img :src="getImgPath(item.avatar)" alt="">
              </div>
              <div class="order-evaluation__businesSreviews__select__commentList__item__right">
                <div class="order-evaluation__businesSreviews__select__commentList__item__right__text">
                  <div class="order-evaluation__businesSreviews__select__commentList__item__right__text__number">{{ item.username}}</div>
                  <div class="order-evaluation__businesSreviews__select__commentList__item__right__text__text">
                      <van-rate v-model="item.rating_star" size="6px" color="#FEB300" allow-half readonly />
                      <span>{{ item.rating_text || '超赞'}}</span>
                  </div>
                  <div class="order-evaluation__businesSreviews__select__commentList__item__right__text__literal">{{ item.time_spent_desc }}</div>
                  <div class="order-evaluation__businesSreviews__select__commentList__item__right__text__pic">
                      <span class="order-evaluation__businesSreviews__select__commentList__item__right__text__pic__item" v-for="(item, index) in item.item_ratings" :key="index">
                        <img :src="getImgPath(item.image_hash)" alt="">
                      </span>
                  </div>
                  <div class="order-evaluation__businesSreviews__select__commentList__item__right__text__product">
                    <i class="iconfont icon-zan2" v-show="item.item_ratings.length"></i>
                    <span v-for="(item, index) in item.item_ratings" :key="index">{{ item.food_name }}</span>
                  </div>
                </div>
                <div class="order-evaluation__businesSreviews__select__commentList__item__right__Date">{{ item.rated_at }}</div>
              </div>
            </div>
          </div>
      </div>
   </div>
</template>

<script>
import { getImgPath } from '../../components/common/imageConversion';

export default {
  name: 'evaluation',
  data() {
    return {
      showPicUrl: 'https://elm.cangdu.org/img/',
      ratingsList: [], //  评论的内容
      isShowComment: false,
      valueRate: this.$route.query.rating * 1,
      ratingsTagsList: [], // 评价分类
      ratingTageIndex: 0, // 评价分类索引
    };
  },
  created() {
    this.shoppingRatings();
    this.ratingsTags();
  },
  mixins: [getImgPath],
  methods: {
    seeComment() {
      this.isShowComment = !this.isShowComment;
      if (this.isShowComment) {
        const isHasContenter = this.ratingsList.filter((item) => item.time_spent_desc.length > 0);
        this.ratingsList = isHasContenter;
      } else {
        this.shoppingRatings();
      }
    },
    // 评论信息
    shoppingRatings() {
      this.$http.gitShoppingRatings({
        restaurant_id: this.$route.query.id,
      })
        .then((res) => {
          this.ratingsList = res.data;
        }).catch((err) => {
          console.log(err.message);
        });
    },
    // 获取评价分类
    ratingsTags() {
      this.$http.gitratingsTags({
        restaurant_id: this.$route.query.id,
      })
        .then((res) => {
          this.ratingsTagsList = res.data;
        }).catch((err) => {
          console.log(err.message);
        });
    },
    changeTgeIndex(index, val) {
      this.ratingTageIndex = index;
      this.$http.gitShoppingRatings({
        restaurant_id: this.$route.query.id,
        tag_name: val,
      })
        .then((res) => {
          this.ratingsList = res.data;
        }).catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../style/commonStyle.scss';
.order-evaluation{
  width: 100%;
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
        margin-top: 20px;
        margin: 0px auto;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #EEEEEE;
        display: flex;
        flex-wrap: wrap;
        &__item{
          padding:19px 18px;
          font-size:23px;
          color: #6D7885;
          background-color: #EBF5FF;
          margin: 0px 16px 20px 0px;
          border-radius:10px ;

        }
        .negativeRatings{
          background-color: #F5F5F5;
          color: #AAAAAA;
        }
        .tagActivity{
          background-color: #3190e8;
          color: #fff;
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
            margin-top: 30px;
           /*  align-items: center; */
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
                  margin-left: 40px;
                }
              }
              &__literal{
                width: 100%;
                font-size: 21px;
                color: #000;
                margin: 20px 0px;
              }
              &__pic{
                width: 100%;
                display: flex;
                &__item{
                  width: 290px;
                  height: 290px;
                  border:5px solid #969696 ;
                  display: block;
                  border-radius:20px ;
                  margin: 0px 20px 0px 0px;
                  img{
                    width: inherit;
                    height: inherit;
                  }
                }
              }
              &__product{
                margin:20px 20px 40px 0px;
                display: flex;
                flex-wrap: wrap;
                .icon-zan2{
                   font-size: 50px;
                   color: #ABABAB;
                }
                span{
                    font-size: 28px;
                    color: #17B0F4;
                    padding:22px 21px;
                    background-color: #E5FFFB;
                    margin:0px 20px 30px 20px;
                }
              }
            }
            &__Date{
              width: 20%;
              height: inherit;
              font-size: 16px;
              color: #999999;
              display: flex;
              margin-top: 30px;
            }
          }
        }
      }
    }

  }
}
</style>
