<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartItem, index) in cartInfoList"
          :key="cartItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartItem.isChecked"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartItem.imgUrl" />
            <div class="item-msg">
              {{ cartItem.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cartItem.skuNum"
              minnum="1"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartItem.skuNum * cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ amountSum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ priceSum }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("shopcart/getShopCartList");
  },
  computed: {
    ...mapGetters("shopcart", ["shopcartList"]),
    cartInfoList() {
      return this.shopcartList.cartInfoList || [];
    },
    amountSum() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum;
      });
      return sum;
    },
    priceSum() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.skuPrice * item.skuNum;
        }
      });
      return sum;
    },
    isAll() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./shopcart.less";
</style>
