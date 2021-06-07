<template>
  <div class="loginContainer">
    <a-form class="loginform" :model="form" ref="ruleForm" :rules="rules">
      <div ref="logAnimal" class="login-animal">
        <div class="eyes"></div>
        <div class="arm-up-right"></div>
        <div class="arm-up-left"></div>
        <div class="arm-down-left"></div>
        <div class="arm-down-right"></div>
      </div>
      <a-form-item ref="username" name="username">
        <a-input
          size="large"
          v-model:value="form.username"
          auto-complete="off"
          placeholder="Username"
        >
          <template #prefix>
            <UserOutlined class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item ref="password" name="password">
        <a-input
          size="large"
          v-model:value="form.password"
          type="password"
          @focus="focusPwd"
          @blur="blurPwd"
          auto-complete="off"
          placeholder="Password"
        >
          <template #prefix>
            <LockOutlined class="icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-checkbox v-model:checked="remember" class="remember">
        Remember
      </a-checkbox>
      <a-button
        type="primary"
        html-type="submit"
        :loading="logining"
        @click="onSubmit"
        >Log in</a-button
      >
    </a-form>
  </div>
</template>
<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { login, getAuthority } from "../server/user";
import { handleErrorData } from "@/common/js/utils";
import Cookie from "@/utils/cookie";

export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      logining: false,
      remember: true,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Input Ldap Account",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Input Ldap Password",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getCookieAccount();
  },
  methods: {
    focusPwd() {
      this.$refs.logAnimal.classList.add("password");
    },
    blurPwd() {
      this.$refs.logAnimal.classList.remove("password");
    },
    getCookieAccount() {
      const { username, password } = Cookie.getCookie("account")
        ? JSON.parse(Cookie.getCookie("account"))
        : {};
      this.form.username = username || "";
      this.form.password = password || "";
    },
    onSubmit() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          this.logining = true;
          const loginParams = this.form;
          const { get } = this.$lodash;
          localStorage.removeItem("AUTH_MENU");
          login(loginParams)
            .then(res => {
              const user = {
                username: get(res, "data.user.username", ""),
                pk: get(res, "data.user.pk", ""),
                token: get(res, "data.token", "")
              };
              Cookie.setCookie("user", JSON.stringify(user), 0.416); // 8小时后过期
              // 修改cookie中的账户信息
              this.remember
                ? Cookie.setCookie("account", JSON.stringify(loginParams), 30)
                : Cookie.delCookie("account");
              getAuthority()
                .then(res => {
                  const menuData = get(res, "data", {});
                  localStorage.setItem("AUTH_MENU", JSON.stringify(menuData));
                  this.$router.push({
                    path: this.$route.query.router
                      ? this.$route.query.router
                      : "/"
                  });
                  this.logining = false;
                })
                .catch(err => {
                  this.logining = false;
                  localStorage.removeItem("AUTH_MENU");
                  handleErrorData(err);
                });
            })
            .catch(err => {
              const msg = get(err, "errorData.non_field_errors[0]", "");
              this.logining = false;
              handleErrorData({ message: msg });
            });
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>
<style lang="less">
.loginContainer {
  .ant-col,
  .ant-btn {
    width: 100%;
  }
  .ant-form-explain {
    text-align: left;
  }
}
</style>
<style scoped lang="less">
.loginContainer {
  background-color: #318b5b;
  height: 300px;
}
.loginform {
  position: relative;
  padding: 50px 56px;
  top: 200px;
  margin: 0 auto;
  max-width: 400px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 5px;
}
.login-animal {
  width: 116px;
  height: 92px;
  position: absolute;
  top: -82px;
  left: 50%;
  margin-left: -64px;
  background-image: url("./image/login/face@2x.png");
  background-size: 116px 92px;
  .eyes {
    width: 100%;
    height: 100%;
    opacity: 0;
    filter: alpha(opacity=0);
    transition: 0.1s ease-out 0s;
    background-image: url("./image/login/eyes@2x.png");
    background-size: 100% 100%;
  }
  .arm-down-left {
    width: 43px;
    height: 25px;
    position: absolute;
    bottom: 2px;
    left: -34px;
    transition: 0.3s ease-out;
    background-image: url("./image/login/arm-down-left@2x.png");
    background-size: 43px 25px;
  }
  .arm-down-right {
    width: 43px;
    height: 26px;
    position: absolute;
    bottom: 1px;
    right: -40px;
    transition: 0.3s ease-out;
    background-image: url("./image/login/arm-down-right@2x.png");
    background-size: 43px 26px;
  }

  .arm-up-left {
    width: 52px;
    height: 41px;
    position: absolute;
    bottom: 11px;
    left: -3px;
    transform: translateX(-34px) scale(0.8);
    transform-origin: 0 40px;
    transition: background-position 0.3s ease-out, transform 0.3s ease-out,
      opacity 0s linear 0.3s;
    background-position: 0 25px;
    background-repeat: no-repeat;
    opacity: 0;
    filter: alpha(opacity=0);
    background-image: url("./image/login/arm-up-left@2x.png");
    background-size: 52px 41px;
  }
  .arm-up-right {
    width: 51px;
    height: 41px;
    position: absolute;
    bottom: 11px;
    right: 5px;
    transform: translateX(57px) scale(0.8);
    transform-origin: 0 40px;
    transition: background-position 0.3s ease-out, transform 0.3s ease-out,
      opacity 0s linear 0.3s;
    background-position: 0 25px;
    background-repeat: no-repeat;
    opacity: 0;
    filter: alpha(opacity=0);
    background-image: url("./image/login/arm-up-right@2x.png");
    background-size: 51px 41px;
  }
  &.password {
    .eyes {
      opacity: 1;
      filter: none;
      transition: 0.1s ease-out 0.2s;
    }
    .arm-down-left {
      transform: translateX(40px) scale(0) translateY(-10px);
      opacity: 0;
      filter: alpha(opacity=0);
    }
    .arm-up-left {
      transform: scale(1);
      background-position: 0 0;
      opacity: 1;
      filter: none;
      transition: background-position 0.3s ease-out, transform 0.3s ease-out;
    }
    .arm-down-right {
      transform: translateX(-32px) scale(0) translateY(-8px);
      opacity: 0;
      filter: alpha(opacity=0);
    }
    .arm-up-right {
      transform: scale(1);
      background-position: 0 0;
      opacity: 1;
      filter: none;
      transition: background-position 0.3s ease-out, transform 0.3s ease-out;
    }
  }
}
.remember {
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
}
.icon {
  color: rgba(0, 0, 0, 0.25);
}
</style>
