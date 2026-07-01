import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Button, Table, Pagination, Popconfirm, Tooltip, message, Tag } from "antd";
import { usePagination } from "../../hooks/use_pagination.js";
import { RequirementForm } from "./requirement_form.jsx";
import {
	serviceGetAllRequirements,
	serviceAddRequirement,
	serviceUpdateRequirement,
	serviceDeleteRequirement,
} from "../../services/project_manager/project_requirement_service.js";
import { serviceGetAllProjects } from "../../services/project_manager/project_service.js";
import { RequirementStatusColorMap } from "../../services/project_manager/project_manager_constants.js";
import { CTooltipProps } from "../../components/c_tooltip_props.js";
import { formatDate } from "../../utils/date_format/date_format.js";
import styles from "./project_manager.module.scss";

const StatusPriority = Object.freeze({
	正在开发: 1,
	正在联调: 2,
	正在测试: 3,
	待开发: 4,
	已上线: 5,
});

function compareByStatusPriority(a, b) {
	const pA = StatusPriority[a.status] || 99;
	const pB = StatusPriority[b.status] || 99;
	return pA - pB;
}

function renderUrl(text, label) {
	return text ? (
		<a href={text} target="_blank" rel="noopener noreferrer">
			{label}
		</a>
	) : (
		"-"
	);
}

export function RequirementList() {
	const requirementFormRef = useRef(null);
	const [requirementList, setRequirementList] = useState([]);
	const [allProjects, setAllProjects] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 10);

	const fetchData = useCallback(async () => {
		try {
			const allReqs = await serviceGetAllRequirements();
			allReqs.sort(compareByStatusPriority);
			const start = (page - 1) * pageSize;
			const end = start + pageSize;
			const paged = [];
			for (let i = start; i < end && i < allReqs.length; i++) {
				paged.push(allReqs[i]);
			}
			setRequirementList(paged);
			setTotal(allReqs.length);
		} catch (e) {
			message.error("加载需求失败");
		}
	}, [page, pageSize, setTotal]);

	const fetchProjects = useCallback(async () => {
		try {
			const projects = await serviceGetAllProjects();
			setAllProjects(projects);
		} catch (e) {
			message.error("加载项目失败");
		}
	}, []);

	const handlePaginationChange = useCallback(
		(page, pageSize) => {
			setPage(page);
			setPageSize(pageSize);
		},
		[setPage, setPageSize],
	);

	const startAddRequirement = useCallback(() => {
		requirementFormRef.current.startAddRequirement();
	}, []);

	const handleAddOk = useCallback(
		async (data) => {
			try {
				await serviceAddRequirement(data);
				message.success("需求添加成功");
				fetchData();
				fetchProjects();
			} catch (e) {
				message.error("新增失败");
			}
		},
		[fetchData, fetchProjects],
	);

	const handleEditOk = useCallback(
		async (id, data) => {
			try {
				await serviceUpdateRequirement(id, data);
				message.success("需求更新成功");
				fetchData();
				fetchProjects();
			} catch (e) {
				message.error("更新失败");
			}
		},
		[fetchData, fetchProjects],
	);

	const handleDelete = useCallback(
		async (id) => {
			try {
				await serviceDeleteRequirement(id);
				message.success("需求删除成功");
				fetchData();
				fetchProjects();
			} catch (e) {
				message.error("删除失败");
			}
		},
		[fetchData, fetchProjects],
	);

	const handleEdit = useCallback((record) => {
		requirementFormRef.current.startEditRequirement(record);
	}, []);

	const handleView = useCallback((record) => {
		requirementFormRef.current.startViewRequirement(record);
	}, []);

	const columns = useMemo(() => {
		const projectMap = {};
		for (let i = 0; i < allProjects.length; i++) {
			projectMap[allProjects[i].id] = allProjects[i];
		}

		return [
			{ title: "ID", dataIndex: "id", key: "id", width: 80, hidden: true },
			{
				title: "需求名称",
				dataIndex: "name",
				key: "name",
				width: 150,
				fixed: "left",
				render: (text) => (
					<Tooltip title={text} {...CTooltipProps}>
						<div className={styles.cellFlexContainer}>
							<div className={styles.cellFlexText}>{text}</div>
						</div>
					</Tooltip>
				),
			},
			{
				title: "关联项目",
				dataIndex: "projectItems",
				key: "projectItems",
				width: 300,
				render: (items) => {
					if (!items || items.length === 0) return "未关联";
					const tags = [];
					for (let i = 0; i < items.length; i++) {
						const item = items[i];
						const proj = projectMap[item.projectId];
						const projectName = proj ? proj.name : "未知项目";
						const o2Url = proj ? proj.o2Url : "";
						const crUrl = item.crUrl || "";
						tags.push(
							<Tag key={item.projectId + "_" + i}>
								{projectName}
								{o2Url && (
									<a href={o2Url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 4 }}>
										【o2 地址】
									</a>
								)}
								{crUrl && (
									<a href={crUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 4 }}>
										【cr 地址】
									</a>
								)}
							</Tag>,
						);
					}
					return (
						<Tooltip title={<div className={styles.tagList}>{tags}</div>} {...CTooltipProps}>
							<div className={styles.cellFlexContainer}>
								<div className={styles.cellFlexText}>{tags}</div>
							</div>
						</Tooltip>
					);
				},
			},
			{
				title: "Aone 地址",
				dataIndex: "aoneUrl",
				key: "aoneUrl",
				width: 150,
				render: (text) => renderUrl(text, "Aone 地址"),
			},
			{
				title: "PRD 地址",
				dataIndex: "prdUrl",
				key: "prdUrl",
				width: 150,
				render: (text) => renderUrl(text, "PRD 地址"),
			},
			{
				title: "设计稿地址",
				dataIndex: "designUrl",
				key: "designUrl",
				width: 150,
				render: (text) => renderUrl(text, "设计稿地址"),
			},
			{
				title: "效果测试地址",
				dataIndex: "testUrl",
				key: "testUrl",
				width: 150,
				render: (text) => renderUrl(text, "效果测试地址"),
			},
			{
				title: "迭代地址",
				dataIndex: "iterationUrl",
				key: "iterationUrl",
				width: 150,
				render: (text) => renderUrl(text, "迭代地址"),
			},
			{
				title: "状态",
				dataIndex: "status",
				key: "status",
				width: 100,
				render: (status) => <span style={{ color: RequirementStatusColorMap[status] || "black" }}>{status}</span>,
			},
			{ title: "开发时间", dataIndex: "devTime", key: "devTime", width: 120, render: (ts) => formatDate(ts) },
			{ title: "提测时间", dataIndex: "testTime", key: "testTime", width: 120, render: (ts) => formatDate(ts) },
			{ title: "上线时间", dataIndex: "onlineTime", key: "onlineTime", width: 120, render: (ts) => formatDate(ts) },
			{
				title: "操作",
				key: "operation",
				width: 240,
				fixed: "end",
				render: (_, record) => (
					<div className={styles.operationCell}>
						<Button type="text" onClick={() => handleView(record)}>
							查看
						</Button>
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
				),
			},
		];
	}, [allProjects, handleView, handleEdit, handleDelete]);

	useEffect(() => {
		fetchData();
		fetchProjects();
	}, [fetchData, fetchProjects]);

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
