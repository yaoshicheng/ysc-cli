<!--<template>-->
<!--  <div>-->
<!--    <my-component @my-event="signouted"></my-component>-->
<!--    <my-component @my-event="login"></my-component>-->
<!--    <router-view />-->
<!--  </div>-->
<!--</template>-->
<template>
  <router-view />
</template>

<script>
import Cookie from "@/utils/cookie";
import { getToken, findMenuInfo } from "./common/js/utils";

export default {
  name: "App",

  data() {
    return {
      isLogin: !!getToken()
    };
  },
  watch: {
    $route(to) {
      if (to.name === "login") {
        // 登录页不需要验证
        setTimeout(() => {
          this.$emit("signouted");
        }, 10);
      } else {
        const hasLogin = !!getToken();
        this.isLogin = hasLogin;
        if (hasLogin) {
          // 登录成功
          setTimeout(() => {
            const { get } = this.$lodash;
            const toName = get(to, "name", "");
            const menuInfo = findMenuInfo(toName);
            const hasThisMenu = get(menuInfo, "condition", false);
            this.$emit("login");
            if (!hasThisMenu) {
              this.$router.push({ name: "noAuthority" });
            }
          }, 10);
        } else {
          // 未登录
          setTimeout(() => {
            this.$emit("signouted");
          }, 10);
          const params = {
            router: to.fullPath
          };
          this.$router.push({
            name: "login",
            query: params
          });
        }
      }
    }
  },
  emits: ["signouted", "login"],
  methods: {
    signouted() {
      this.isLogin = false;
      localStorage.removeItem("AUTH_MENU");
      Cookie.delCookie("user");
      Cookie.delCookie("allAuth");
    },
    login() {
      this.isLogin = true;
    },
    vertifyLogin() {
      return new Promise(res => {
        const hasLogin = !!getToken();
        if (hasLogin) {
          //登录状态
          this.isLogin = true;
        } else {
          // 未登录状态 跳转登录页面
          res(false);
        }
      });
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  & > div:not(.loginContainer) {
    height: 100%;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
