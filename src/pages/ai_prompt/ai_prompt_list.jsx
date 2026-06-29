import React, { useState, useCallback, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { serviceFetchAllPrompts, serviceDeletePrompt } from "../../services/service_ai_prompt.js";
import { toAIPromptEditor } from "../../router/router.js";
import styles from "./ai_prompt_list.module.scss";

/**
 * AI 提示词列表页
 * @component
 */
export const AIPromptList = React.memo(function AIPromptList() {
	const [dataSource, setDataSource] = useState([]);

	const loadData = useCallback(async () => {
		try {
			const list = await serviceFetchAllPrompts();
			setDataSource(list);
		} catch (e) {
			message.error("加载列表失败");
		}
	}, []);

	const handleDelete = useCallback(
		async (id) => {
			try {
				await serviceDeletePrompt(id);
				message.success("删除成功");
				loadData();
			} catch (e) {
				message.error("删除失败");
			}
		},
		[loadData],
	);

	const columns = [
		{ title: "名称", dataIndex: "name", key: "name" },
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<div className={styles.operationCell}>
					<Button type="link" onClick={() => toAIPromptEditor(record.id)}>
						编辑
					</Button>
					<Popconfirm title="确定删除吗？" onConfirm={() => handleDelete(record.id)}>
						<Button type="link" danger>
							删除
						</Button>
					</Popconfirm>
				</div>
			),
		},
	];

	useEffect(() => {
		loadData();
	}, [loadData]);

	return (
		<div className={styles.aiPromptList}>
			<div className={styles.header}>
				<Button type="primary" onClick={() => toAIPromptEditor()}>
					新建提示词
				</Button>
			</div>
			<Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} />
		</div>
	);
});
