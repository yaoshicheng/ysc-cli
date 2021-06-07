<template>
  <a-modal
    :title="popType === 'add' ? 'Add Release' : 'Update Release'"
    :visible="modalVisible"
    width="600px"
    @ok="addSubmit"
    @cancel="closeModal"
  >
    <a-form
      :model="formData"
      :rules="formRules"
      ref="releaseUpdateForm"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-form-item label="Name" name="name">
        <a-input
          size="large"
          v-model:value="formData.name"
          placeholder="Input release name"
        ></a-input>
      </a-form-item>
      <a-form-item label="Ticket link" name="ticket_link">
        <a-input
          size="large"
          v-model:value="formData.ticket_link"
          placeholder="Input ticket link"
        ></a-input>
      </a-form-item>
      <a-form-item label="Release time" name="release_time">
        <a-date-picker
          size="large"
          v-model:value="formData.release_time"
          type="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        ></a-date-picker>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addRelease, updateRelease } from "../../../server/devops";
import { toRefs } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "ReleaseModal",
  props: ["data", "visible", "actionType", "close", "confirm"],
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
        name: [{ required: true, message: "require name", trigger: "blur" }],
        release_time: [
          { required: true, message: "require time", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    addSubmit() {
      this.$refs.releaseUpdateForm
        .validate()
        .then(valid => {
          if (valid) {
            if (this.actionType === "add") {
              addRelease({ data: this.formData })
                .then(() => {
                  this.$message.success("Create Complete");
                  this.onConfirm();
                })
                .catch(err => {
                  handleErrorData(err);
                });
            } else {
              updateRelease({ id: this.formData.pk, data: this.formData })
                .then(() => {
                  this.$message.success("Update Complete!");
                  this.onConfirm();
                })
                .catch(err => {
                  handleErrorData(err);
                });
            }
          }
        })
        .catch(err => handleErrorData(err));
    }
  }
};
</script>

<style scoped></style>
