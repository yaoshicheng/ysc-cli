<template>
  <a-modal
    title="Delete Branches"
    :visible="modalVisible"
    width="600px"
    @ok="submit"
    @cancel="closeModal"
  >
    <a-table
      :pagination="false"
      :columns="Delete_Branch_Columns"
      :data-source="tableData"
      :scroll="{ x: '100%' }"
      :loading="loading"
      :row-selection="deleteRowSelection"
    >
      <template #status="{text}">
        {{ text ? "Yes" : "No" }}
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { Delete_Branch_Columns } from "../const";
import { deleteBranchById } from "../../../server/devops";
import { toRefs } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "ReleaseModal",
  props: [
    "data",
    "visible",
    "tableLoading",
    "close",
    "confirm"
  ],
  setup(props) {
    const {
      data: tableData,
      visible: modalVisible,
      confirm: onConfirm,
      tableLoading: loading
    } = toRefs(props);

    const closeModal = () => {
      if (props.close && typeof props.close === "function") {
        props.close();
      }
    };
    return {
      tableData,
      modalVisible,
      loading,

      closeModal,
      onConfirm
    };
  },
  data() {
    return {
      Delete_Branch_Columns,
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
      },
      SelectDelBranchData: [],
      deleteRowSelection: {
        onChange: this.onChange,
        getCheckboxProps: record => ({
          disabled: !(record.branch_alive && !record.protected), // Column configuration not to be checked
          name: record.name
        })
      }
    };
  },
  methods: {
    onChange(selectedRowKeys, selectedRows) {
      const SelectDelBranchData = [];
      selectedRows.forEach(item => {
        SelectDelBranchData.push(item.pk);
      });
      this.SelectDelBranchData = SelectDelBranchData;
    },
    submit() {
      if (this.SelectDelBranchData.length !== 0) {
        deleteBranchById({
          id: this.$route.params.release_id,
          data: {
            data: this.SelectDelBranchData
          }
        })
          .then(() => {
            this.$message.success("Delete Complete");
            this.onConfirm();
          })
          .catch(err => {
            handleErrorData(err);
          });
      } else {
        this.$message.warning("No Selected Branch");
      }
    }
  }
};
</script>

<style scoped></style>
