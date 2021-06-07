<template>
  <a-modal
    :title="popType === 'add' ? 'Add Application' : 'Update Application'"
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
      <a-form-item name="name" label="Name">
        <a-input
          v-model:value="formData.name"
          placeholder="Application name"
        ></a-input>
      </a-form-item>
      <a-form-item name="project" label="Project">
        <a-input
          v-model:value="formData.project"
          placeholder="Project name"
          disabled
        ></a-input>
      </a-form-item>
      <a-form-item name="application_type" label="Application Type">
        <a-select
          v-model:value="formData.application_type"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(type, index) of application_type"
            :value="type.value"
            :key="index"
            >{{ type.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="module" label="Module">
        <a-select
          v-model:value="formData.module"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(m, index) of appmodule"
            :value="m.value"
            :key="index"
            >{{ m.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="classification" label="Classification">
        <a-select
          v-model:value="formData.classification"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(classification, index) of classification"
            :value="classification.value"
            :key="index"
            >{{ classification.display_name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="state" label="State">
        <a-select
          v-model:value="formData.state"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(state, index) of state"
            :value="state.value"
            :key="index"
            >{{ state.display_name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="deployment_method" label="deployment_method">
        <a-select
          v-model:value="formData.deployment_method"
          allowClear
          showSearch
          option-filter-prop="label"
        >
          <a-select-option
            v-for="(method, index) of deployment_method"
            :value="method.value"
            :key="index"
            allowClear
            showSearch
            option-filter-prop="label"
            >{{ method.display_name }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item name="release_sequence" label="Release sequence">
        <a-input
          v-model:value="formData.release_sequence"
          placeholder="release_sequence"
          type="number"
        ></a-input>
      </a-form-item>
      <a-form-item name="involved_people" label="Involved people">
        <a-select
          v-model:value="formData.involved_people"
          allowClear
          showSearch
          option-filter-prop="label"
          mode="multiple"
        >
          <a-select-option
            v-for="(user, index) of Users"
            :value="user.pk"
            :key="index"
            >{{ user.username }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        name="multi_instance_supported"
        label="Multi Instance Supported"
      >
        <a-checkbox
          v-model:checked="formData.multi_instance_supported"
        ></a-checkbox>
      </a-form-item>
      <a-form-item name="note" label="Note">
        <a-input
          v-model:value="formData.note"
          placeholder="note"
          type="textarea"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { toRefs, ref, onMounted } from "vue";
import { ops_config } from "@/common/const";
import { handleErrorData } from "@/common/js/utils";
import { addApplication, updateApplication } from "../../../server/devops";
import { getUsers } from "../../../server/user";

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

    const Users = ref([]);

    const getAllUsers = () => {
      getUsers()
        .then(res => {
          Users.value = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
    };

    const closeModal = () => {
      if (props.close && typeof props.close === "function") {
        props.close();
      }
    };

    onMounted(getAllUsers);

    return {
      formData,
      modalVisible,
      sClass,
      sEnvs,
      popType,
      Users,

      appmodule: ops_config.appmodule,
      application_type: ops_config.application_type,
      classification: ops_config.classification,
      deployment_method: ops_config.deployment_method,
      state: ops_config.state,

      closeModal,
      getAllUsers,
      onConfirm
    };
  },
  data() {
    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
	    formRules: {
        name: [
          {
            required: true,
            message: "Required",
            trigger: "blur"
          }
        ],
        project: [
          { required: true, message: "Required", trigger: "blur" }
        ],
        application_type: [
          {
            required: true,
            message: "Required",
            trigger: "blur"
          }
        ],
        module: [{ required: true, message: "Required", trigger: "blur" }],
        classification: [
          { required: true, message: "Required", trigger: "blur" }
        ],
        state: [{ required: true, message: "Required", trigger: "blur" }],
        deployment_method: [
          {
            required: true,
            message: "Required",
            trigger: "blur"
          }
        ],
        release_sequence: [
          {
            required: true,
            message: "Required",
            trigger: "blur"
          }
        ],
        involved_people: [
          {
            required: true,
            message: "Required",
            trigger: "blur",
            whiteSpace: false,
            type: "array"
          }
        ]
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
	            addApplication({ data: this.formData })
                .then(() => {
                  this.$message.success("Add Succeed!");
                  this.onConfirm();
                })
                .catch(err => {
                  handleErrorData(err);
                });
            } else {
	            updateApplication({ id: this.formData.pk, data: this.formData })
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
		      this.$message.error("Pelease fill the form!");
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
