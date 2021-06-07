<template>
  <div class="">
    <div class="transfer_form" :loading="translogload">
      <h4 class="subTitle">Transfer Form</h4>
      <div class="task_transfer_info">
        <a-form
          :model="AddTransferData"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-form-item label="Frontend Repo And Branch">
            <el-cascader
              style="width:100%"
              :options="Frontend_Repo"
              :props="{
                multiple: true,
                emitPath: false,
                expandTrigger: 'hover'
              }"
              v-model:value="AddTransferData.frontend_repo_and_branch"
              clearable
            >
            </el-cascader>
          </a-form-item>
          <a-form-item label="Backend Repo And Branch">
            <el-cascader
              style="width:100%"
              :options="Backend_Repo"
              :props="{
                multiple: true,
                emitPath: false,
                expandTrigger: 'hover'
              }"
              v-model="AddTransferData.backend_repo_and_branch"
              clearable
            ></el-cascader>
          </a-form-item>
          <a-form-item label="System">
            <a-select size="large" v-model:value="AddTransferData.system">
              <a-select-option
                v-for="(system, index) of systemselect"
                :value="system"
                :key="index"
              >
                {{ system }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="config">
            <a-textarea v-model:value="AddTransferData.config" :autosize="autoSize"></a-textarea>
          </a-form-item>
          <a-form-item label="script">
            <a-textarea v-model:value="AddTransferData.script" :autosize="autoSize"></a-textarea>
          </a-form-item>
          <a-form-item label="comment">
            <a-textarea v-model:value="AddTransferData.comment" :autosize="autoSize"></a-textarea>
          </a-form-item>
        </a-form>
        <div class="dialog-footer">
          <a-button @click="Back" style="margin-right: 20px">Back</a-button>
          <a-button type="primary" @click="TransferSubmit" :loading="addLoading"
            >Submit</a-button
          >
        </div>
      </div>
    </div>

    <div class="transfer_his" :loading="translogload">
      <h4 class="subTitle">Transfer Log</h4>
      <a-timeline v-if="TransferLogList.length !== 0">
        <a-timeline-item
          v-for="(translog, index) in TransferLogList"
          :key="index"
        >
          {{ translog.sender.username }}
          <br />
          {{ moment(translog.created).format("YYYY-MM-DD hh:mm:ss") }}
        </a-timeline-item>
      </a-timeline>
      <div style="margin: 30px" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import {
  transferReleaseById,
  getRepo,
  getTransferById
} from "../../../server/devops";

export default {
  name: "release_transfer",
  data() {
    return {
      moment,
	    autoSize: { minRows: 3, maxRows: 8 },
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
      translogload: false,
      Frontend_Repo: [],
      Backend_Repo: [],
      TransferLogList: [],
      addLoading: false,
      systemselect: ["MAIN_SITE", "REGULATION"],
      AddTransferData: {
        system: "MAIN_SITE",
        release: this.$route.params.pk,
        config: "",
        script: "",
        comment: "",
        frontend_repo_and_branch: [],
        backend_repo_and_branch: []
      }
    };
  },
  mounted() {
    this.LoadTransfer();
    this.LoadRepo();
  },
  methods: {
    onChange() {},
    ChangeBranch(values) {
      console.log("value", values);

      values.forEach(value => {
        this.Frontend_Repo.forEach(item => {
          console.log("foreach");
          if (item.children.find(i => (i.value = value))) {
            item.children.forEach(ie => {
              ie.disabled = ie.value !== value;
            });
          } else {
            item.children.forEach(ie => {
              ie.disabled = false;
            });
          }
        });
      });
    },

    TransferSubmit() {
      this.addLoading = true;
      const {
        system,
        release,
        config,
        script,
        comment,
        frontend_repo_and_branch,
        backend_repo_and_branch
      } = this.AddTransferData;

      transferReleaseById({
        id: this.$route.params.pk,
        data: {
          system,
          release,
          config,
          script,
          comment,
          frontend_repo_and_branch: [(frontend_repo_and_branch || []).pop()],
          backend_repo_and_branch: [(backend_repo_and_branch || []).pop()]
        }
      })
        .then(() => {
          this.$message.success("Transfer Complete");
          this.addLoading = false;
          this.LoadTransfer();
        })
        .catch(err => {
          this.$message.error(err.message);
          this.addLoading = false;
        });
    },

    GetFrontend_Repo() {
      const params = {
        group: "frontend"
      };
      return getRepo(params);
    },

    GetBackend_Repo() {
      const params = {
        group: "backend"
      };
      return getRepo(params);
    },

    AddRepoValue(Data) {
      Data.forEach((item, index) => {
        item.value = index;
      });
      return Data;
    },

    LoadRepo() {
      Promise.all([this.GetFrontend_Repo(), this.GetBackend_Repo()]).then(
        resData => {
          const [Frontend_Get_Repo, Backend_Get_Repo] = resData;
          this.Frontend_Repo = this.AddRepoValue(Frontend_Get_Repo.data);
          this.Backend_Repo = this.AddRepoValue(Backend_Get_Repo.data);
        }
      );
      // this.$axios.all([this.GetFrontend_Repo(), this.GetBackend_Repo()]).then(
      //   this.$axios.spread((Frontend_Get_Repo, Backend_Get_Repo) => {
      //     this.Frontend_Repo = this.AddRepoValue(Frontend_Get_Repo.data);
      //     this.Backend_Repo = this.AddRepoValue(Backend_Get_Repo.data);
      //   })
      // );
    },

    ChgRepoData(branchlist) {
      let branch = [];
      branchlist.forEach(item => {
        branch.push(item.id);
      });
      return branch;
    },

    LoadTransfer() {
      this.translogload = true;
      getTransferById(this.$route.params.pk).then(res => {
        let data = res.data;
        if (data.length !== 0) {
          this.TransferLogList = data;
          this.AddTransferData = {
            system: data[0].system,
            release: this.$route.params.pk,
            config: data[0].config,
            script: data[0].script,
            comment: data[0].comment,
            frontend_repo_and_branch: this.ChgRepoData(
              data[0].frontend_repo_and_branch
            ),
            backend_repo_and_branch: this.ChgRepoData(
              data[0].backend_repo_and_branch
            )
          };
        }
        this.translogload = false;
      });
    },

    Back() {
      this.AddTransferData = {
        system: "",
        release: "",
        config: "",
        script: "",
        comment: "",
        frontend_repo_and_branch: [],
        backend_repo_and_branch: []
      };
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.task_transfer_info {
  margin: 20px 30px 40px 10px;
  .el-form-item {
    margin-bottom: 20px;
    .el-cascader {
      height: auto;
      width: 400px;
    }
    .el-input {
      width: auto;
    }
  }
  .dialog-footer {
    margin-top: 30px;
    text-align: left;
  }
}

.transfer_form {
  width: 45%;
  border: 1px solid #ebebeb;
  margin-right: 5px;
  margin-bottom: 20px;
  float: left;
  min-height: 600px;
}

.transfer_his {
  width: 50%;
  border: 1px solid #ebebeb;
  float: left;
  margin-left: 20px;
  min-height: 600px;

  .el-timeline {
    margin: 20px 20px 20px 20px;
  }
}
.ant-timeline {
  margin: 20px 30px !important;
}
.ant-form-item-label {
  width: 100% !important;
  text-align: left;
}
.ant-col {
  width: 100% !important;
}
  .el-cascader{
    width: 100% !important;
  }
</style>
