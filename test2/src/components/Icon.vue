<template>
  <OrderedListOutlined v-if="type === 'OrderedListOutlined'" />
  <ProjectOutlined v-if="type === 'ProjectOutlined'" />
  <ShareAltOutlined v-if="type === 'ShareAltOutlined'" />
  <NodeExpandOutlined v-if="type === 'NodeExpandOutlined'" />
  <AppstoreAddOutlined v-if="type === 'AppstoreAddOutlined'" />
  <ApartmentOutlined v-if="type === 'ApartmentOutlined'" />
  <UnlockOutlined v-if="type === 'UnlockOutlined'" />
  <ClusterOutlined v-if="type === 'ClusterOutlined'" />
  <DeploymentUnitOutlined v-if="type === 'DeploymentUnitOutlined'" />
  <ToolOutlined v-if="type === 'ToolOutlined'" />
  <ConsoleSqlOutlined v-if="type === 'ConsoleSqlOutlined'" />
</template>

<script>
import {
  OrderedListOutlined,
  ProjectOutlined,
  ShareAltOutlined,
  NodeExpandOutlined,
  AppstoreAddOutlined,
  ApartmentOutlined,
  UnlockOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  ToolOutlined,
  ConsoleSqlOutlined
} from "@ant-design/icons-vue";

export default {
  components: {
    OrderedListOutlined,
    ProjectOutlined,
    ShareAltOutlined,
    NodeExpandOutlined,
    AppstoreAddOutlined,
    ApartmentOutlined,
    UnlockOutlined,
    ClusterOutlined,
    DeploymentUnitOutlined,
    ToolOutlined,
    ConsoleSqlOutlined
  },
  props: ["type"]
};
</script>
