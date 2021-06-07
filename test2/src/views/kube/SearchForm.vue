<template>
  <div class="toolbar">
    <div class="searchBox">
      <a-form
        :inline="true"
        class="searchForm"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-row>
          <a-col :sm="12" :md="7" lg="6">
            <a-form-item>
              <a-select
                size="large"
                v-model:value="kube_cluster"
                placeholder="Clutser"
                allowClear
                showSearch
                option-filter-prop="label"
              >
                <a-select-option
                  v-for="(cluster, index) of kube_clusters"
                  :key="index"
                  :value="cluster.pk"
                  >{{ cluster.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :sm="12" :md="7" lg="6">
            <a-form-item>
              <a-select
                size="large"
                v-model:value="kube_ns"
                placeholder="Namespace"
                allowClear
                showSearch
                option-filter-prop="label"
              >
                <a-select-option
                  v-for="(ns, index) of kube_nss"
                  :key="index"
                  :value="ns.pk"
                  >{{ ns.name }}</a-select-option
                >
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :sm="12" :md="7" lg="6">
            <a-form-item>
              <a-input
                size="large"
                v-model:value="appname"
                allowClear
                placeholder="Name"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="3" lg="3">
            <a-form-item class="buttonContainer">
              <a-button type="primary" @click="searchData">
                Search
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import { getCluster, getNameSpace } from "../../server/kube";
import { ref, onMounted } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "K8sSearch",

  props: {
    search: {
      type: Function
    }
  },
  setup(props) {
    const kube_clusters = ref([]);
    const kube_nss = ref([]);
    const kube_cluster = ref(null);
    const kube_ns = ref(null);
    const appname = ref(null);

    const searchData = () => {
      props.search({
        kube_cluster,
        kube_ns,
        appname
      });
    };

    const init = () => {
      getCluster()
        .then(res => {
          kube_clusters.value = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
      getNameSpace()
        .then(res => {
          kube_nss.value = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
      searchData();
    };

    onMounted(init);

    return {
      kube_clusters,
      kube_nss,
      kube_cluster,
      kube_ns,
      appname,
      searchData
    };
  },

  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 20 }
    };
  }
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid #eee;
}
.toolbar {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  .searchForm {
    width: 100%;
  }
  .buttonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
