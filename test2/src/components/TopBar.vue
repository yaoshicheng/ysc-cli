<template>
  <a-layout-header class="header">
    <div class="logo">{{ logoName }}</div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <UserOutlined />
        {{ userName }}
      </a>
      <template #overlay>
        <a-menu @click="loginout">
          <a-menu-item key="1">
            <LoginOutlined />
            Loginout
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { UserOutlined, LoginOutlined } from "@ant-design/icons-vue";
import Cookie from "@/utils/cookie";

export default {
  components: {
    UserOutlined,
    LoginOutlined
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const { get } = ctx.$lodash;
    const user = Cookie.getCookie("user")
      ? get(JSON.parse(Cookie.getCookie("user")), "username", "")
      : "";
    const userName = ref(user);
    const logoName = "Sloth";
    const loginout = ({ key }) => {
      if (key === "1") {
        ctx.$router.push({
          name: "login",
          query: {
            router: window.location.hash.replace("#", "")
          }
        });
      }
    };
    return {
      userName,
      logoName,
      loginout
    };
  }
};
</script>
<style scoped lang="less">
.ant-dropdown-link {
  color: white;
  font-size: 18px;
}
.logo {
  width: 120px;
  height: 100%;
  float: left;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 25px;
}
</style>
