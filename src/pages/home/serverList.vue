<template>
     <div class="index-menu">
        <nav class="menu_nav">
            <ul class="menu_nav__liA">
                <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/meishi.png" alt="">
                        <span>美食</span>
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/shangchao.png" alt="">
                        <span>商超便利</span>
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/shuiguo.png" alt="">
                        <span>水果</span>
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/yaopin.png" alt="">
                        <span>送药上门</span>
                    </a>
                </li>
                <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/yinpin.png" alt="">
                        <span>甜品饮品</span>
                    </a>
                </li>
            </ul>
            <ul class="menu_nav__liB">
              <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/图层1@3x.png" alt="">
                        <span>午餐</span>
                    </a>
              </li>
              <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/图层2@3x.png" alt="">
                        <span>快餐便当</span>
                    </a>
              </li>
              <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/图层3@3x.png" alt="">
                        <span>川湘菜</span>
                    </a>
              </li>
              <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/图层4@3x.png" alt="">
                        <span>星选好店</span>
                    </a>
              </li>
              <li class="nav_item">
                    <a href="#" class="nav_item_link">
                        <img src="../../assets/images/图层5@3x.png" alt="">
                        <span>跑腿代沟</span>
                    </a>
              </li>
            </ul>
        </nav>
        <div class="index-menu__pic">
          <img src="../../assets/images/QQ.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
  name: 'serverList',
};
</script>

<style lang="scss" scoped>
.index-menu{
  width: 100%;
  height: 660px;
  margin-top: 210px;
  .menu_nav{
    width: 100%;
    height: 450px;
    .sliding-column{
      width: 100%;
      height: 9px;
      display: flex;
      justify-content: center;
      &__item{
        width: 36px;
        height: 9px;
        display: inline-block;
        border-radius:50px;
      }
      .sliding-column__one{
        background-color: #01C22A;
      }
      .sliding-column__two{
        background: #f7f7f7;
      }
    }
  }
  &__pic{
    width: 100%;
    height: 230px;
    text-align: center;
  }
  &__pic>img{
    width: 90%;
    height: 220px;
  }
}

.index-menu ul{
  height: 175px;
  list-style: none;
  display: flex;
  padding:30px 0px 0px 0px;
  margin: 0px;
  justify-content: space-around;
}
.index-menu ul li{
  width: 150px;
  height: 150px;
  text-align: center;
}
.index-menu ul li a{
  text-decoration: none;
  font-size: 21px;
  color: #000;
  font-weight: 500;
}
.menu_nav__liA li a>img{
  width: 88px;
  height: 88px;
}
.menu_nav__liB li a>img{
  width: 39px;
  height: 39px;
}
.index-menu ul li a span{
  width: 100%;
  display: block;
  margin-top: 15px;
}
</style>
