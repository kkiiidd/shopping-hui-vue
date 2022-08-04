<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 根据路由生成 query（商品分类）面包屑 -->
            <!-- @kofeine 2022/08/04 22:50 -->
            <li
              class="with-x"
              v-show="$route.query.categoryName"
              @click="deleteTag"
            >
              {{ $route.query.categoryName }}<i>x</i>
            </li>
            <!-- 根据路由生成 params（搜索关键字）面包屑 -->
            <!-- @kofeine 2022/08/04 22:51 -->
            <li
              class="with-x"
              v-show="$route.params.keyword"
              @click="deleteKeywordTag"
            >
              {{ $route.params.keyword }}<i>x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{
                      good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ good.hotScore }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
export default {
  components: { SearchSelector },
  data() {
    return {
      searchParams: {
        //类型不能乱写，要跟接口文档上的对应上 @kofeine 2022/08/03 23:00
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "",
        pageNo: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    getSearch() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
    //面包屑删除操作
    //@kofeine 2022/08/04 16:24
    deleteTag() {
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.searchParams.categoryName = undefined;

      this.$store.dispatch("search/getSearchList", this.searchParams);
      //不能影响原本的 params 参数
      if (this.$route.params) {
        console.log(this.$route);
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //搜索关键字 面包屑删除操作
    //@kofeine 2022/08/04 22:53
    deleteKeywordTag() {
      this.searchParams.keyword = undefined;
      this.$store.dispatch("search/getSearchList", this.searchParams);
      this.$bus.$emit("clearKeyword");
      //不能影响原本的 query 参数
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
  },
  computed: {
    //Search 模块动态展示
    //@kofeine 2022/08/03 22:35
    ...mapGetters("search", ["goodList"]),
  },
  updated() {
    console.log(this.$route);
  },
  beforeMount() {
    //必须在 挂载 完毕前执行一次 @kofeine 2022/08/03 23:02

    //根据 路由传来的参数 合并 搜索参数对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getSearch();
  },
  watch: {
    $route: function (newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getSearch();
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
