import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Pagination } from "antd";

import AnalysisTable from "./analysis_table.jsx";
import AnalysisForm from "./analysis_form.jsx";
import usePagination from "../../../hooks/use_pagination.js";
import { downloadJSON } from "../../../utils/utils.js";
import { toAnalysisContentPage } from "../../../router/router.js";
import {
	servicAddAnalysisListRecord,
	serviceDeleteAnalysisListRecord,
	serviceGetAnalysisList,
	serviceGetAnalysisListPage,
	serviceUpdateAnalysisListRecord,
} from "../../../service/service_analysis_list.js";

import styles from "./analysis_list.module.scss";

export default function AnalysisList() {
	const analysisFormRef = useRef(null);

	const [analysisList, setAnalysisList] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 20);
	/** 更新分页信息 */
	const handleOnPaginationChange = useCallback(
		(page, pageSize) => {
			setPage(page);
			setPageSize(pageSize);
		},
		[setPage, setPageSize]
	);
	/** 获取分析结果列表数据 */
	const getAnalysisListPage = useCallback(() => {
		serviceGetAnalysisListPage(page, pageSize).then((res) => {
			setAnalysisList(res.data);
			setTotal(res.total);
		});
	}, [page, pageSize, setTotal]);
	/** 下载分析结果列表 json 数据 */
	const downloadAnalysisListJson = useCallback(() => {
		serviceGetAnalysisList().then((res) => {
			downloadJSON(JSON.stringify(res.data), "js_code_analysis_list.json");
		});
	}, []);
	/** 点击添加分析结果记录 */
	const startAddAnalysisCode = useCallback(() => {
		analysisFormRef.current.startAddAnalysis();
	}, []);
	/** 完成添加分析结果记录 */
	const handleOnAnalysisFormAddOk = useCallback(
		(data) => {
			return servicAddAnalysisListRecord(data).then(getAnalysisListPage);
		},
		[getAnalysisListPage]
	);
	/** 完成编辑分析结果记录 */
	const handleOnAnalysisFormEditOk = useCallback(
		(record, data) => {
			return serviceUpdateAnalysisListRecord(record.id, data).then(getAnalysisListPage);
		},
		[getAnalysisListPage]
	);
	/** 点击编辑分析结果记录 */
	const handleEditAnalysisRecord = useCallback((record) => {
		analysisFormRef.current.startEditAnalysis(record);
	}, []);
	/** 跳转到分析页面 */
	const handleAnalyseCodeRecord = useCallback((record) => {
		toAnalysisContentPage(record.name, record.url);
	}, []);
	/** 点删除辑分析结果记录 */
	const handleDeleteAnalysisRecord = useCallback(
		(record) => {
			serviceDeleteAnalysisListRecord(record.id).then(getAnalysisListPage);
		},
		[getAnalysisListPage]
	);

	useEffect(() => {
		getAnalysisListPage();
	}, [getAnalysisListPage]);

	return (
		<div className={styles.analysis_list}>
			<div className={styles.analysis_list_header}>
				<Button onClick={startAddAnalysisCode} style={{ marginRight: "10px" }}>
					新增分析代码
				</Button>
				<Button onClick={downloadAnalysisListJson}>下载分析列表</Button>
			</div>
			<div className={styles.analysis_list_body}>
				<AnalysisTable
					editAnalysisRecord={handleEditAnalysisRecord}
					analyseCodeRecord={handleAnalyseCodeRecord}
					deleteAnalysisRecord={handleDeleteAnalysisRecord}
					dataSource={analysisList}
				/>
			</div>
			<div className={styles.analysis_list_footer}>
				<Pagination align="end" current={page} pageSize={pageSize} total={total} onChange={handleOnPaginationChange} />
			</div>
			<AnalysisForm ref={analysisFormRef} onEditOk={handleOnAnalysisFormEditOk} onAddOk={handleOnAnalysisFormAddOk} />
		</div>
	);
}
