<template>
  <div class="confirm-order">
    <header-title headTitle='我的地址'></header-title>
    <div class="confirm-order__contenter">
      <div class="confirm-order__contenter__item" v-for="(item,index) in addressesList" :key="item.id">
        <div class="confirm-order__contenter__item__left">
            <div class="confirm-order__contenter__item__left__information">
              <span>{{ item.name}}</span>
              <span>{{ item.sex===1? '先生':'女士'}}</span>
              <span>{{ item.phone }}</span>
            </div>
            <div class="confirm-order__contenter__item__left__address">
              <div class="confirm-order__contenter__item__left__address__label">
                <span>{{ item.tag }}</span>
              </div>
              <div class="confirm-order__contenter__item__left__address__details">
                {{ item.address_detail}}
              </div>
            </div>
        </div>
        <div class="confirm-order__contenter__item__right">
            <i class="iconfont icon-bianji"></i>
            <i class="iconfont icon-Canceled" @click="removeAddressById(item.id,index)"></i>
        </div>
      </div>
    </div>
    <div class="confirm-order__bottom" @click="$router.push({ path:'/confirmOrder/addAddress' })">
      <i class="iconfont icon-xinjianzengjiaxinzeng-20"></i>
      <span>新增收货地址</span>
    </div>
  </div>
</template>

<script>
import headerTitle from '../../components/heaher/header.vue';
import { getStore } from '../../config/mStorage';
import { createDialog } from '../../components/simpleCopmonents/index';


export default {
  name: 'confirmOrder',
  data() {
    return {
      userId: JSON.parse(getStore('userInfo')).data.user_id,
      addressesList: [],
    };
  },
  created() {
    this.gitAddressesList();
  },
  methods: {

    gitAddressesList() {
      this.$http.gitAddresses({
        user_id: this.userId,
      }).then((res) => {
        this.addressesList = res.data;
      }).catch((error) => {
        console.log(error.message);
      });
    },
    removeAddressById(id, index) {
      // eslint-disable-next-line no-unused-expressions
      createDialog({
        title: '删除地址',
        message: '确认删除该地址',
      })
        .then(() => {
          console.log(111);
          this.$http.gitRemoveAddresses({
            user_id: this.userId,
            address_id: id,
          })
            .then((res) => {
              if (res.data.status === 1) {
                this.addressesList.splice(index, 1);
              }
            }).catch((error) => {
              console.log(error.message);
            });
        })
        .catch(() => {
          console.log('后悔删除了');
        });
    },
  },
  components: {
    headerTitle,
  },
};
</script>

<style lang="scss" scoped>
.confirm-order{
  width:1242px;
  height: 2208px;
  overflow: hidden;
  position: relative;
  &__contenter{
    width: 100%;
    margin-top: 153px;
    border-top:2px solid #DDDDDD;
    &__item{
      padding:30px 0px 34px 30px;
      height: 170px;
      background-color:#fff;
      border-bottom:2px solid #DDDDDD;
      display: flex;
      &__left{
        width: 80%;
        &__information{
          font-size: 30px;
          position: relative;
          span:nth-child(1){
            color: #333;
            font-weight:bold;
          }
          span:nth-child(2){
            color: #666;
            margin:0px  15px 0px 8px;
          }
          span:nth-child(3){
            color: #666;
            font-size:24px;
            position: absolute;
            top: 3px;
          }
        }
        &__address{
          width: 100%;
          margin:13px 0px 0px ;
          display: flex;
          &__label{
            margin-right: 7px;
            display: flex;
            align-items: center;
            span{
              padding: 5px 7px;
              border: 2px solid #3190e8;
              font-size: 17px;
              color: #3190e8;
            }
          }
          &__details{
            width: 700px;
            font-size: 26px;
            color: #666666;
          }
       }
      }
      &__right{
        width: 20%;
        position: relative;
        .icon-bianji,.icon-Canceled{
          font-size: 31px;
          position: absolute;
          top: 0px;
          color: #999999;
        }
        .icon-bianji{
          right:91px;
        }
        .icon-Canceled{
          right: 30px;
        }
      }
    }
  }
  &__bottom{
    width: 100%;
    height: 103px;
    border-top:2px solid #DDDDDD;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .icon-xinjianzengjiaxinzeng-20{
      font-size: 40px;
      color: #3190E8;
    }
    span{
      font-size: 30px;
      color: #3190E8;
      margin-left: 16px;
    }
  }
}
</style>
