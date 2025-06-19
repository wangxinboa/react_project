import { useMemo } from "react";
import { Button, Table } from "antd";

export default function AnalysisTable(props = {}) {
	const { dataSource, handleEditCodeRecord, handleAnalysisCodeRecord, handleDeleteCodeRecord } = props;

	const columns = useMemo(() => {
		return [
			{
				title: "id",
				dataIndex: "id",
				key: "id",
				width: "80px",
			},
			{
				title: "项目名称",
				dataIndex: "name",
				key: "name",
				width: 120,
			},
			{
				title: "项目地址",
				dataIndex: "url",
				key: "url",
				width: 200,
			},
			{
				title: "操作",
				dataIndex: "operations",
				key: "operations",
				width: "200px",
				render: (_, record, __) => {
					return (
						<div style={{ width: "100%", height: "100%" }}>
							<Button
								type="text"
								onClick={() => {
									handleEditCodeRecord(record);
								}}
							>
								编辑
							</Button>
							<Button
								type="text"
								onClick={() => {
									handleAnalysisCodeRecord(record);
								}}
							>
								分析
							</Button>
							<Button
								type="text"
								onClick={() => {
									handleDeleteCodeRecord(record);
								}}
							>
								删除
							</Button>
						</div>
					);
				},
			},
		];
	}, [handleEditCodeRecord, handleAnalysisCodeRecord, handleDeleteCodeRecord]);
	return (
		<Table rowKey={"id"} columns={columns} dataSource={dataSource} pagination={false} sticky={{ offsetScroll: 0 }} />
	);
}
