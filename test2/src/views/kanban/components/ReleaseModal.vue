<template>
  <a-modal
    title="Assign Release"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @cancel="afterClose"
    @ok="confirmRelease"
  >
    <a-spin :spinning="loading">
      <a-form
        layout="inline"
        ref="ruleAssign"
        :model="assignform"
        :rules="assignRules"
      >
        <a-form-item
          ref="id"
          name="id"
          label="Release"
          :error="get(errorData, 'release_pk[0]', '')"
        >
          <a-select
            size="large"
            allowClear
            v-model:value="assignform.id"
            placeholder="Release"
          >
            <a-select-option
              v-for="item in list"
              :key="item.pk"
              :value="toString(item.pk)"
            >
              #{{ item.pk }} {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>
<script>
import { get, toString } from "lodash";
import { handleErrorData, getAllData } from "@/common/js/utils";
export default {
  props: ["visible", "confirmLoading", "handleOk", "afterClose", "errorData"],
  data() {
    return {
      assignform: {
        id: ""
      },
      assignRules: {
        id: [
          {
            required: true,
            message: "Require Release",
            trigger: "blur"
          }
        ]
      },
      list: [],
      loading: false,
      get,
      toString
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getAllData("/api/devops/release")
        .then(res => {
          this.list = res;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          handleErrorData(err);
        });
    },
    confirmRelease() {
      this.$refs.ruleAssign.validate().then(() => {
        const { handleOk } = this.$props;
        const id = this.assignform.id;
        handleOk(id);
      });
    }
  }
};
</script>
