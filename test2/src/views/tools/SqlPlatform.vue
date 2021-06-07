<template>
  <div style="display: flex">
    <div class="formContainer">
      <a-form
        :inline="false"
        label-width="100px"
        label-suffix=":"
        size="medium"
      >
        <a-form-item label="Env">
          <div :style="{ borderBottom: '1px solid #E9E9E9' }">
            <a-checkbox
              v-model:checked="checkAll"
              :indeterminate="indeterminate"
              @change="onCheckAllChange"
            >
              All
            </a-checkbox>
          </div>
          <br />
          <a-checkbox-group v-model:value="environments" @change="onChange">
            <a-row v-for="env in dbs" :key="env.pk">
              <a-col :span="24">
                <a-checkbox :value="env.pk">
                  {{ env.environment_name }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item
          label="Command"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea
            v-model:value="input_content"
            placeholder="Input Sql"
            :auto-size="{ minRows: 10, maxRows: 15 }"
          ></a-textarea>
        </a-form-item>
        <div class="btngroup">
          <a-upload
            class="uploadfile"
            name="input_file"
            :accept="fileType"
            action=""
            :fileList="fileList"
            :beforeUpload="beforeUpload"
            :remove="beforeRemove"
          >
            <a-button type="primary">
              <upload-outlined /> Upload Sql File
            </a-button>
          </a-upload>
          <div class="submit_button">
            <a-button @click="Execute" type="default">Submit</a-button>
          </div>
        </div>
      </a-form>
    </div>

    <div class="result">
      <div v-for="result of output" :key="result.environment.environment_name">
        <h4>{{ result.environment.environment_name }}:</h4>
        <p>{{ result.output }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { UploadOutlined } from '@ant-design/icons-vue';
import { handleErrorData } from "@/common/js/utils";
import { execSqlAction, loadDbs, uploadSqlFile } from "../../server/tools";

export default {
  name: "SqlPlatform",
  components:{
	  UploadOutlined
  },
  setup() {
    const dbs = ref([]);
    const allEnvs = ref([]);
    const environments = ref([]);
    const getDBS = () => {
      loadDbs()
        .then(res => {
          dbs.value = res.data;
          allEnvs.value = (res.data || []).map(db => db.pk);
          environments.value = allEnvs.value;
        })
        .catch(err => {
          handleErrorData(err);
        });
    };

    onMounted(getDBS);

    return {
      dbs,
      allEnvs,
      environments,
      getDBS
    };
  },
  data() {
    return {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      checkAll: true,
      checkedList: [],
      indeterminate: false,
      fileType: ".sql",
      fileList: [],
      headers: {
        "content-type": "multipart/form-data"
      },
      output: "",
      input_content: "",
      input_file: null
    };
  },
  methods: {
    onChange(environments) {
      this.indeterminate =
        !!environments.length && environments.length < this.dbs.length;
      this.checkAll = environments.length === this.dbs.length;
    },

    onCheckAllChange(e) {
      Object.assign(this, {
        environments: e.target.checked ? this.allEnvs : [],
        indeterminate: false
      });
    },

    beforeRemove(file) {
      return new Promise((resolve, reject) => {
        this.$modal.confirm({
          title: "Warning",
          content: `Remove ${file.name} ?`,
          okText: "Yes",
          cancelButtonText: "No",
          type: "warning",
          onOk: () => {
            this.fileList = [];
            resolve(true);
          },
          onCancel: () => {
            reject(false);
          }
        });
      })
        .then(() => {
          this.$message.success("Remove Succeed!");
          return true;
        })
        .catch(() => {
          return false;
        });
    },

    beforeUpload(file, fileList) {
      if (this.fileList && this.fileList.length > 0) {
        this.$message.warning("Only one file supported!");
      } else {
        this.input_file = file;
        this.fileList = [...fileList];
      }
      return false;
    },

    ExecuteCommand() {
      execSqlAction({
        environments: this.environments,
        input_content: this.input_content,
        input_file: null
      })
        .then(res => {
          this.$message.success("Execute succeed!");
          this.output = res.data.results;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },

    ExecuteSql() {
      let formData = new FormData();
      formData.append("input_file", this.input_file);
      formData.append("input_content", "");
      this.environments.forEach(pk => {
        formData.append("environments", pk);
      });
      uploadSqlFile({ data: formData, headers: this.headers })
        .then(res => {
          this.$message.success("Success Complete");
          this.output = res.data.results;
        })
        .catch(err => {
          handleErrorData(err);
        });
    },

    Execute() {
      if (this.environments.length === 0) {
        this.$message.error("At least one env need to be selected!");
      } else if (this.input_content !== "") {
        this.ExecuteCommand();
      } else {
        if (this.fileList.length === 0) {
          this.$message.error("Please input command or upLoad sql file!");
        } else {
          this.ExecuteSql();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 50%;
  padding: 20px;
}
.btngroup {
  display: flex;
  justify-content: flex-end;
}
.uploadfile {
  margin-right: 20px;
  height: 40px;
}

.el-form {
  position: relative;
  margin: 10px 10px 10px 10px;
  width: 35%;
  border: 1px solid #ebebeb;
  height: 700px;

  .el-form-item {
    margin-right: 20px;
  }
}

.submit_button {
  text-align: center;
  bottom: 20px;
}

.result {
  border: 1px solid #ebebeb;
  width: 50%;
  height: 550px;
  margin: 10px 10px 10px 10px;
  background: #1f2d3d;
  color: #f8f8f8;
  font-size: medium;

  h4 {
    margin-left: 10px;
  }
  p {
    margin-left: 30px;
    margin-right: 30px;
    overflow-wrap: break-word;
  }
  textarea.ant-input {
    width: 400px !important;
  }
}
</style>
