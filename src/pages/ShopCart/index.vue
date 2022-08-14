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
              @change="updateCheck(cartItem, $event)"
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
            <a
              href="javascript:void(0)"
              class="mins"
              @click="skuNumHandler('min', cartItem)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartItem.skuNum"
              minnum="1"
              class="itxt"
              @change="skuNumHandler('change', cartItem, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="skuNumHandler('plus', cartItem)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartItem.skuNum * cartItem.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cartItem.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAll && cartInfoList.length > 0"
          @change="updateAllCheck"
        />
        <!-- cartInfo为空时会全选上，bug -->
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteSelected">删除选中的商品</a>
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
          <a
            class="sum-btn"
            href="javascript:void(0)"
            @click="$router.push('./trade')"
            >结算</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("shopcart/getShopCartList");
    },
    deleteSelected() {
      try {
        this.$store.dispatch("shopcart/deleteSelected");
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    // 修改全选勾选状态
    //@kofeine 2022/08/12 17:29
    updateAllCheck(e) {
      this.cartInfoList.forEach((item) => {
        this.updateCheck(item, e);
      });
    },
    //修改单个勾选状态
    //@kofeine 2022/08/12 15:36
    async updateCheck(cartItem, e) {
      let isChecked = e.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("shopcart/updateCheck", {
          skuId: cartItem.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error);
      }
    },
    //删除购物车商品
    //@kofeine 2022/08/12 15:27
    async deleteCart(skuId) {
      try {
        await this.$store.dispatch("shopcart/deleteShopCartItem", skuId);
        this.getData();
      } catch (error) {
        alert(error);
      }
    },

    //商品数量修改处理函数，需要节流
    //@kofeine 2022/08/12 13:56
    skuNumHandler: throttle(async function (operation, cartItem, e) {
      let disNum = 0;
      switch (operation) {
        case "min": {
          //数量大于 1 时才能减 1
          if (cartItem.skuNum > 1) disNum = -1;
          break;
        }
        case "plus":
          disNum = 1;
          break;
        case "change": {
          let num = e.target.value * 1;
          //非法输入：非数值，小于 1 这里有人说可以用 type= number 控制，但是其实还是可以输入e，因为e在十六进制中也是数字
          if (isNaN(num) || num < 1) disNum = 0;
          //数值，但要转为 int 型，防止小数输入
          else disNum = parseInt(num) - cartItem.skuNum;
          break;
        }
      }
      try {
        //派发action，发请求更新购物车信息,一定要加 await，
        //因为是异步操作，不加的话不会等这个操作更新了服务器数据后再获取新数据，而是直接拿回修改前的数据
        await this.$store.dispatch("detail/addShopCart", {
          skuId: cartItem.skuId,
          skuNum: disNum,
        });
        //派发获取购物车的action，获取最新信息
        this.getData();
      } catch (error) {
        console.log(error);
      }
    }, 600),
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
