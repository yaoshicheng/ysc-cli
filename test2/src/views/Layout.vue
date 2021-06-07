<template>
  <div class="layout-container">
    <a-layout class="layout-inner">
      <top-bar />
      <a-layout>
        <side-bar :menuChange="menuChange" />
        <a-layout class="layout-content">
          <a-breadcrumb class="crumb">
            <a-breadcrumb-item v-for="crumb in crumbs" :key="crumb">{{
              crumb
            }}</a-breadcrumb-item>
          </a-breadcrumb>
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
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar.vue";
export default {
  name: "Layout",
  components: {
    TopBar,
    SideBar
  },
  data() {
    return {
      crumbs: ["Home", "Transfer"],
      title: "Transfer"
    };
  },
  methods: {
    menuChange(e) {
      const { keyPath, key } = e;
      const { forEach, join, reverse, concat } = this.$lodash;
      const paths = [];
      forEach(keyPath, item => paths.push(item.toLowerCase()));
      const path = "/" + join(reverse(paths), "/");
      this.crumbs = concat(["Home"], (keyPath ||[]).reverse());
      this.title = key;
      this.$router.push(path);
    }
  }
};
</script>
<style scoped lang="less">
.layout-container,
.layout-inner {
  height: 100%;
}
.crumb {
  margin: 16px 0;
  text-align: left;
}
.layout-content {
  padding: 0 24px 24px;
}
</style>
