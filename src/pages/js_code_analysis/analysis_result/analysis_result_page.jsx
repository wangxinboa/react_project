import { useCallback, useRef, useContext } from "react";
import { Button } from "antd";
import SplitPane from "react-split-pane";

import { AnalysisResultContext } from "./analysis_result.jsx";

import UploadCodeFiles from "./components/upload_code_files/upload_code_files.jsx";

import CodeEditor from "./components/code_editor/code_editor.jsx";
import CodeFilesTree from "./components/code_files_tree/code_files_tree.jsx";
import CodeStructsTree from "./components/code_structs_tree/code_structs_tree.jsx";
import AnalysisMessage from "./components/analysis_message/analysis_message.jsx";

import { getQuery, downloadJSON } from "../../../utils/utils.js";

import styles from "./analysis_result.module.scss";

export default function AnalysisResult() {
	const { setCodeFilesTreeMessageFromFiles, getDownloadJson, selectedCodeFile } = useContext(AnalysisResultContext);

	const uploadCodeFilesRef = useRef(null);

	/** 点击上传代码文件, 弹出 uploadFiles Modal */
	const startUploadCodeFiles = useCallback(() => {
		uploadCodeFilesRef.current.setVisible(true);
	}, []);
	/** 点击下载分析结果 */
	const downloadAnalysisResult = useCallback(() => {
		downloadJSON(getDownloadJson(), `${getQuery("analysis_name")}.json`);
	}, [getDownloadJson]);
	/** 当 UploadCodeFiles 确认, 更新 codeFilesMap, filesTree, */
	const handleOnUploadCodeFilesOk = useCallback(
		(files) => {
			setCodeFilesTreeMessageFromFiles(files).finally(() => {
				uploadCodeFilesRef.current.setVisible(false);
			});
		},
		[setCodeFilesTreeMessageFromFiles]
	);

	return (
		<div className={styles.analysis_result}>
			<div className={styles.analysis_result_header}>
				<div className={styles.analysis_result_header_left}>
					<div className={styles.analysis_result_title}>{selectedCodeFile?.key}</div>
				</div>
				<div className={styles.analysis_result_header_right}>
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={startUploadCodeFiles}>
						上传代码文件
					</Button>
					<UploadCodeFiles ref={uploadCodeFilesRef} onOk={handleOnUploadCodeFilesOk} autoCloseOnOk={false} />
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={downloadAnalysisResult}>
						下载分析结果
					</Button>
				</div>
			</div>
			<div className={styles.analysis_result_body}>
				<SplitPane split="vertical" minSize={"500px"} primary="second">
					<SplitPane split="vertical" minSize={"400px"}>
						<SplitPane split="horizontal" minSize={"50%"}>
							<CodeFilesTree />
							<CodeStructsTree />
						</SplitPane>
						<CodeEditor />
					</SplitPane>
					<AnalysisMessage />
				</SplitPane>
			</div>
		</div>
	);
}
