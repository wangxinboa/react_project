import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Button, Table, Pagination, Popconfirm, message } from "antd";
import { usePagination } from "../../hooks/use_pagination.js";
import { RequirementForm } from "./requirement_form.jsx";
import {
	serviceGetProjectListPage,
	serviceGetRequirementListPage,
	serviceAddRequirement,
	serviceUpdateRequirement,
	serviceDeleteRequirement,
	RequirementStatusEnum,
} from "../../service/service_project_manager.js";

import styles from "./project_manager.module.scss";

/**
 * 需求管理 - 独立页面
 * @component
 * @returns {JSX.Element}
 */
export function RequirementList() {
	const requirementFormRef = useRef(null);
	const [requirementList, setRequirementList] = useState([]);
	const [allProjects, setAllProjects] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 10);

	// ---------- 需求 CRUD ----------
	/** 获取需求列表（分页） */
	const fetchRequirementList = useCallback(() => {
		serviceGetRequirementListPage(page, pageSize).then((res) => {
			setRequirementList(res.data);
			setTotal(res.total);
		});
	}, [page, pageSize, setTotal]);

	/** 获取所有项目（用于关联下拉） */
	const fetchAllProjects = useCallback(() => {
		serviceGetProjectListPage(1, 9999).then((res) => {
			setAllProjects(res.data);
		});
	}, []);

	/** 分页变化回调 */
	const handlePaginationChange = useCallback(
		(page, pageSize) => {
			setPage(page);
			setPageSize(pageSize);
		},
		[setPage, setPageSize],
	);

	/** 打开新增需求对话框 */
	const startAddRequirement = useCallback(() => {
		requirementFormRef.current.startAddRequirement();
	}, []);

	/** 新增需求成功回调 */
	const handleAddOk = useCallback(
		(data) => {
			serviceAddRequirement(data).then(() => {
				message.success("需求添加成功");
				fetchRequirementList();
				fetchAllProjects();
			});
		},
		[fetchRequirementList, fetchAllProjects],
	);

	/** 编辑需求成功回调 */
	const handleEditOk = useCallback(
		(id, data) => {
			serviceUpdateRequirement(id, data).then(() => {
				message.success("需求更新成功");
				fetchRequirementList();
				fetchAllProjects();
			});
		},
		[fetchRequirementList, fetchAllProjects],
	);

	/** 删除需求 */
	const handleDelete = useCallback(
		(id) => {
			serviceDeleteRequirement(id).then(() => {
				message.success("需求删除成功");
				fetchRequirementList();
				fetchAllProjects();
			});
		},
		[fetchRequirementList, fetchAllProjects],
	);

	/** 打开编辑需求对话框 */
	const handleEdit = useCallback((record) => {
		requirementFormRef.current.startEditRequirement(record);
	}, []);

	// ---------- 表格列定义 ----------
	const columns = useMemo(() => {
		const projectMap = {};
		for (let i = 0; i < allProjects.length; i++) {
			projectMap[allProjects[i].id] = allProjects[i].name;
		}
		return [
			{
				title: "ID",
				dataIndex: "id",
				key: "id",
				width: 80,
			},
			{
				title: "需求名称",
				dataIndex: "name",
				key: "name",
				width: 150,
			},
			{
				title: "关联项目",
				dataIndex: "projectIds",
				key: "projectIds",
				width: 200,
				render: (ids) => {
					if (!ids || ids.length === 0) return "未关联";
					const names = [];
					for (let i = 0; i < ids.length; i++) {
						const name = projectMap[ids[i]];
						if (name) names.push(name);
					}
					return names.join(", ");
				},
			},
			{
				title: "状态",
				dataIndex: "status",
				key: "status",
				width: 100,
				render: (status) => {
					const colorMap = {
						[RequirementStatusEnum.pending]: "default",
						[RequirementStatusEnum.developing]: "blue",
						[RequirementStatusEnum.debugging]: "orange",
						[RequirementStatusEnum.testing]: "purple",
						[RequirementStatusEnum.online]: "green",
					};
					return <span style={{ color: colorMap[status] || "black" }}>{status}</span>;
				},
			},
			{
				title: "开发时间",
				dataIndex: "devTime",
				key: "devTime",
				width: 120,
			},
			{
				title: "提测时间",
				dataIndex: "testTime",
				key: "testTime",
				width: 120,
			},
			{
				title: "上线时间",
				dataIndex: "onlineTime",
				key: "onlineTime",
				width: 120,
			},
			{
				title: "操作",
				key: "operation",
				dataIndex: "operation",
				width: 180,
				fixed: "end",
				render: (_, record) => {
					return (
						<div style={{ width: "100%", height: "100%" }}>
							<Button type="text" onClick={() => handleEdit(record)}>
								编辑
							</Button>
							<Popconfirm
								title="确定删除该需求吗？"
								onConfirm={() => handleDelete(record.id)}
								okText="确定"
								cancelText="取消"
							>
								<Button type="text" danger>
									删除
								</Button>
							</Popconfirm>
						</div>
					);
				},
			},
		];
	}, [allProjects, handleEdit, handleDelete]);

	// ---------- 初始化数据 ----------
	useEffect(() => {
		serviceGetProjectListPage(1, 1).then((res) => {
			if (res.total === 0) {
				fetchRequirementList();
				fetchAllProjects();
			} else {
				fetchRequirementList();
				fetchAllProjects();
			}
		});
		// eslint-disable-next-line
	}, []);

	return (
		<div className={styles.requirementList}>
			<div className={styles.header}>
				<Button onClick={startAddRequirement}>新增需求</Button>
			</div>
			<div className={styles.tableWrapper}>
				<Table
					rowKey="id"
					columns={columns}
					dataSource={requirementList}
					pagination={false}
					scroll={{ x: "max-content" }}
				/>
			</div>
			<div className={styles.footer}>
				<Pagination align="end" current={page} pageSize={pageSize} total={total} onChange={handlePaginationChange} />
			</div>
			<RequirementForm ref={requirementFormRef} onAddOk={handleAddOk} onEditOk={handleEditOk} projects={allProjects} />
		</div>
	);
}
