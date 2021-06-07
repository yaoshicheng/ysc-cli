export const SQL_History_Columns = [
	{
		title: "ID",
		dataIndex: "pk",
		key: "pk",
		slots: { customRender: "name" },
		width: 80
	},
	{
		title: "Database Name",
		dataIndex: "database_name",
		key: "database_name",
		width: 140
	},
	{
		title: "Content Type",
		dataIndex: "content_type",
		key: "content_type",
		ellipsis: true,
		width: 110
	},
	{
		title: "Input Content",
		dataIndex: "input_content",
		key: "input_content",
		ellipsis: true,
		width: 110
	},
	{
		title: "File Name",
		dataIndex: "input_file",
		key: "input_file",
		ellipsis: true,
		width: 110
	},
	{
		title: "User Name",
		dataIndex: "who.username",
		key: "who",
		ellipsis: true,
		width: 110
	},
	{
		title: "Create Time",
		dataIndex: "created",
		key: "created",
		ellipsis: true,
		width: 150,
		slots: { customRender: "time" }
	}
];
