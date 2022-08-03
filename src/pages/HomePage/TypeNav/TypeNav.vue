<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!-- <button @click="showCate">afdsf</button> -->
    <div class="container" @mouseleave="leave" @mouseenter="enterAll">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="type">
        <div class="sort" @click="toSearch" v-if="typeShow">
          <div class="all-sort-list2">
            <div
              class="item"
              :class="{ active: curIndex === index }"
              @mouseenter="enter(index)"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
            >
              <h3>
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="(c2, index) in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c1.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="(c3, index) in c2.categoryChild"
                        :key="c3.categoryId"
                      >
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c1.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//按需引入lodash的函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      cur: "active-item",
      curIndex: -1,
      typeShow: true,
    };
  },
  methods: {
    //三级联动节流
    //@kofeine 2022/07/27 21:55
    //回调函数不能用箭头函数
    enter: throttle(function (index) {
      this.curIndex = index;
    }, 50),
    leave() {
      this.curIndex = -1;
      //搜索页的话离开之后隐藏分类导航
      if (this.$route.path.slice(0, 7) === "/search") {
        this.typeShow = false;
      }
    },
    showCate() {
      console.log(this.categoryList);
    },

    //三级分类跳转
    //@kofeine 2022/07/28 15:48
    toSearch(e) {
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        let query = { categoryName: categoryname };

        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else if (category3id) {
          query.category3id = category3id;
        }

        let location = {
          name: "search",
          query,
        };
        //合并params参数
        //@kofeine 2022/07/31 09:30
        if (this.$route.params.searchContent) {
          location.params = this.$route.params;
        }
        this.$router.push(location);
        console.log(this.$route);
      }
    },

    //进入导航分类外层
    enterAll() {
      this.typeShow = true;
    },
  },

  //判断是首页还是搜索页，搜索页需要先隐藏分类导航
  mounted() {
    if (this.$route.path === "/search") {
      this.typeShow = false;
    }
  },

  computed: {
    ...mapState("home", { categoryList: "categoryList" }),
  },
};
</script>

<style lang="less">
@import "./TypeNav.less";
</style>
