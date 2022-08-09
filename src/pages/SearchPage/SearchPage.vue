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
            <!-- 根据 searchParams 生成 query（商品分类）面包屑 -->
            <!-- @kofeine 2022/08/04 22:50 -->
            <li
              class="with-x"
              v-show="searchParams.categoryName"
              @click="deleteTag"
            >
              {{ searchParams.categoryName }}<i>x</i>
            </li>
            <!-- 根据 searchParams 生成 params（搜索关键字）面包屑 -->
            <!-- @kofeine 2022/08/04 22:51 -->
            <li
              class="with-x"
              v-show="searchParams.keyword"
              @click="deleteKeywordTag"
            >
              {{ searchParams.keyword }}<i>x</i>
            </li>
            <!-- 根据 searchParams 生成 trademark（搜索关键字）面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.trademark"
              @click="deleteTradeMark"
            >
              {{ searchParams.trademark.split(":")[1] }}<i>x</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="attr.split(':')[0]"
              @click="deleteAttr(index)"
            >
              {{ attr.split(":")[1] }}<i>x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @tmChange="trademarkChange" @attrChange="attrChange" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="switchOrder('1')">
                  <a href="javascript:void(0)"
                    >综合 <span v-show="isOne">{{ isAsc ? "↑" : "↓" }}</span></a
                  >
                </li>
                <li :class="{ active: isTwo }" @click="switchOrder('2')">
                  <a href="javascript:void(0)"
                    >价格 <span v-show="isTwo">{{ isAsc ? "↑" : "↓" }}</span></a
                  >
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
                    <router-link
                      href="javascript:void(0)"
                      :to="`/detail/${good.id}`"
                      ><img :src="good.defaultImg"
                    /></router-link>
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
            <Paginator
              :pageNo="searchParams.pageNo"
              :pageSize="searchParams.pageSize"
              :total="total"
              :continues="5"
              @changePage="changePage"
            ></Paginator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import Paginator from "@/components/Paginator";
export default {
  components: { SearchSelector, Paginator },
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
        order: "1:desc",
        pageNo: 1,
        pageSize: 8,
      },
    };
  },
  methods: {
    // 修改页数
    //@kofeine 2022/08/07 00:05
    changePage(num) {
      this.searchParams.pageNo = num;
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 修改排序参数
    //@kofeine 2022/08/06 00:02
    switchOrder(type) {
      let order = this.searchParams.order.split(":")[1];
      if (this.searchParams.order.split(":")[0] === type) {
        //如果排序类型相同，则改变顺序，类型不同，不改边顺序
        if (order === "desc") order = "asc";
        else order = "desc";
      }
      this.searchParams.order = `${type}:${order}`;
      // console.log(this.searchParams.order);
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    //属性面包屑的删除
    //@kofeine 2022/08/05 23:45
    deleteAttr(index) {
      console.log(index);
      this.searchParams.props.splice(index, 1);
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },

    // 属性面包屑的添加
    //@kofeine 2022/08/05 23:45
    attrChange(attr, attrValue) {
      // console.log("儿子给我的", attr, attrValue);
      //整理属性
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //先去重
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props); //参数中的props是数组
      //发送请求
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    trademarkChange(tm) {
      // console.log("儿子给我的", tm);
      // 重新整理请求参数
      this.searchParams.trademark = `${tm.tmId}:${tm.tmName}`;
      // console.log(this.searchParams.trademark);
      //再次发送请求
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
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
    //品牌 面包屑删除操作
    deleteTradeMark() {
      this.searchParams.trademark = undefined;
      this.$store.dispatch("search/getSearchList", this.searchParams);
      //这里对应的面包屑必须用 v-if ，因为展示数据要对字符串做 split 操作，v-show 会把元素渲染出来但通过css隐藏，
      //因此一旦将这里的 this.searchParams.trademark 置为 undefined ，就会报错
    },
  },
  computed: {
    //Search 模块动态展示
    //@kofeine 2022/08/03 22:35
    ...mapGetters("search", ["goodList"]),
    ...mapState({
      total: (state) => state.search.searchContent.total,
    }),
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
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
