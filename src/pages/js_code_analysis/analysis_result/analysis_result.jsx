import { useCallback, useState } from "react";
import SplitPane from "react-split-pane";

import CodeEditor from "./code_editor/code_editor.jsx";
import CodeFiles from "./code_files/code_files.jsx";
import AnalysisMessage from "./analysis_message/analysis_message.jsx";

import getCodeFiles from "./code_files/input_files/get_files.js";
import { getQuery } from "../../../utils/utils.js";

import "./analysis_result.scss";
import AnalysisHeader from "./analysis_header.jsx";

export default function AnalysisResult() {
	const analysisUrl = getQuery("analysis_url");
	console.info("analysisUrl:", analysisUrl);

	const [codeFiles, setCodeFiles] = useState([]);
	const [expandedFilesKeys, setExpandedFilesKeys] = useState([]);
	const [selectFile, setSelectFile] = useState(null);

	const handleOnInputCodeFiles = useCallback((e) => {
		const filesTree = getCodeFiles(e.target.files);
		filesTree.readFilesAsText();
		setCodeFiles([filesTree]);
	}, []);

	const handleOnSelectCodeFile = useCallback((_, e) => {
		setSelectFile(e.selectedNodes[0]);
	}, []);

	const handleOnExpandCodeFile = useCallback((expandedKeys) => {
		setExpandedFilesKeys(expandedKeys);
	}, []);

	// window.exportData = useCallback(() => {
	// 	console.info(
	// 		JSON.stringify(
	// 			{
	// 				expandedFilesKeys,
	// 				codeFiles: [codeFiles[0].toJSON()],
	// 			},
	// 			null,
	// 			2
	// 		)
	// 	);
	// }, [selectFile, codeFiles, expandedFilesKeys]);

	return (
		<div id="codeAnalysis">
			<div className="code_analysis_header">
				<AnalysisHeader />
			</div>
			<div className="code_analysis_body">
				<SplitPane split="vertical" minSize={"300px"}>
					<CodeFiles
						codeFiles={codeFiles}
						expandedFilesKeys={expandedFilesKeys}
						onSelect={handleOnSelectCodeFile}
						onExpand={handleOnExpandCodeFile}
						onUploadFiles={handleOnInputCodeFiles}
					/>
					<SplitPane split="vertical" minSize={"300px"} primary="second">
						<CodeEditor file={selectFile} />
						<AnalysisMessage />
					</SplitPane>
				</SplitPane>
			</div>
		</div>
	);
}
