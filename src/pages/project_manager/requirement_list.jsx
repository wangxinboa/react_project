import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Button, Table, Pagination, Popconfirm, Tooltip, message } from "antd";
import { usePagination } from "../../hooks/use_pagination.js";
import { RequirementForm } from "./requirement_form.jsx";
import {
	serviceGetRequirementListPage,
	serviceAddRequirement,
	serviceUpdateRequirement,
	serviceDeleteRequirement,
} from "../../service/project_manager/project_requirement_service.js";
import { serviceGetAllProjects } from "../../service/project_manager/project_service.js";
import { RequirementStatusColorMap } from "../../service/project_manager/project_manager_constants.js";
import { CTooltipProps } from "../../components/c_tooltip_props.js";
import { formatDate } from "../../utils/date_format/date_format.js";
import styles from "./project_manager.module.scss";

/**
 * 渲染 URL 列
 * @param {string} text - URL 值
 * @param {string} label - 列名
 * @returns {JSX.Element}
 */
function renderUrl(text, label) {
	return text ? (
		<a href={text} target="_blank" rel="noopener noreferrer">
			{label}
		</a>
	) : (
		"-"
	);
}

/**
 * 需求管理 - 独立页面
 * @returns {JSX.Element}
 */
export function RequirementList() {
	const requirementFormRef = useRef(null);
	const [requirementList, setRequirementList] = useState([]);
	const [allProjects, setAllProjects] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 10);

	const fetchRequirementList = useCallback(() => {
		serviceGetRequirementListPage(page, pageSize).then((res) => {
			setRequirementList(res.data);
			setTotal(res.total);
		});
	}, [page, pageSize, setTotal]);

	const fetchAllProjects = useCallback(() => {
		serviceGetAllProjects().then((projects) => {
			setAllProjects(projects);
		});
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
		(data) => {
			serviceAddRequirement(data).then(() => {
				message.success("需求添加成功");
				fetchRequirementList();
				fetchAllProjects();
			});
		},
		[fetchRequirementList, fetchAllProjects],
	);

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

	const handleEdit = useCallback((record) => {
		requirementFormRef.current.startEditRequirement(record);
	}, []);

	const handleView = useCallback((record) => {
		requirementFormRef.current.startViewRequirement(record);
	}, []);

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
				hidden: true,
			},
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
					const fullText = names.join(", ");
					return (
						<Tooltip title={fullText} {...CTooltipProps}>
							<div className={styles.cellFlexContainer}>
								<div className={styles.cellFlexText}>{fullText}</div>
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
				title: "代码 CR 地址",
				dataIndex: "crUrl",
				key: "crUrl",
				width: 150,
				render: (text) => renderUrl(text, "代码 CR 地址"),
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
				render: (status) => {
					return <span style={{ color: RequirementStatusColorMap[status] || "black" }}>{status}</span>;
				},
			},
			{
				title: "开发时间",
				dataIndex: "devTime",
				key: "devTime",
				width: 120,
				render: (ts) => formatDate(ts),
			},
			{
				title: "提测时间",
				dataIndex: "testTime",
				key: "testTime",
				width: 120,
				render: (ts) => formatDate(ts),
			},
			{
				title: "上线时间",
				dataIndex: "onlineTime",
				key: "onlineTime",
				width: 120,
				render: (ts) => formatDate(ts),
			},
			{
				title: "操作",
				key: "operation",
				dataIndex: "operation",
				width: 240,
				fixed: "end",
				render: (_, record) => {
					return (
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
					);
				},
			},
		];
	}, [allProjects, handleView, handleEdit, handleDelete]);

	useEffect(() => {
		fetchRequirementList();
		fetchAllProjects();
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
