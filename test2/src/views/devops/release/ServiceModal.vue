<template>
  <a-modal
    :title="popType === 'add' ? 'Add Service' : 'Edit Service'"
    :visible="modalVisible"
    width="600px"
    @ok="submit"
    @cancel="closeModal"
  >
    <a-form
      :model="formData"
      :rules="formRules"
      ref="serviceModalForm"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-item label="Application" name="application">
        <a-select
          size="large"
          v-model:value="formData.application"
          @change="changeApp"
          placeholder="Select Application"
          :disabled="!SelectSvcEnable"
          allowClear
          loading-text="Loading"
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(service, index) of ApplicationList"
            :value="service.pk"
            :key="index"
          >
            {{ service.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Version" name="version">
        <a-select
          size="large"
          v-model:value="formData.version"
          placeholder="Select Version"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(version, index) of AppVersions"
            :value="version"
            :key="index"
            >{{ version }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="note" name="note">
        <a-textarea v-model:value="formData.note"></a-textarea>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import {
  addDeploymentById,
  editDeploymentById,
  getTagsById
} from "../../../server/devops";
import { toRefs } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "ReleaseModal",
  props: [
    "data",
    "visible",
    "actionType",
    "close",
    "confirm",
    "AppVersions",
    "ApplicationList",
    "SelectSvcEnable",
    "changeAppVersion",
  ],
  setup(props) {
    const {
      data: formData,
      visible: modalVisible,
      actionType: popType,
      confirm: onConfirm
    } = toRefs(props);

    const closeModal = () => {
      if (props.close && typeof props.close === "function") {
        props.close();
      }
    };
    return {
      formData,
      modalVisible,
      popType,

      closeModal,
      onConfirm
    };
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      formRules: {
        application: [
          {
            required: true,
            message: "require service",
            trigger: "blur",
            type: "number"
          }
        ],
        version: [
          { required: true, message: "require service", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeApp(val) {
    	if(this.changeAppVersion){
		    this.changeAppVersion(val);
      }
    },
    submit() {
      this.$refs.serviceModalForm.validate().then(valid => {
        if (valid) {
          if (this.popType === "add") {
            addDeploymentById({
              id: this.$route.params.release_id,
              data: this.formData
            })
              .then(() => {
                this.$message.success("Add Complete");
                this.onConfirm();
              })
              .catch(err => {
                handleErrorData(err);
              });
          } else {
            this.addLoading = true;
            editDeploymentById({ id: this.formData.pk, data: this.formData })
              .then(() => {
                this.$message.success("Update Complete");
                this.onConfirm();
              })
              .catch(err => {
                handleErrorData(err);
              });
          }
        }
      });
    }
  }
};
</script>

<style scoped></style>
