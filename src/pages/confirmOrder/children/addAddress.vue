<template>
  <div class="addAddress">
    <header-title headTitle='添加地址'></header-title>
      <form class="addAddress_item">
        <div class="addAddress_item_contactPerson">
          <div class="addAddress_item_contactPerson_name">
            <div>联系人</div>
            <input type="text" placeholder="姓名" v-model="userInfo_id.name">
          </div>
          <div class="addAddress_item_contactPerson_sex">
              <RadioGroup v-model="userInfo_id.sex">
                  <Radio label='先生' :value='1'></Radio>
                  <Radio label='女士' :value='2'></Radio>
              </RadioGroup>
          </div>
        </div>
        <div class="addAddress_item_phone">
              <div>电话</div>
              <input type="text" placeholder="电话" v-model="userInfo_id.phone">
        </div>
        <div class="addAddress_item_address">
          <div class="addAddress_item_address_name">
            <div class="addAddress_item_address_name_number" @click="$router.push({path:'/confirmOrder/addAddress/searchAddress'})">
                <div class="addAddress_item_address_name_number_title">地址</div>
                <input type="text" placeholder="小区/写字楼/学校等" v-model="userInfo_id.address">
                <div class="addAddress_item_address_name_number_icon">
                    <i class="iconfont icon-xiangyou"></i>
                </div>
            </div>
            <div class="addAddress_item_address_name_detailed" v-if="detailedIsShow">
              <div class="addAddress_item_address_name_detailed_title"></div>
              <input type="text" placeholder="xxx市xxx区xx街道" v-model="userInfo_id.address_detail">
            </div>
          </div>
          <div class="addAddress_item_address_houseNumber">
            <div class="addAddress_item_address_houseNumber_title">门牌号</div>
            <input type="text" placeholder="10号楼5层501室222" v-model="userInfo_id.address_detail">
            <div class="addAddress_item_address_houseNumber_icon">
                <i class="iconfont icon-bianji"></i>
            </div>
          </div>
        </div>
        <div class="addAddress_item_label">
            <div class="addAddress_item_label_title">标签</div>
            <div class="addAddress_item_label_center">
              <RadioGroup v-model="userInfo_id.tag_type" >
                  <Radio label='家' :value='2'></Radio>
                  <Radio label='学校' :value='3'></Radio>
                  <Radio label='公司' :value='4'></Radio>
              </RadioGroup>
            </div>
        </div>
      </form>
    <div class="addAddress_button" @click="saveAddress">确定</div>
  </div>
</template>

<script>
import headerTitle from '../../../components/heaher/header.vue';
import Radio from '../../../components/common/Radio/Radio.vue';
import RadioGroup from '../../../components/common/Radio/RadioGroup.vue';
import { getStore } from '../../../config/mStorage';
import { createToast } from '../../../components/toast/index';

