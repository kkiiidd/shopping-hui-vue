<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg" v-show="!isPhone && phone">手机号格式有误</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button @click="getCode(phone)">获取验证码</button>
        <!-- <img
          ref="code"
          src="http://182.92.128.115/api/user/passport/code"
          alt="code"
        /> -->
        <span class="error-msg" v-show="!isCode && code"
          >验证码只包含6位数字</span
        >
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
        />
        <span class="error-msg" v-show="!isPassword && password"
          >密码只支持6-20位数字，英文大小写及组合</span
        >
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password1"
        />
        <span class="error-msg" v-show="!isPassword1 && password1"
          >密码前后不一致</span
        >
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isCheck" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="confirmRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      password1: "",
      isPhone: false,
      isCode: false,
      isPassword: false,
      isPassword1: false,
      isCheck: false,
    };
  },
  watch: {
    phone: function () {
      const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (reg.test(this.phone)) this.isPhone = true;
      else this.isPhone = false;
    },
    code: function () {
      const reg = /^\d{6}$/;
      if (reg.test(this.code)) this.isCode = true;
      else this.isCode = false;
    },
    password: function () {
      const reg = /^[0-9A-Za-z]{6,20}$/;
      if (reg.test(this.password)) this.isPassword = true;
      else this.isPassword = false;
    },
    password1: function () {
      if (this.password === this.password1) this.isPassword1 = true;
      else this.isPassword1 = false;
    },
  },
  computed: {
    isFinish() {
      const reg =
        this.isPhone && this.isCode && this.isPassword && this.isPassword1;
      return this.isCheck && reg;
    },
  },
  methods: {
    async getCode(phone) {
      try {
        await this.$store.dispatch("user/getCode", phone);
        this.code = this.$store.state.user.code;
      } catch (error) {
        alert(error);
      }
    },
    async confirmRegister() {
      const { phone, code, password, password1 } = this;
      try {
        if (phone && code && this.isFinish) {
          await this.$store.dispatch("user/confirmRegister", {
            phone: this.phone,
            code: this.code,
            password: this.password,
          });
          this.$alert("您已注册成功!", "完成");
          this.$router.push("/login");
        } else {
          if (this.isCheck) this.$alert("输入有误，请检查并重新输入", "错误");
          else this.$alert("未勾选同意协议", "错误");
        }
      } catch (error) {
        this.$alert("账号可能已被注册，或验证码错误", "注册失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
