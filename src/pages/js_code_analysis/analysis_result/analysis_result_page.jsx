import { useCallback, useRef, useContext } from "react";
import { Button } from "antd";
import SplitPane from "react-split-pane";

import { AnalysisResultContext } from "./analysis_result.jsx";

import ConfigureAnalysis from "./components/configure_analysis/configure_analysis.jsx";
import UploadCodeFiles from "./components/upload_code_files/upload_code_files.jsx";

import CodeEditor from "./components/code_editor/code_editor.jsx";
import CodeFilesTree from "./components/code_files_tree/code_files_tree.jsx";
import CodeStructsTree from "./components/code_structs_tree/code_structs_tree.jsx";
import AnalysisMessage from "./components/analysis_message/analysis_message.jsx";

import styles from "./analysis_result.module.scss";

export default function AnalysisResult() {
	const {
		initCodeFilesFromFiles,
		downloadCodeStructs,
		downloadCodeAnalysis,
		selectedCodeFile,

		analysisConfig,
		setAnalysisConfig,
	} = useContext(AnalysisResultContext);

	const configureAnalysisRef = useRef(null);
	const uploadCodeFilesRef = useRef(null);

	/** 点击[分析配置], 弹出 UploadCodeFiles Modal */
	const startConfigureAnalysis = useCallback(() => {
		configureAnalysisRef.current.startConfigure(analysisConfig);
	}, [analysisConfig]);

	/** 当 UploadCodeFiles Modal 确认, 更新 filesTree, */
	const handleOnConfigureAnalysisOk = useCallback(
		(values) => {
			setAnalysisConfig(values);
		},
		[setAnalysisConfig]
	);

	/** 点击[上传代码文件], 弹出 UploadCodeFiles Modal */
	const startUploadCodeFiles = useCallback(() => {
		uploadCodeFilesRef.current.startUpload();
	}, []);
	/** 当 UploadCodeFiles Modal 确认, 更新 filesTree, */
	const handleOnUploadCodeFilesOk = useCallback(
		(files) => {
			initCodeFilesFromFiles(files).then(() => {
				uploadCodeFilesRef.current.endUpload();
			});
		},
		[initCodeFilesFromFiles]
	);

	return (
		<div className={styles.analysis_result}>
			<div className={styles.analysis_result_header}>
				<div className={styles.analysis_result_header_left}>
					<div className={styles.analysis_result_title}>{selectedCodeFile?.key}</div>
				</div>
				<div className={styles.analysis_result_header_right}>
					<ConfigureAnalysis ref={configureAnalysisRef} onOk={handleOnConfigureAnalysisOk} />
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={startConfigureAnalysis}>
						分析配置
					</Button>
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={startUploadCodeFiles}>
						上传代码文件
					</Button>
					<UploadCodeFiles ref={uploadCodeFilesRef} onOk={handleOnUploadCodeFilesOk} autoCloseOnOk={false} />
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={downloadCodeStructs}>
						下载代码结构
					</Button>
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={downloadCodeAnalysis}>
						下载分析结果
					</Button>
				</div>
			</div>
			<div className={styles.analysis_result_body}>
				<SplitPane split="vertical" minSize={"400px"} primary="second">
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
