<template>
  <div class="devops_release">
    <a-tabs v-model:value="ActiveReleaseEnv">
      <a-tab-pane
        v-for="(env, index) of Envs"
        :label="env.name"
        :tab="env.name"
        :key="index"
        @change="changeTab"
      >
        <deployment
          @LoadRelease="LoadRelease"
          :releasedata="ReleaseData"
          :env="Envs.find(item => item.name === env.name)"
          :envinfo="Envs"
          :ApplicationList="ApplicationList"
        ></deployment>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import deployment from "./deployment";

import {
  getReleaseById,
  getDevopsEnvironment,
  getDevopsApplication
} from "../../../server/devops";

export default {
  name: "Release",
  data() {
    return {
      ActiveReleaseEnv: "BENCHMARK", // UAT Production
      // Envs: ["BENCHMARK","UAT","PRODUCTION"],
      Envs: [],
      ReleaseData: {},
      ApplicationList: [],
      EnvOrders: ["BENCHMARK", "UAT", "PRODUCTION"]
    };
  },
  components: {
    deployment
  },
  mounted() {
    this.LoadEnvs();
    this.LoadServiceList();
    this.LoadRelease();
  },
  methods: {
    OrderEnvs(envs) {
      let OrderedEnvs = [];
      this.EnvOrders.forEach(env => {
        let selenv = envs.find(item => item.name === env);
        let selenvindex = envs.findIndex(item => item.name === env);
        OrderedEnvs.push(selenv);
        envs.splice(selenvindex, 1);
      });
      envs.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0));
      return OrderedEnvs.concat(envs);
    },
	  changeTab(){
		  getReleaseById({ id: this.$route.params.release_id }).then(res => {
			  this.ReleaseData = res.data;
		  });
    },
    LoadRelease() {
      getReleaseById({ id: this.$route.params.release_id }).then(res => {
        this.ReleaseData = res.data;
      });
    },

    LoadEnvs() {
      getDevopsEnvironment()
        .then(res => {
          this.Envs = this.OrderEnvs(res.data);
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },

    LoadServiceList() {
      getDevopsApplication({ all: true })
        .then(res => {
          this.ApplicationList = res.data;
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    }
  }
};
</script>

<style scoped></style>
