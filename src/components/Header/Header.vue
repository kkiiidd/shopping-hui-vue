<template>
  <div class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <a href="javascript:void(0)" @click="toLogin">登录</a>
            <a href="javascript:void(0)" class="register" @click="toRegister"
              >免费注册</a
            >
          </p>
          <p v-else>
            <a href="javascript:void(0)">{{ userName }}</a>
            <a href="javascript:void(0)" class="register" @click="logout"
              >退出登录</a
            >
          </p>
        </div>
        <div class="typeList">
          <a @click="toOrder">我的订单</a>
          <a @click="toShopcart">我的购物车</a>
          <a @click="toCenter">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="input"
            @keydown:enter="search"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="search"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  computed: {
    userName() {
      // console.log(this.$store.state.user.userName);
      return this.$store.state.user.userName;
    },
  },
  mounted() {
    //挂载后给 bus加 clearKeyword 的事件监听
    this.$bus.$on("clearKeyword", () => {
      console.log("clear");
      this.input = "";
    });
  },
  methods: {
    //退出登录
    async logout() {
      try {
        await this.$store.dispatch("user/logout");
        localStorage.removeItem("TOKEN");
        this.$router.push("/home");
      } catch (error) {
        alert(error);
      }
    },
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
    toHome() {
      this.$router.push("/home");
    },
    toShopcart() {
      this.$router.push("/shopcart");
    },
    toOrder() {
      this.$router.push("/center/myOrder");
    },
    toCenter() {
      this.$router.push("/center");
    },

    search() {
      console.log(this.input);
      let params = {
        keyword: this.input || "",
      };
      let location = {
        name: "search", //需要用别名
        params,
      };
      //合并query参数
      //@kofeine 2022/07/31 09:30
      if (this.$route.query) {
        location.query = this.$route.query;
      }
      this.$router.push(location);
    },
    clear() {
      this.input = "";
    },
  },
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
