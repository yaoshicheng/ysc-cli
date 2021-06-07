export const ops_config = {
  application_type: [
    {
      label: "Java",
      value: "JAVA"
    },
    {
      label: "Javascript",
      value: "JAVASCRIPT"
    },
    {
      label: "Python",
      value: "PYTHON"
    }
  ],
  appmodule: [
    {
      label: "MAIN_SITE",
      value: "MAIN_SITE"
    },
    {
      label: "MANAGE",
      value: "MANAGE"
    },
    {
      label: "SURVEILLANCE",
      value: "SURVEILLANCE"
    },
    {
      label: "MONITOR",
      value: "MONITOR"
    }
  ],
  classification: [
    {
      value: "FRONTEND",
      display_name: "Frontend"
    },
    {
      value: "BACKEND",
      display_name: "Backend"
    }
  ],
  deployment_method: [
    {
      value: "K8S_DEPLOYMENT",
      display_name: "K8S_DEPLOYMENT"
    },
    {
      value: "K8S_DAEMON_SET",
      display_name: "K8S_DAEMON_SET"
    },
    {
      value: "BARE_METAL",
      display_name: "BARE_METAL"
    }
  ],
  state: [
    {
      value: "DEVELOPING",
      display_name: "DEVELOPING"
    },
    {
      value: "ONLINE",
      display_name: "ONLINE"
    },
    {
      value: "OFFLINE",
      display_name: "OFFLINE"
    }
  ],
  sec_env: [
    {
      value: "DEVELOP",
      display_name: "DEVELOP"
    },
    {
      value: "TEST",
      display_name: "TEST"
    },
    {
      value: "UAT",
      display_name: "UAT"
    },
    {
      value: "BENCHMARK",
      display_name: "BENCHMARK"
    },
    {
      value: "PRODUCTION",
      display_name: "PRODUCTION"
    },
    {
      value: "DR",
      display_name: "DR"
    },
    {
      value: "OTHER",
      display_name: "OTHER"
    }
  ]
};
