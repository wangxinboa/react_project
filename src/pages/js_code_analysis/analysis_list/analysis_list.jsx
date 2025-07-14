import { useCallback, useEffect, useState } from "react";
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
	const [analysisFormVisible, setAnalysisFormVisible] = useState(false);
	const [editingAnalysisCode, setEditingAnalysisCode] = useState(null);

	const [analysisList, setAnalysisList] = useState([]);
	const { page, setPage, pageSize, setPageSize, total, setTotal } = usePagination(1, 20);

	const handleOnPaginationChange = useCallback(
		(page, pageSize) => {
			setPage(page);
			setPageSize(pageSize);
		},
		[setPage, setPageSize]
	);

	const getAnalysisListPage = useCallback(() => {
		serviceGetAnalysisListPage(page, pageSize).then((res) => {
			setAnalysisList(res.data);
			setTotal(res.total);
		});
	}, [page, pageSize, setTotal]);

	const downloadAnalysisList = useCallback(() => {
		serviceGetAnalysisList().then((res) => {
			downloadJSON(JSON.stringify(res.data), "js_code_analysis_list.json");
		});
	}, []);
	const startAddAnalysisCode = useCallback(() => {
		setAnalysisFormVisible(true);
	}, []);

	const handleOnAnalysisFormOk = useCallback(
		(data) => {
			if (editingAnalysisCode) {
				serviceUpdateAnalysisListRecord(editingAnalysisCode.id, data).then(getAnalysisListPage);
			} else {
				servicAddAnalysisListRecord(data).then(getAnalysisListPage);
			}
		},
		[editingAnalysisCode, getAnalysisListPage]
	);

	const handleEditAnalysisRecord = useCallback((record) => {
		setAnalysisFormVisible(true);
		setEditingAnalysisCode(record);
	}, []);
	const handleAnalyseCodeRecord = useCallback((record) => {
		toAnalysisContentPage(record.name, record.url);
	}, []);
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
				<Button onClick={downloadAnalysisList}>下载分析列表</Button>
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
			<AnalysisForm
				data={editingAnalysisCode}
				visible={analysisFormVisible}
				setVisible={setAnalysisFormVisible}
				onOk={handleOnAnalysisFormOk}
			/>
		</div>
	);
}
