<template>
  <div class="layout-container">
    <a-layout class="layout-inner">
      <top-bar />
      <a-layout>
        <side-bar
          :openKeys="openKeys"
          :selectedKeys="selectedKeys"
          :menuList="menuList"
          :menuChange="menuChange"
        />
        <a-layout class="layout-content">
          <Crumb />
          <a-layout-content
            :style="{
              background: '#fff',
              padding: '24px',
              margin: 0,
              minHeight: '280px'
            }"
          >
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import Crumb from "../components/Crumb";
import { getMenuList, findMenuInfo } from "../common/js/utils";

export default {
  name: "Layout",
  components: {
    TopBar,
    SideBar,
    Crumb
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const { get } = ctx.$lodash;
    const { currentRoute } = ctx.$router;
    const routeName = get(currentRoute, "value.name", "transfer");
    const menuInfo = findMenuInfo(routeName);
    const selectedKeys = ref([get(menuInfo, "activeKey", "transfer")]);
    const openKeys = ref([get(menuInfo, "menuKey", "transfer")]);

    const menuChange = e => {
    	console.log(e.key)
      const { key } = e;
      ctx.$router.push({ name: key });
    };

    return {
      menuList: getMenuList(),
      selectedKeys,
      openKeys,
      menuChange
    };
  }
};
</script>
<style scoped lang="less">
.layout-container,
.layout-inner {
  min-height: 100%;
}
.layout-content {
  padding: 0 24px 24px;
}
</style>
