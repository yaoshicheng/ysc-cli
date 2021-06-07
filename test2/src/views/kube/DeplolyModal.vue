<template>
  <a-form class="updateDeployForm" :labelCol="labelCol" :wrapperCol="wrapperCol">
    <a-form-item label="Cluster" name="cluster">
      <a-input  size="large" v-model:value="data.cluster.name" disabled></a-input>
    </a-form-item>
    <a-form-item label="Cluster" name="namespace">
      <a-input  size="large" v-model:value="data.namespace.name" disabled></a-input>
    </a-form-item>
    <a-form-item label="Replica count" name="replica_count">
      <a-input-number
        size="large"
        style="width: 70%"
        v-model:value="data.replica_count"
        :min="0"
        :max="10"
      ></a-input-number>
      <a-tooltip>
        <template #title>
          Update Replica Count
        </template>
        <a-button
          style="margin-left: 20px"
          type="primary"
          @click.stop="UpRcDeploy('RC')"
          :disabled="!up_rc_enable"
          >Update</a-button
        >
      </a-tooltip>
    </a-form-item>
    <a-form-item label="CPU" name="cpu">
      <a-input-number
        size="large"
        style="width: 70%"
        v-model:value="data.cpu"
        :min="0"
        :max="10"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="Ram" name="ram">
      <a-input-number
        size="large"
        style="width: 70%"
        v-model:value="data.ram"
        :min="0"
        :max="10"
      ></a-input-number>
      <a-tooltip>
        <template #title>
          Update CPU Ram
        </template>
        <a-button
          style="margin-left: 20px"
          type="primary"
          @click.stop="UpRcDeploy('CPU')"
          :disabled="!up_cpu_ram_enable"
          >Update</a-button
        >
      </a-tooltip>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref, toRefs, unref } from "vue";
import { updateRcDeployment, updateCpuDeployment } from "../../server/kube";
import { message } from "ant-design-vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "K8sSearch",

  props: {
    DeployData: {
      type: Object
    }
  },
  setup(props) {
    const { DeployData: data } = toRefs(props);
    const up_rc_enable = ref(true);
    const up_cpu_ram_enable = ref(true);

    const UpRcDeploy = type => {
      const { pk, replica_count, cpu, ram } = unref(data);
      if (type === "RC") {
        up_rc_enable.value = false;
        let params = {
          replica_count: replica_count,
          update_application: true
        };
        updateRcDeployment({ param: pk, data: params })
          .then(() => {
            message.success("Complete");
            setTimeout(() => {
              up_rc_enable.value = true;
            }, 3000);
          })
          .catch(err => {
            handleErrorData(err);
            up_rc_enable.value = true;
          });
      } else if (type === "CPU") {
        up_cpu_ram_enable.value = false;
        let params = {
          cpu: cpu,
          ram: ram
        };
        updateCpuDeployment({ param: pk, data: params })
          .then(() => {
            message.success("Complete");
            setTimeout(() => {
              up_cpu_ram_enable.value = true;
            }, 3000);
          })
          .catch(err => {
            handleErrorData(err);
            up_cpu_ram_enable.value = true;
          });
      }
    };

    return {
      data,
      UpRcDeploy,
      up_rc_enable,
      up_cpu_ram_enable
    };
  },
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    };
  }
};
</script>

<style lang="scss" scoped>
  .updateDeployForm {
    width: 100%;
  }
  .buttonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
</style>
