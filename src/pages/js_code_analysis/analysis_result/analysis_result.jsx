import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import SplitPane from "react-split-pane";

import AnalysisResultSetting from "./analysis_result_setting/analysis_result_setting.jsx";
import CodeEditor from "./code_editor/code_editor.jsx";
import CodeFilesTree from "./code_files_tree/code_files_tree.jsx";
import CodeStructTree from "./code_struct_tree/code_struct_tree.jsx";
import AnalysisMessage from "./analysis_message/analysis_message.jsx";

import { getQuery, downloadJSON } from "../../../utils/utils.js";
import { serviceGetServiceAnalysisResult } from "../../../service/service_analysis_result.js";

import styles from "./analysis_result.module.scss";

export default function AnalysisResult() {
	const analysisResultSettingRef = useRef(null);
	const codeFilesTreeRef = useRef(null);
	const codeStructTreeRef = useRef(null);
	const codeEditorRef = useRef(null);
	const analysisMessageRef = useRef(null);

	const [codeFilesMap, setCodeFilesMap] = useState(null);
	const [codeStructMap, setCodeStructMap] = useState({});
	const [currentCodeFile, setCurrentCodeFile] = useState(null);

	/** 开始设置 */
	const startSetting = useCallback(() => {
		analysisResultSettingRef.current.setModalVisible(true);
	}, []);
	/** 下载分析结果 */
	const downloadAnalysisResult = useCallback(() => {
		downloadJSON(
			JSON.stringify({
				codeFilesMap,
				// CodeFilesTree
				treeData: codeFilesTreeRef.current.treeData,
				expandedKeys: codeFilesTreeRef.current.expandedKeys,
				selectedKeys: codeFilesTreeRef.current.selectedKeys,

				codeStructMap,
			}),
			`${getQuery("analysis_name")}.json`
		);
	}, [codeFilesMap, codeStructMap]);

	/** 确认设置, 更新 codeFilesMap, filesTree */
	const handleAfterAnalysisResultSettingOk = useCallback((rootFolder) => {
		setCodeFilesMap(rootFolder.codeFilesMap);
		codeFilesTreeRef.current.setData([rootFolder.toJSON()]);
	}, []);

	/** 被选择的文件树节点改变时 */
	const handleOnCodeFilesTreeSelectedKeysChange = useCallback(
		(selectedKeys) => {
			if (codeFilesMap !== null && selectedKeys.length > 0) {
				setCurrentCodeFile(codeFilesMap[selectedKeys[0]]);
			}
		},
		[codeFilesMap]
	);

	useEffect(() => {
		const analysisUrl = getQuery("analysis_url");
		if (analysisUrl) {
			serviceGetServiceAnalysisResult(analysisUrl).then((res) => {
				codeFilesTreeRef.current.setData(res.data.treeData, res.data.expandedKeys, res.data.selectedKeys);

				setCodeFilesMap(res.data.codeFilesMap ?? {});
				setCodeStructMap(res.data.codeStructMap ?? {});
			});
		}
	}, []);

	return (
		<div className={styles.analysis_result}>
			<div className={styles.analysis_result_header}>
				<div className={styles.analysis_result_header_left}>
					<div className={styles.analysis_result_title}>{currentCodeFile?.key}</div>
				</div>
				<div className={styles.analysis_result_header_right}>
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={startSetting}>
						设置
					</Button>
					<AnalysisResultSetting ref={analysisResultSettingRef} afterOK={handleAfterAnalysisResultSettingOk} />
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={downloadAnalysisResult}>
						下载分析结果
					</Button>
				</div>
			</div>
			<div className={styles.analysis_result_body}>
				<SplitPane split="vertical" minSize={"500px"} primary="second">
					<SplitPane split="vertical" minSize={"300px"}>
						<SplitPane split="horizontal" minSize={"50%"}>
							<CodeFilesTree ref={codeFilesTreeRef} onSelectedKeysChange={handleOnCodeFilesTreeSelectedKeysChange} />
							<CodeStructTree ref={codeStructTreeRef} codeFile={currentCodeFile} codeStructMap={codeStructMap} />
						</SplitPane>
						<CodeEditor ref={codeEditorRef} codeFile={currentCodeFile} />
					</SplitPane>
					<AnalysisMessage ref={analysisMessageRef} codeStructMap={codeStructMap} codeFile={currentCodeFile} />
				</SplitPane>
			</div>
		</div>
	);
}
