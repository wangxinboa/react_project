import { useCallback, useRef, useState } from "react";
import { Tree, Button } from "antd";
import { UploadCodeFiles } from "../../components/upload_code_files/upload_code_files.jsx";
import { createCodeFilesTreeByFileList } from "../../utils/input_files/code_files/create_code_files_tree_by_file_list.js";

import styles from "./ai_prompt.module.scss";

export function AIPrompt() {
	const uploadCodeFilesRef = useRef(null);

	const [codeFilesMap, setCodeFilesMap] = useState({});
	const [codeFilesTreeData, setCodeFilesTreeData] = useState([]);
	const [codeFilesTreeExpandedKeys, setCodeFilesTreeExpandedKeys] = useState([]);
	const [codeFilesTreeSelectedKeys, setCodeFilesTreeSelectedKeys] = useState([]);
	const [codeFilesTreeCheckedKeys, setCodeFilesTreeCheckedKeys] = useState([]);

	const startUploadCodeFiles = useCallback(() => {
		uploadCodeFilesRef.current.startUpload();
	}, []);
	const consoleAIPrompt = useCallback(() => {
		console.info("codeFilesTreeCheckedKeys:", codeFilesTreeCheckedKeys);
		let promptString = "";
		for (let i = 0, len = codeFilesTreeCheckedKeys.length; i < len; i++) {
			const codeFile = codeFilesMap[codeFilesTreeCheckedKeys[i]];
			if (codeFile) {
				promptString += codeFile.key + "\n";
				promptString += codeFile.codeMessage.codeString + "\n";
			}
		}
		console.info(promptString);
	}, [codeFilesMap, codeFilesTreeCheckedKeys]);

	/** 当 UploadCodeFiles Modal 确认, 更新 filesTree, */
	const handleOnUploadCodeFilesOk = useCallback(async (files) => {
		const _rootCodeFolder = await createCodeFilesTreeByFileList(files).readFilesAsText();

		setCodeFilesMap(_rootCodeFolder.codeFilesMap);
		setCodeFilesTreeData(_rootCodeFolder.children);
		setCodeFilesTreeExpandedKeys([]);
		setCodeFilesTreeSelectedKeys([]);
	}, []);

	const handleOnTreeExpand = useCallback((expandedKeys) => {
		setCodeFilesTreeExpandedKeys(expandedKeys);
	}, []);
	const handleOnTreeSelect = useCallback((selectedKeys) => {
		setCodeFilesTreeExpandedKeys(selectedKeys);
	}, []);
	const handleOnTreeCheck = useCallback((checkedKeys) => {
		setCodeFilesTreeCheckedKeys(checkedKeys);
	}, []);

	return (
		<div className={styles.ai_prompt}>
			<div className={styles.ai_prompt_header}>
				<UploadCodeFiles ref={uploadCodeFilesRef} onOk={handleOnUploadCodeFilesOk} />
				<Button className={styles.ai_prompt_header_button} size="small" onClick={startUploadCodeFiles}>
					上传代码文件
				</Button>
				<Button className={styles.ai_prompt_header_button} size="small" onClick={consoleAIPrompt}>
					打印提示词
				</Button>
			</div>
			<div className={styles.ai_prompt_content}>
				<Tree
					multiple={false}
					blockNode
					showLine
					checkable
					fieldNames={{ title: "name", key: "key", children: "children" }}
					expandedKeys={codeFilesTreeExpandedKeys}
					selectedKeys={codeFilesTreeSelectedKeys}
					checkedKeys={codeFilesTreeCheckedKeys}
					onSelect={handleOnTreeSelect}
					onExpand={handleOnTreeExpand}
					onCheck={handleOnTreeCheck}
					treeData={codeFilesTreeData}
				/>
			</div>
		</div>
	);
}
