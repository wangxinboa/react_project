import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Button, Table, Pagination, Popconfirm, Tooltip, Tag, message } from "antd";
import { usePagination } from "../../hooks/use_pagination.js";
import { ProjectForm } from "./project_form.jsx";
import {
	serviceGetAllProjects,
	serviceAddProject,
	serviceUpdateProject,
	serviceDeleteProject,
	serviceImportProjectManager,
} from "../../services/project_manager/project_service.js";
import { serviceGetAllRequirements } from "../../services/project_manager/project_requirement_service.js";
import {
	RequirementStatusEnum,
	RequirementStatusColorMap,
} from "../../services/project_manager/project_manager_constants.js";
import { downloadJSON } from "../../utils/download/download.js";
import { CFileUpload } from "../../components/c_file_upload/c_file_upload.jsx";
import { CTooltipProps } from "../../components/c_tooltip_props.js";
import styles from "./project_manager.module.scss";

function compareByRequirementCount(a, b) {
	const lenA = (a.requirementIds && a.requirementIds.length) || 0;
	const lenB = (b.requirementIds && b.requirementIds.length) || 0;
	return lenB - lenA;
}

/**
 * 项目管理 - 独立页面
 * @component
 * @returns {JSX.Element}
 */
export function ProjectList() {
	const projectFormRef = useRef(null);
	const [projectList, setProjectList] = useState([]);
	const [requirements, setRequirements] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 10);

	const fetchData = useCallback(async () => {
		try {
			const allProjects = await serviceGetAllProjects();
			allProjects.sort(compareByRequirementCount);
			const start = (page - 1) * pageSize;
			const end = start + pageSize;
			const paged = [];
			for (let i = start; i < end && i < allProjects.length; i++) {
				paged.push(allProjects[i]);
			}
			setProjectList(paged);
			setTotal(allProjects.length);
		} catch (e) {
			message.error("加载项目失败");
		}
	}, [page, pageSize, setTotal]);

	const fetchRequirements = useCallback(async () => {
		try {
			const allReqs = await serviceGetAllRequirements();
			setRequirements(allReqs);
		} catch (e) {
			message.error("加载需求失败");
		}
	}, []);

	const handlePaginationChange = useCallback(
		(page, pageSize) => {
			setPage(page);
			setPageSize(pageSize);
		},
		[setPage, setPageSize],
	);

	const startAddProject = useCallback(() => {
		projectFormRef.current.startAddProject();
	}, []);

	const handleAddOk = useCallback(
		async (data) => {
			try {
				await serviceAddProject(data);
				message.success("项目添加成功");
				fetchData();
				fetchRequirements();
			} catch (e) {
				message.error("新增失败");
			}
		},
		[fetchData, fetchRequirements],
	);

	const handleEditOk = useCallback(
		async (id, data) => {
			try {
				await serviceUpdateProject(id, data);
				message.success("项目更新成功");
				fetchData();
			} catch (e) {
				message.error("更新失败");
			}
		},
		[fetchData],
	);

	const handleDelete = useCallback(
		async (id) => {
			try {
				await serviceDeleteProject(id);
				message.success("项目删除成功");
				fetchData();
				fetchRequirements();
			} catch (e) {
				message.error("删除失败");
			}
		},
		[fetchData, fetchRequirements],
	);

	const handleEdit = useCallback((record) => {
		projectFormRef.current.startEditProject(record);
	}, []);

	const handleView = useCallback((record) => {
		projectFormRef.current.startViewProject(record);
	}, []);

	const handleExportProjects = useCallback(async () => {
		try {
			const projects = await serviceGetAllProjects();
			const reqList = await serviceGetAllRequirements();
			const exportData = {
				projects,
				requirements: reqList,
			};
			downloadJSON(JSON.stringify(exportData, null, 2), "project_backup.json");
			message.success("导出成功");
		} catch (e) {
			message.error("导出失败");
		}
	}, []);

	const handleImportFileChange = useCallback(
		(e) => {
			const file = e.target.files && e.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = async (event) => {
				try {
					const data = JSON.parse(event.target.result);
					if (typeof data !== "object" || data === null) {
						message.error("文件格式不正确");
						return;
					}
					const projects = Array.isArray(data.projects) ? data.projects : [];
					const requirements = Array.isArray(data.requirements) ? data.requirements : [];
					await serviceImportProjectManager({ projects, requirements });
					message.success("导入成功");
					fetchData();
					fetchRequirements();
				} catch (err) {
					message.error("导入失败");
				}
			};
			reader.readAsText(file);
			e.target.value = "";
		},
		[fetchData, fetchRequirements],
	);

	// 表格列定义
	const columns = useMemo(() => {
		const reqMap = {};
		for (let i = 0; i < requirements.length; i++) {
			reqMap[requirements[i].id] = requirements[i];
		}

		return [
			{ title: "ID", dataIndex: "id", key: "id", width: 80, hidden: true },
			{
				title: "项目名称",
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
				title: "仓库地址",
				dataIndex: "gitUrl",
				key: "gitUrl",
				width: 100,
				render: (text) =>
					text ? (
						<a href={text} target="_blank" rel="noopener noreferrer">
							仓库地址
						</a>
					) : (
						"-"
					),
			},
			{
				title: "O2 地址",
				dataIndex: "o2Url",
				key: "o2Url",
				width: 100,
				render: (text) =>
					text ? (
						<a href={text} target="_blank" rel="noopener noreferrer">
							O2 地址
						</a>
					) : (
						"-"
					),
			},
			{
				title: "关联未上线需求",
				dataIndex: "requirementIds",
				key: "requirementIds",
				width: 250,
				render: (ids) => {
					if (!ids || ids.length === 0) return <span>无</span>;
					const tags = [];
					for (let j = 0; j < ids.length; j++) {
						const req = reqMap[ids[j]];
						if (req && req.status !== RequirementStatusEnum.online) {
							const color = RequirementStatusColorMap[req.status] || "default";
							tags.push(
								<Tag key={req.id} color={color}>
									{req.name}
								</Tag>,
							);
						}
					}
					if (tags.length === 0) return <span>无</span>;
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
							title="确定删除该项目吗？"
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
	}, [requirements, handleView, handleEdit, handleDelete]);

	useEffect(() => {
		fetchData();
		fetchRequirements();
	}, [fetchData, fetchRequirements]);

	return (
		<div className={styles.projectList}>
			<div className={styles.header}>
				<Button onClick={startAddProject}>新增项目</Button>
				<Button onClick={handleExportProjects}>导出项目</Button>
				<Button>
					导入项目
					<CFileUpload onInput={handleImportFileChange} accept=".json" />
				</Button>
			</div>
			<div className={styles.tableWrapper}>
				<Table
					rowKey="id"
					columns={columns}
					dataSource={projectList}
					pagination={false}
					scroll={{ x: "max-content" }}
				/>
			</div>
			<div className={styles.footer}>
				<Pagination align="end" current={page} pageSize={pageSize} total={total} onChange={handlePaginationChange} />
			</div>
			<ProjectForm ref={projectFormRef} onAddOk={handleAddOk} onEditOk={handleEditOk} />
		</div>
	);
}
