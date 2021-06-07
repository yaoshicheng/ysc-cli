<template>
  <a-layout-sider width="200">
    <a-menu
      v-model:openKeys="openKey"
      v-model:selectedKeys="selectedKey"
      mode="inline"
      theme="dark"
      @click="menuChange"
    >
      <template v-for="item in menuList">
        <a-sub-menu
          :key="item.key"
          v-if="item.children && item.condition && !item.isSimpleMenu"
        >
          <template #title>
            <span><Icon :type="item.icon" />{{ item.title }}</span>
          </template>
          <div v-for="option in item.children" :key="option.key">
            <a-menu-item v-if="!option.hideInMenu">
              <Icon :type="option.icon" />
              {{ option.title }}</a-menu-item
            >
          </div>
        </a-sub-menu>
        <a-menu-item v-else-if="item.condition" :key="item.key"
          ><Icon :type="item.icon" /> {{ item.title }}</a-menu-item
        >
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { ref } from "vue";

import Icon from "./Icon";

export default {
  components: {
    Icon
  },
  props: ["menuChange", "openKeys", "selectedKeys", "menuList"],
  setup(props) {
    const openKey = ref(props.openKeys);
    const selectedKey = ref(props.selectedKeys);
    return {
      openKey,
      selectedKey
    };
  }
};
</script>
