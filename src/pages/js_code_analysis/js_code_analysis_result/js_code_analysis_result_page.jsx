import { useCallback, useRef, useContext } from "react";
import { Button, Splitter } from "antd";

import { JsCodeJsCodeAnalysisResultContext } from "./js_code_analysis_result.jsx";

import ConfigureAnalysis from "./components/configure_analysis/configure_analysis.jsx";
import UploadCodeFiles from "./components/upload_code_files/upload_code_files.jsx";

import CodeFilesTree from "./components/code_files_tree/code_files_tree.jsx";
// import CodeEditor from "./components/code_editor/code_editor.jsx";

import styles from "./js_code_analysis_result.module.scss";
import JsCodeAnalysis from "./components/js_code_analysis/js_code_analysis.jsx";

const JsCodeAnalysisResultPage = () => {
	const {
		selectedCodeFile,
		createAllStructsByAllCodeFiles,
		initCodeFilesByFiles,
		downloadCodeFilesMessage,
		analysisConfig,
		setAnalysisConfigFromFormData,
	} = useContext(JsCodeJsCodeAnalysisResultContext);

	const configureAnalysisRef = useRef(null);
	const uploadCodeFilesRef = useRef(null);

	/** 点击[分析配置], 弹出 ConfigureAnalysis Modal */
	const startConfigureAnalysis = useCallback(() => {
		configureAnalysisRef.current.startConfigure(analysisConfig);
	}, [analysisConfig]);
	/** 当 ConfigureAnalysis Modal 确认, 更新 filesTree, */
	const handleOnConfigureAnalysisOk = useCallback(
		(values) => {
			setAnalysisConfigFromFormData(values);
		},
		[setAnalysisConfigFromFormData]
	);
	/** 点击[上传代码文件], 弹出 UploadCodeFiles Modal */
	const startUploadCodeFiles = useCallback(() => {
		uploadCodeFilesRef.current.startUpload();
	}, []);
	/** 当 UploadCodeFiles Modal 确认, 更新 filesTree, */
	const handleOnUploadCodeFilesOk = useCallback(
		(files) => {
			initCodeFilesByFiles(files).then((rootCodeFolder) => {
				createAllStructsByAllCodeFiles(rootCodeFolder.allFiles);

				uploadCodeFilesRef.current.endUpload();
			});
		},
		[createAllStructsByAllCodeFiles, initCodeFilesByFiles]
	);

	return (
		<div className={styles.js_code_analysis_result}>
			<div className={styles.js_code_analysis_result_header}>
				<div className={styles.js_code_analysis_result_header_left}>
					<div className={styles.js_code_analysis_result_title}>{selectedCodeFile?.key ?? "请选择代码文件"}</div>
				</div>
				<div className={styles.js_code_analysis_result_header_right}>
					<ConfigureAnalysis ref={configureAnalysisRef} onOk={handleOnConfigureAnalysisOk} />
					<Button
						className={styles.js_code_analysis_result_header_right_button}
						size="small"
						onClick={startConfigureAnalysis}
					>
						分析配置
					</Button>
					<Button
						className={styles.js_code_analysis_result_header_right_button}
						size="small"
						onClick={startUploadCodeFiles}
					>
						上传代码文件
					</Button>
					<UploadCodeFiles ref={uploadCodeFilesRef} onOk={handleOnUploadCodeFilesOk} autoCloseOnOk={false} />
					<Button
						className={styles.js_code_analysis_result_header_right_button}
						size="small"
						onClick={downloadCodeFilesMessage}
					>
						下载代码信息
					</Button>
				</div>
			</div>
			{/* <div className={styles.js_code_analysis_result_body}> */}
			<Splitter className={styles.js_code_analysis_result_body}>
				<Splitter.Panel defaultSize={450}>
					<CodeFilesTree />
				</Splitter.Panel>
				{/* <Splitter.Panel>
					Panel 2 代码编辑页面
					<CodeEditor />
				</Splitter.Panel> */}
				<Splitter.Panel>
					<JsCodeAnalysis />
				</Splitter.Panel>
			</Splitter>
		</div>
	);
};

export default JsCodeAnalysisResultPage;
