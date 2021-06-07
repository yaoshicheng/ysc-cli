export const Secret_Columns = [
  {
    title: "ID",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Classification",
    dataIndex: "classification.name",
    key: "classification.name",
    width: 140
  },
  {
    title: "Env",
    dataIndex: "environment",
    key: "environment",
    ellipsis: true,
    width: 110
  },
  {
    title: "Key",
    dataIndex: "key",
    key: "key",
    ellipsis: true,
    width: 110
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    ellipsis: true,
    width: 110
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    ellipsis: true,
    width: 110
  },
  {
    title: "Creator",
    dataIndex: "creator.username",
    key: "creator.username",
    ellipsis: true,
    width: 110
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    ellipsis: true,
    width: 110
  },
  {
    title: "Create Time",
    dataIndex: "created",
    key: "created",
    ellipsis: true,
    width: 110
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 200,
    slots: { customRender: "action" }
  }
];
export const Release_Columns = [
  {
    title: "ID",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    width: 140
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 110
  },
  {
    title: "State",
    dataIndex: "state",
    key: "key",
    ellipsis: true,
    width: 110
  },
  {
    title: "Ticket Link",
    dataIndex: "ticket_link",
    key: "ticket_link",
    ellipsis: true,
    width: 110
  },
  {
    title: "Creator",
    dataIndex: "creator.username",
    key: "creator.username",
    ellipsis: true,
    width: 110
  },
  {
    title: "Updater",
    dataIndex: "updater.username",
    key: "updater.username",
    ellipsis: true,
    width: 110
  },
  {
    title: "Release Time",
    dataIndex: "release_time",
    key: "note",
    ellipsis: true,
    width: 120
  },
  {
    title: "Create Time",
    dataIndex: "created",
    key: "created",
    ellipsis: true,
    width: 150,
    slots: { customRender: "time" }
  },
  {
    title: "Update Time",
    dataIndex: "updated",
    key: "updated",
    ellipsis: true,
    width: 150,
	  slots: { customRender: "time" }
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 320,
    slots: { customRender: "action" }
  }
];

export const Release_Detail_Columns = [
  {
    title: "ID",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Service",
    dataIndex: "application.name",
    key: "application.name",
    width: 140
  },
  {
    title: "Version",
    dataIndex: "version",
    key: "name",
    ellipsis: true,
    width: 110
  },
  {
    title: "State",
    dataIndex: "state",
    key: "key",
    ellipsis: true,
    width: 110
  },
  {
    title: "Creator",
    dataIndex: "creator.username",
    key: "creator.username",
    ellipsis: true,
    width: 110
  },
  {
    title: "Create Time",
    dataIndex: "created",
    key: "created",
    ellipsis: true,
    width: 150
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 300,
    slots: { customRender: "action" }
  }
];

export const Delete_Branch_Columns = [
  {
    title: "ID",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Repo",
    dataIndex: "repo",
    key: "repo",
    width: 140
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
    ellipsis: true,
    width: 110
  },
  {
    title: "Branch alive",
    dataIndex: "branch_alive",
    key: "branch_alive",
    ellipsis: true,
    width: 110,
    slots: { customRender: "status" }
  },
  {
    title: "IsDefault",
    dataIndex: "is_default",
    key: "creator.is_default",
    ellipsis: true,
    width: 110,
    slots: { customRender: "status" }
  },
  {
    title: "Protected",
    dataIndex: "protected",
    key: "protected",
    ellipsis: true,
    width: 110,
    slots: { customRender: "status" }
  },
  {
    title: "Merged",
    dataIndex: "merged",
    key: "merged",
    ellipsis: true,
    width: 110,
    slots: { customRender: "status" }
  }
];

export const Application_Columns = [
  {
    title: "ID",
    dataIndex: "pk",
    key: "pk",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 110
  },
  {
    title: "Type",
    dataIndex: "application_type",
    key: "application_type",
    ellipsis: true,
    width: 110
  },
  {
    title: "Module",
    dataIndex: "module",
    key: "module",
    ellipsis: true,
    width: 110
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
    ellipsis: true,
    width: 110
  },
  {
    title: "Release Sequence",
    dataIndex: "release_sequence",
    key: "release_sequence",
    ellipsis: true,
    width: 160
  },
  {
    title: "Deploy Method",
    dataIndex: "deployment_method",
    key: "deployment_method",
    ellipsis: true,
    width: 180
  },
  {
    title: "Production Tag",
    dataIndex: "production_tag",
    key: "production_tag",
    ellipsis: true,
    width: 150
  },
  {
    title: "Replica Count",
    dataIndex: "replica_count",
    key: "replica_count",
    ellipsis: true,
    width: 120
  },
  {
    title: "Multi Instance",
    dataIndex: "multi_instance_supported",
    key: "multi_instance_supported",
    ellipsis: true,
    width: 120,
    slots: { customRender: "status" }
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    ellipsis: true,
    width: 110
  },
  {
    title: "Involved People",
    dataIndex: "involved_people",
    key: "involved_people",
    ellipsis: true,
    width: 150,
    slots: { customRender: "list" }
  },
  {
    title: "Note",
    dataIndex: "note",
    key: "note",
    ellipsis: true,
    width: 160
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    ellipsis: true,
    width: 170,
    slots: { customRender: "time" }
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 200,
    slots: { customRender: "action" }
  }
];

export const Release_History_Columns = [
  {
    title: "ID",
    dataIndex: "history_id",
    key: "history_id",
    slots: { customRender: "name" },
    width: 80
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 110
  },
  {
    title: "Project",
    dataIndex: "project",
    key: "project",
    ellipsis: true,
    width: 110
  },
  {
    title: "User",
    dataIndex: "history_user.username",
    key: "history_user.username",
    ellipsis: true,
    width: 160
  },
  {
    title: "Date",
    dataIndex: "history_date",
    key: "history_date",
    ellipsis: true,
    width: 170,
    slots: { customRender: "time" }
  },
  {
    title: "Release time",
    dataIndex: "release_time",
    key: "release_time",
    ellipsis: true,
    width: 120
  },
  {
    title: "Production ready",
    dataIndex: "production_ready",
    key: "production_ready",
    ellipsis: true,
    width: 160,
    slots: { customRender: "status" }
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    ellipsis: true,
    width: 170
  }
];
