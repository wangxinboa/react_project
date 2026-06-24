import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Button, Table, Pagination, Popconfirm, message } from "antd";
import { usePagination } from "../../hooks/use_pagination.js";
import { ProjectForm } from "./project_form.jsx";
import {
	serviceGetProjectListPage,
	serviceAddProject,
	serviceUpdateProject,
	serviceDeleteProject,
	serviceGetAllProjects,
	serviceImportProjects,
} from "../../service/service_project_manager.js";
import { downloadJSON } from "../../utils/download/download.js";
import { CFileUpload } from "../../components/file_upload_button/file_upload_button.jsx";
import styles from "./project_manager.module.scss";

/**
 * 项目管理 - 独立页面
 * @component
 * @returns {JSX.Element}
 */
export function ProjectList() {
	const projectFormRef = useRef(null);
	const [projectList, setProjectList] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 10);

	// ---------- 项目 CRUD ----------
	/** 获取项目列表（分页） */
	const fetchProjectList = useCallback(() => {
		serviceGetProjectListPage(page, pageSize).then((res) => {
			setProjectList(res.data);
			setTotal(res.total);
		});
	}, [page, pageSize, setTotal]);

	/** 分页变化回调 */
	const handlePaginationChange = useCallback(
		(page, pageSize) => {
			setPage(page);
			setPageSize(pageSize);
		},
		[setPage, setPageSize],
	);

	/** 打开新增项目对话框 */
	const startAddProject = useCallback(() => {
		projectFormRef.current.startAddProject();
	}, []);

	/** 新增项目成功回调 */
	const handleAddOk = useCallback(
		(data) => {
			serviceAddProject(data).then(() => {
				message.success("项目添加成功");
				fetchProjectList();
			});
		},
		[fetchProjectList],
	);

	/** 编辑项目成功回调 */
	const handleEditOk = useCallback(
		(id, data) => {
			serviceUpdateProject(id, data).then(() => {
				message.success("项目更新成功");
				fetchProjectList();
			});
		},
		[fetchProjectList],
	);

	/** 删除项目 */
	const handleDelete = useCallback(
		(id) => {
			serviceDeleteProject(id).then(() => {
				message.success("项目删除成功");
				fetchProjectList();
			});
		},
		[fetchProjectList],
	);

	/** 打开编辑项目对话框 */
	const handleEdit = useCallback((record) => {
		projectFormRef.current.startEditProject(record);
	}, []);

	/** 打开查看项目对话框 */
	const handleView = useCallback((record) => {
		projectFormRef.current.startViewProject(record);
	}, []);

	// ---------- 导入/导出 ----------
	/**
	 * 导出项目列表为 JSON 文件
	 */
	const handleExportProjects = useCallback(() => {
		serviceGetAllProjects().then((projects) => {
			const jsonStr = JSON.stringify(projects, null, 2);
			downloadJSON(jsonStr, "projects_backup.json");
			message.success("导出成功");
		});
	}, []);

	/**
	 * 处理导入文件选择
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const handleImportFileChange = useCallback(
		(e) => {
			const file = e.target.files && e.target.files[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onload = (event) => {
				try {
					const projects = JSON.parse(event.target.result);
					if (!Array.isArray(projects)) {
						message.error("文件格式不正确，需要 JSON 数组");
						return;
					}
					serviceImportProjects(projects).then(() => {
						message.success("导入成功");
						fetchProjectList();
					});
				} catch (err) {
					message.error("文件解析失败，请确认是有效的 JSON");
				}
			};
			reader.readAsText(file);
			// 重置 input 值，允许再次选择同一文件
			e.target.value = "";
		},
		[fetchProjectList],
	);

	// ---------- 表格列定义 ----------
	const columns = useMemo(() => {
		return [
			{
				title: "ID",
				dataIndex: "id",
				key: "id",
				width: 80,
			},
			{
				title: "项目名称",
				dataIndex: "name",
				key: "name",
				width: 150,
			},
			{
				title: "仓库地址",
				dataIndex: "gitUrl",
				key: "gitUrl",
				width: 150,
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
				width: 150,
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
				title: "关联需求数",
				dataIndex: "requirementIds",
				key: "requirementIds",
				width: 120,
				render: (ids) => (ids ? ids.length : 0),
			},
			{
				title: "操作",
				key: "operation",
				width: 240,
				fixed: "end",
				render: (_, record) => {
					return (
						<div style={{ width: "100%", height: "100%" }}>
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
					);
				},
			},
		];
	}, [handleView, handleEdit, handleDelete]);

	// ---------- 初始化数据 ----------
	useEffect(() => {
		fetchProjectList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
