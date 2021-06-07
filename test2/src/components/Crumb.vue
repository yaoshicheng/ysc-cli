<template>
  <a-breadcrumb class="crumb">
    <div v-if="needNavigate">
      <a-breadcrumb-item v-for="crumb in crumbList2" :key="crumb">
        <span v-if="crumb.path">
          <router-link :to="crumb.path"
          >
            {{crumb.name}}
          </router-link>
        </span>
        <span v-else>
          {{crumb.name}}
        </span>

      </a-breadcrumb-item>
    </div>
    <div v-else>
      <a-breadcrumb-item v-for="crumb in crumbList" :key="crumb">{{
        crumb
      }}</a-breadcrumb-item>
    </div>
  </a-breadcrumb>
</template>

<script>
import { getCurrentInstance, ref, watch } from "vue";
import { findMenuInfo } from "../common/js/utils";
export default {
  name: "Crumb",
  props: {
    needNavigate: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const { get } = ctx.$lodash;
    const { currentRoute } = ctx.$router;
    const crumbList = ref([]);
    const crumbList2 = ref([]);
    const pageTitle = ref("");

    const getInfo = () => {
      const routeName = get(currentRoute, "value.name", "transfer");
      const menuInfo = findMenuInfo(routeName);
      crumbList.value = get(menuInfo, "crumb", []);
      crumbList2.value = get(menuInfo, "crumb2", []);
      pageTitle.value = get(menuInfo, "title", "");
    };

    getInfo();

    watch(currentRoute, () => {
      getInfo();
    });

    return {
      crumbList,
      crumbList2,
      pageTitle
    };
  }
};
</script>
<style scoped lang="less">
.crumb {
  margin: 16px 0;
  text-align: left;
}
</style>
