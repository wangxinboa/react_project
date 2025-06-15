import { useCallback, useState } from 'react';
import SplitPane from 'react-split-pane';

import CodeEditor from './code_editor/code_editor.jsx';
import CodeFiles from './code_files/code_files.jsx';

import getCodeFiles from './code_files/input_files/get_files.js';

import './code_analysis.css';

export default function JsCodeAnalysis() {
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

	window.exportData = useCallback(() => {
		console.info(JSON.stringify({
			expandedFilesKeys,
			// codeFiles: [
			// 	codeFiles[0].toJSON()
			// ]
		}, null, 2));
	}, [selectFile, codeFiles, expandedFilesKeys]);

	return (
		<div id='codeAnalysis'>
			<SplitPane split="vertical" minSize={'300px'}>
				<CodeFiles
					codeFiles={codeFiles}
					onSelect={handleOnSelectCodeFile}
					onExpand={handleOnExpandCodeFile}
					onUploadFiles={handleOnInputCodeFiles}
				/>
				<CodeEditor
					file={selectFile}
				/>
			</SplitPane>
		</div>
	);
}