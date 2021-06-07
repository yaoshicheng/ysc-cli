<template>
  <a-modal
    :title="popType === 'add' ? 'Add Secret' : 'Update Secret'"
    :visible="modalVisible"
    width="600px"
    @ok="addSubmit"
    @cancel="closeModal"
  >
    <a-form
      :model="formData"
      :rules="formRules"
      ref="secretUpdateForm"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-item name="classification" label="Classification">
        <a-select
          size="large"
          v-model:value="formData.classification"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(cls, index) of sClass"
            :value="cls.pk"
            :key="index"
          >
            {{ cls.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="environment" label="Environment">
        <a-select
          size="large"
          v-model:value="formData.environment"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(env, index) of sEnvs"
            :value="env.value"
            :key="index"
          >
            {{ env.display_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="key" label="Key">
        <a-input size="large" v-model:value="formData.key"></a-input>
      </a-form-item>
      <a-form-item name="value" label="Value">
        <a-input size="large" v-model:value="formData.value"></a-input>
      </a-form-item>
      <a-form-item name="link" label="Link">
        <a-input size="large" v-model:value="formData.link"></a-input>
      </a-form-item>
      <a-form-item name="note" label="Note">
        <a-input
          size="large"
          v-model:value="formData.note"
          type="textarea"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addSecret, updateSecret } from "../../../server/devops";
import { toRefs } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "SecretModal",
  props: [
    "data",
    "visible",
    "secretClass",
    "secretEnvs",
    "actionType",
    "close",
    "confirm"
  ],
  setup(props) {
    const {
      data: formData,
      visible: modalVisible,
      secretClass: sClass,
      secretEnvs: sEnvs,
      actionType: popType,
      confirm: onConfirm
    } = toRefs(props);

    const closeModal = () => {
      // modalVisible.value = false;
      if (props.close && typeof props.close === "function") {
        props.close();
      }
    };
    return {
      formData,
      modalVisible,
      sClass,
      sEnvs,
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
        classification: [
          {
            required: true,
            message: "Classification Required",
            trigger: "blur",
            type: "number"
          }
        ],
        environment: [
          { required: true, message: "Environment Required ", trigger: "blur" }
        ],
        key: [{ required: true, message: "Key Required", trigger: "blur" }],
        value: [{ required: true, message: "Value Required", trigger: "blur" }],
        link: [{ required: true, message: "Link Required", trigger: "blur" }]
      }
    };
  },
  methods: {
    addSubmit() {
      this.$refs.secretUpdateForm
        .validate()
        .then(valid => {
          if (valid) {
            if (this.popType === "add") {
              addSecret({ data: this.formData })
                .then(() => {
                  this.$message.success("Add Succeed!");
                  this.onConfirm();
                })
                .catch(err => {
                  handleErrorData(err);
                });
            } else {
              updateSecret({ id: this.formData.pk, data: this.formData })
                .then(() => {
                  this.$message.success("Update Succeed!");
                  this.onConfirm();
                })
                .catch(err => {
                  handleErrorData(err);
                });
            }
          }
        })
        .catch(() => {
          this.$message.error("Pelease fill the form !");
        });
    }
  }
};
</script>

<style scoped>
.ant-col.ant-form-item-label {
  width: 100px !important;
}
</style>
