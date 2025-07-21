import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import SplitPane from "react-split-pane";

import CodeFile from "./code_files/code_file.js";
import getCodeFiles from "./code_files/get_files.js";

import { getStructFromJSON } from "./code_struct/code_struct_utils.js";
import FileStruct from "./code_struct/file_struct.js";

import UploadCodeFiles from "./components/upload_code_files/upload_code_files.jsx";

import CodeEditor from "./components/code_editor/code_editor.jsx";
import CodeFilesTree from "./components/code_files_tree/code_files_tree.jsx";
import CodeStructsTree from "./components/code_structs_tree/code_structs_tree.jsx";
import AnalysisMessage from "./components/analysis_message/analysis_message.jsx";

import { getQuery, downloadJSON } from "../../../utils/utils.js";
import { serviceGetServiceAnalysisResult } from "../../../service/service_analysis_result.js";

import styles from "./analysis_result.module.scss";

let _currentCodeFileKey_ = null;
let _codeFileStructKey_ = null;

export default function AnalysisResult() {
	const uploadCodeFilesRef = useRef(null);
	const codeFilesTreeRef = useRef(null);
	const codeEditorRef = useRef(null);
	const codeStructsTreeRef = useRef(null);
	const analysisMessageRef = useRef(null);

	const [codeFilesMap, setCodeFilesMap] = useState(null);
	const [codeFileStructsMap, setCodeFileStructsMap] = useState({});
	const [codeStructsMap, setCodeStructsMap] = useState({});
	const [currentCodeFile, setCurrentCodeFile] = useState(null);

	/** 弹出设置 uploadFiles Modal */
	const startUploadCodeFiles = useCallback(() => {
		uploadCodeFilesRef.current.setVisible(true);
	}, []);
	/** 下载分析结果 */
	const downloadAnalysisResult = useCallback(() => {
		downloadJSON(
			JSON.stringify({
				codeFilesMap,
				// CodeFilesTree
				codeFilesTree: {
					treeData: codeFilesTreeRef.current.treeData,
					expandedKeys: codeFilesTreeRef.current.expandedKeys,
					selectedKeys: codeFilesTreeRef.current.selectedKeys,
				},

				codeFileStructs: {
					codeFileStructsMap,
					codeFileNames: Object.keys(codeFileStructsMap),
				},
			}),
			`${getQuery("analysis_name")}.json`
		);
	}, [codeFilesMap, codeFileStructsMap]);
	/** 当 AnalysisResultSetting 确认设置, 更新 codeFilesMap, filesTree */
	const handleOnUploadCodeFilesOk = useCallback((files) => {
		getCodeFiles(files)
			.readFilesAsText()
			.then((rootFolder) => {
				setCodeFilesMap(rootFolder.codeFilesMap);
				codeFilesTreeRef.current.setData([rootFolder.toJSON()]);
			})
			.finally(() => {
				uploadCodeFilesRef.current.setVisible(false);
			});
	}, []);
	/** 当 CodeFilesTree 被选择的文件树节点改变时 */
	const handleOnCodeFilesTreeSelectedKeysChange = useCallback(
		(selectedKeys) => {
			setCurrentCodeFile(codeFilesMap?.[selectedKeys?.[0]] ?? null);
		},
		[codeFilesMap]
	);
	/** 当 CodeEditor 滚动时 */
	const handleOnCodeEditorChangeScroll = useCallback(() => {
		if (currentCodeFile !== null) {
			CodeFile.setScroll(currentCodeFile, codeEditorRef.current.getScrollTop(), codeEditorRef.current.getScrollLeft());
		}
	}, [currentCodeFile]);
	/** 当 CodeEditor 选择的 range 有变化时*/
	const handleOnCodeEditorChangeSelection = useCallback(() => {
		if (currentCodeFile !== null) {
			CodeFile.setRange(currentCodeFile, codeEditorRef.current.getRange());
		}
	}, [currentCodeFile]);

	/** 初始化请求分析数据 */
	useEffect(() => {
		const analysisUrl = getQuery("analysis_url");
		if (analysisUrl) {
			serviceGetServiceAnalysisResult(analysisUrl).then((res) => {
				codeFilesTreeRef.current.setData(
					res.data.codeFilesTree.treeData,
					res.data.codeFilesTree.expandedKeys,
					res.data.codeFilesTree.selectedKeys
				);

				setCodeFilesMap(res.data.codeFilesMap ?? {});

				const _codeStructsMap = {};
				const _codeFileStructsMap = {};

				for (let i = 0, len = res.data.codeFileStructs.codeFileNames.length; i < len; i++) {
					_codeFileStructKey_ = res.data.codeFileStructs.codeFileNames[i];

					_codeStructsMap[_codeFileStructKey_] = getStructFromJSON(
						res.data.codeFileStructs.codeFileStructsMap[_codeFileStructKey_],
						_codeStructsMap,
						_codeFileStructsMap
					);

					_codeFileStructKey_ = null;
				}
				setCodeStructsMap(_codeStructsMap);
				setCodeFileStructsMap(_codeFileStructsMap);
			});
		}
	}, []);
	/** 选择新的代码文件之后，展示相关信息 */
	useEffect(() => {
		if (currentCodeFile !== null) {
			// 设置 CodeEditor 信息
			codeEditorRef.current.setData(
				currentCodeFile.code,
				currentCodeFile.vScroll,
				currentCodeFile.hScroll,
				currentCodeFile.range
			);
			// 设置 CodeStructsTree 信息
			_currentCodeFileKey_ = currentCodeFile.key;

			if (!codeFileStructsMap[currentCodeFile.key]) {
				codeFileStructsMap[_currentCodeFileKey_] = new FileStruct(
					_currentCodeFileKey_,
					currentCodeFile.name,
					codeStructsMap
				);
			}
			codeStructsTreeRef.current.setData([codeFileStructsMap[_currentCodeFileKey_]]);

			_currentCodeFileKey_ = null;
		}
	}, [currentCodeFile, codeStructsMap, codeFileStructsMap]);

	return (
		<div className={styles.analysis_result}>
			<div className={styles.analysis_result_header}>
				<div className={styles.analysis_result_header_left}>
					<div className={styles.analysis_result_title}>{currentCodeFile?.key}</div>
				</div>
				<div className={styles.analysis_result_header_right}>
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={startUploadCodeFiles}>
						上传代码文件
					</Button>
					<UploadCodeFiles ref={uploadCodeFilesRef} onOk={handleOnUploadCodeFilesOk} />
					<Button className={styles.analysis_result_header_right_button} size="small" onClick={downloadAnalysisResult}>
						下载分析结果
					</Button>
				</div>
			</div>
			<div className={styles.analysis_result_body}>
				<SplitPane split="vertical" minSize={"500px"} primary="second">
					<SplitPane split="vertical" minSize={"400px"}>
						<SplitPane split="horizontal" minSize={"50%"}>
							<CodeFilesTree ref={codeFilesTreeRef} onSelectedKeysChange={handleOnCodeFilesTreeSelectedKeysChange} />
							<CodeStructsTree ref={codeStructsTreeRef} />
						</SplitPane>
						<CodeEditor
							ref={codeEditorRef}
							onChangeScroll={handleOnCodeEditorChangeScroll}
							onChangeSelection={handleOnCodeEditorChangeSelection}
						/>
					</SplitPane>
					<AnalysisMessage ref={analysisMessageRef} />
				</SplitPane>
			</div>
		</div>
	);
}
