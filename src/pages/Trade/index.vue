<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="(addr, addrIndex) in addrs"
        :key="addr.id"
      >
        <span class="username" :class="{ selected: addr.isDefault == 1 }">{{
          addr.consignee
        }}</span>
        <p @click="changeDefault(addr)">
          <span class="s1">{{ addr.fullAddress }}</span>
          <span class="s2">{{ addr.phoneNum }}</span>
          <span class="s3" v-if="addr.isDefault == 1">默认地址</span>
        </p>
      </div>

      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="(s, sIndex) in detailArrayList"
          :key="s.sIndex"
        >
          <li>
            <img :src="s.imgUrl" alt="" />
          </li>
          <li>
            <p>
              {{ s.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ s.orderPrice }}</h3>
          </li>
          <li>X1</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="msg"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>1</i>件商品，总商品金额</b>
          <span>¥5399.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥5399.00</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ defaultAddr.fullAddress }}</span>
        收货人：<span>{{ defaultAddr.consignee }}</span>
        <span>{{ defaultAddr.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Trade",
  data() {
    return { msg: "" };
  },
  methods: {
    changeDefault(addr) {
      //把之前勾选的取消
      this.defaultAddr.isDefault = 0;
      //把当前点击的选上
      //@kofeine 2022/08/24 23:15
      addr.isDefault = 1;
    },
    async submitOrder() {
      let result = await this.$API.reqSubmitOrder(this.shopInfo.tradeNo, {
        consignee: this.defaultAddr.consignee,
        consigneeTel: this.defaultAddr.phoneNum,
        deliveryAddress: this.defaultAddr.fullAddress,
        paymentWay: "ONLINE",
        orderComment: this.msg,
        orderDetailList: this.shopInfo.detailArrayList,
      });
      console.log(result);
      if (result.code == 200) {
        this.$router.push({ path: "/pay", query: { orderId: result.data } });
      } else {
        alert("出错了，请稍后重试~");
      }
    },
  },
  mounted() {
    this.$store.dispatch("order/getUserAddrList");
    this.$store.dispatch("order/getShopInfo");
  },
  computed: {
    ...mapState("order", ["addrs", "shopInfo"]),
    defaultAddr() {
      return (
        this.addrs.find((item) => {
          return item.isDefault == 1;
        }) || {}
      );
    },
    detailArrayList() {
      return this.shopInfo.detailArrayList || [];
    },
  },
};
</script>

<style lang="less" scoped>
@import "./Trade.less";
</style>
