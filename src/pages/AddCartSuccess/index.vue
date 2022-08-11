<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg" />
          </div>
          <div class="right-info">
            <p class="title">
              {{ skuInfo.skuName }}
            </p>
            <p class="attr">
              <span v-for="(attr, index) in spuSaleAttrList" :key="attr.id">
                {{ attr.saleAttrName }}:
                <span
                  v-for="(attrValue, index) in attr.spuSaleAttrValueList"
                  :key="attrValue.id"
                  v-if="attrValue.isChecked == 1"
                >
                  {{ attrValue.saleAttrValueName }}
                </span>
              </span>
              数量：{{ $route.query.skuNum }}
            </p>
          </div>
        </div>
        <div class="right-gocart">
          <a href="javascript:" class="sui-btn btn-xlarge">查看商品详情</a>
          <router-link :to="`/shopcart`">去购物车结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCartSuccess",
  data() {
    return {
      skuInfo: {},
      spuSaleAttrList: [],
    };
  },
  beforeMount() {
    let skuInfo = JSON.parse(sessionStorage.getItem("skuInfo"));
    let spuSaleAttrList = JSON.parse(sessionStorage.getItem("spuSaleAttrList"));
    this.skuInfo = skuInfo;
    this.spuSaleAttrList = spuSaleAttrList;
  },
};
</script>

<style lang="less" scoped>
@import "./addCartSuccess.less";
</style>
