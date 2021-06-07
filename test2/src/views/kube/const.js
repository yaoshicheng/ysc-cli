export const Deploy_Columns = [
  {
    title: "pk",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Cluster",
    dataIndex: "cluster.name",
    key: "cluster.name",
    width: 80
  },
  {
    title: "Namespace",
    dataIndex: "namespace.name",
    key: "namespace.name",
    width: 110
  },
  {
    title: "Application",
    dataIndex: "application.name",
    key: "application.name",
    width: 110
  },
  {
    title: "Replica_count",
    dataIndex: "replica_count",
    key: "replica_count",
    width: 150
  },
  {
    title: "CPU",
    dataIndex: "cpu",
    key: "cpu",
    width: 100
  },
  {
    title: "Ram",
    dataIndex: "ram",
    key: "ram",
    width: 100
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 200,
    slots: { customRender: "action" }
  }
];
export const Deploy_History_Columns = [
  {
    title: "pk",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 50
  },
  {
    title: "Deployment",
    dataIndex: "deployment",
    key: "deployment",
    width: 100
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 120,
    ellipsis: true
  },
  {
    title: "RC",
    dataIndex: "replica_count",
    key: "replica_count",
    ellipsis: true
  },
  {
    title: "CPU",
    dataIndex: "cpu",
    key: "cpu",
    ellipsis: true
  },
  {
    title: "Ram",
    dataIndex: "ram",
    key: "ram",
    ellipsis: true
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    ellipsis: true
  },
  {
    title: "Time",
    dataIndex: "op_time",
    key: "op_time",
    width: 150,
    slots: { customRender: "time" }
  }
];