export default {
  name: 'addAddress',
  data() {
    return {
      user_id: JSON.parse(getStore('userInfo')).data.user_id, // 用户id
      detailedIsShow: false,
      userInfo_id: {
        // eslint-disable-next-line no-undef
        address: '', // 地址
        address_detail: '', // 地址详情
        geohash: '', // 经纬度
        name: '', // 收货人姓名
        phone: '', // 电话号码
        tag: '女神', // 标签
        poi_type: '', // 类型，默认：0
        phone_bk: '13027100118', // 备注电话
        tag_type: '', // 标签类型，2:家，3:学校，4:公司
        sex: '', // 性别， 1:男，2:女
      },
    };
  },
  created() {
    this.$bus.$on('IndexChanged', (data) => {
      this.userInfo_id.address = data.name;
      this.userInfo_id.geohash = data.geohash;
      this.detailedIsShow = true;
      console.log(this.userInfo_id.geohash);
    });
  },
  methods: {
    saveAddress() {
      this.$http.gitAddAddresses({
        user_id: this.user_id,
        ...this.userInfo_id,
      })
        .then((res) => {
          if (res.data.status === 1) {
            this.$router.push({ path: '/confirmOrder' });
            this.userInfo_id.address = '';
            this.userInfo_id.address_detail = ''; // 地址详情
            this.userInfo_id.name = ''; // 收货人姓名
            this.userInfo_id.phone = ''; // 电话号码
            this.userInfo_id.tag_type = ''; // 标签类型，2:家，3:学校，4:公司
            this.userInfo_id.sex = ''; // 性别， 1:男，2:女
            this.detailedIsShow = false;
          } else {
            createToast({
              duration: 1000,
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  components: {
    headerTitle,
    Radio,
    RadioGroup,
  },

};
</script>

<style lang="scss" scoped>
.addAddress{
  width:1242px;
  height: 2208px;
  background-color: #F5F5F5;
  overflow: hidden;
  &_item{
    width: 100%;
    background-color:#fff ;
    &_contactPerson{
      width: 98%;
      margin-left:2%;
      border-bottom:2px solid #F7F7F7 ;
      margin-top: 150px;
      &_name{
        height:95px;
        display: flex;
        div{
          width:159px;
          font-size: 27px;
          font-weight: 800;
          color: #333333;
          text-align: center;
          line-height:95px;
        }
        input{
          display: block;
          width:996px;
          outline: none;
          border: none;
          font-size: 28px;
          color: #363636;
          border-bottom:2px solid #F7F7F7;
        }
        input::-webkit-input-placeholder{
          color: #D2D2D2;
        }
        &_icon{
          width: 87px;
          .icon-xiangyou{
            font-size:39px ;
            color: #D1D1D6;
          }
        }

      }
      &_sex{
        width: 1083px;
        height: 99px;
        margin-left:159px ;
      }
    }
    &_phone{
      width: 98%;
      height: 92px;
      margin-left:2% ;
      border-bottom:2px solid #F7F7F7 ;
      display: flex;
      div{
          width:159px;
          font-size: 27px;
          font-weight: 800;
          color: #333333;
          text-align: center;
          line-height:92px;
        }
        input{
          display: block;
          width:1083px;
          outline: none;
          border: none;
          font-size: 28px;
          color: #414141;
          border-bottom:2px solid #F7F7F7;
        }
        input::-webkit-input-placeholder{
          color: #D2D2D2;
        }
    }
    &_address{
      width: 98%;
      margin-left:2% ;
      border-bottom:2px solid #F7F7F7 ;
      &_name{
        &_number{
          height:96px;
          display: flex;
          &_title{
            width:159px;
            font-size: 27px;
            font-weight: 800;
            color: #333333;
            text-align: center;
            line-height:96px;
          }
          input{
            display: block;
            width:953px;
            outline: none;
            border: none;
            font-size: 28px;
            color: #6A6A6A;
          }
          input::-webkit-input-placeholder{
            color: #D9D9D9;
          }
          &_icon{
            width:85px;
            .icon-xiangyou{
              font-size:39px;
              color: #D1D1D6;
            }
          }
        }
        &_detailed{
          height: 80  px;
          display: flex;
          &_title{
             width:159px;
             height: 56px;
          }
          input{
            display: block;
            width:1083px;
            height: 56px;
            outline: none;
            border: none;
            font-size: 22px;
            color: #8F8F8F;
          }
        }
      }
      &_houseNumber{
        height:132px;
        display: flex;
        &_title{
          width:159px;
          font-size: 27px;
          font-weight: 800;
          color: #333333;
          text-align: center;
          margin-top:31px;
        }
        input{
          display: block;
          width:953px;
          outline: none;
          border: none;
          font-size: 28px;
          color: #3E3E3E;
          border-top:2px solid #F7F7F7;
        }
        input::-webkit-input-placeholder{
            color: #D2D2D2;
        }
        &_icon{
          width:85px;
          display: flex;
          align-items: center;
          border-top:2px solid #F7F7F7;
          .icon-bianji{
            font-size:28px;
            color: #999999;
          }
        }
      }
    }
    &_label{
      width: 98%;
      height: 101px;
      margin-left:2% ;
      display: flex;
      &_title{
        width:159px;
        font-size: 27px;
        font-weight: 800;
        color: #333333;
        text-align: center;
        line-height:101px;
      }
      &_center{
        width: 1083px;
        height: 99px;
        display: flex;
        align-items: center;
      }
    }
  }
  &_button{
    width:1184px;
    height: 88px;
    background-color: #03D762;
    color: #fff;
    font-size: 34px;
    text-align: center;
    line-height:88px;
    margin: 42px auto;
    border-radius:10px ;
    font-weight: 800;
  }

}
</style>
