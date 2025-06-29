import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import SplitPane from "react-split-pane";

import AnalysisResultSetting from "./analysis_result_setting/analysis_result_setting.jsx";
import CodeEditor from "./code_editor/code_editor.jsx";
import CodeFilesTree from "./code_files_tree/code_files_tree.jsx";
import AnalysisMessage from "./analysis_message/analysis_message.jsx";

import { getQuery, downloadJSON } from "../../../utils/utils.js";
import { serviceGetServiceAnalysisResult } from "../../../service/service_analysis_result.js";

import styles from "./analysis_result.module.scss";

export default function AnalysisResult() {
	const analysisResultSettingRef = useRef(null);
	const codeFilesRef = useRef(null);
	const codeEditorRef = useRef(null);
	const analysisMessageRef = useRef(null);

	const [codeFilesMap, setCodeFilesMap] = useState(null);
	const [analysisResultTitle, setAnalysisResultTitle] = useState("");

	/** 开始设置 */
	const startSetting = useCallback(() => {
		analysisResultSettingRef.current.setModalVisible(true);
	}, []);
	/** 下载分析结果 */
	const downloadAnalysisResult = useCallback(() => {
		downloadJSON(
			JSON.stringify({
				codeFilesMap,

				treeData: codeFilesRef.current.treeData,
				expandedKeys: codeFilesRef.current.expandedKeys,
				selectedKeys: codeFilesRef.current.selectedKeys,
			}),
			`${getQuery("analysis_name")}.json`
		);
	}, [codeFilesMap]);

	/** 确认设置, 更新 codeFilesMap, filesTree */
	const handleAfterAnalysisResultSettingOk = useCallback((rootFolder) => {
		setCodeFilesMap(rootFolder.codeFilesMap);
		codeFilesRef.current.setMessage([rootFolder.toJSON()]);
	}, []);

	/** 被选择的文件树节点改变时 */
	const handleOnCodeFilesTreeSelectedKeysChange = useCallback(
		(selectedKeys) => {
			if (codeFilesMap !== null && selectedKeys.length > 0) {
				codeEditorRef.current.setCurrentCodeFile(codeFilesMap[selectedKeys[0]]);
				analysisMessageRef.current.setCurrentCodeFile(codeFilesMap[selectedKeys[0]]);
				setAnalysisResultTitle(selectedKeys[0]);
			}
		},
		[codeFilesMap]
	);

	useEffect(() => {
		const analysisName = getQuery("analysis_name");
		if (analysisName) {
			serviceGetServiceAnalysisResult(analysisName).then((res) => {
				codeFilesRef.current.setMessage(res.data.treeData, res.data.expandedKeys, res.data.selectedKeys);
				setCodeFilesMap(res.data.codeFilesMap);
			});
		}
	}, []);

	return (
		<div className={styles.analysis_result}>
			<div className={styles.analysis_result_header}>
				<div className={styles.analysis_result_header_left}>
					<div className={styles.analysis_result_title}>{analysisResultTitle}</div>
				</div>
				<div className={styles.analysis_result_header_right}>
					<Button onClick={startSetting}>设置</Button>
					<AnalysisResultSetting ref={analysisResultSettingRef} afterOK={handleAfterAnalysisResultSettingOk} />
					<Button onClick={downloadAnalysisResult}>下载分析结果</Button>
				</div>
			</div>
			<div className={styles.analysis_result_body}>
				<SplitPane split="vertical" minSize={"500px"} primary="second">
					<SplitPane split="vertical" minSize={"300px"}>
						<CodeFilesTree ref={codeFilesRef} onSelectedKeysChange={handleOnCodeFilesTreeSelectedKeysChange} />
						<CodeEditor ref={codeEditorRef} />
					</SplitPane>
					<AnalysisMessage ref={analysisMessageRef} />
				</SplitPane>
			</div>
		</div>
	);
}
