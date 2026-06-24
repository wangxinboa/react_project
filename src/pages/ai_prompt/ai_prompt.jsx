import { useCallback, useRef, useState } from "react";
import { Button } from "antd";
import { UploadCodeFiles } from "../../components/upload_code_files/upload_code_files.jsx";
import { createCodeFilesTreeByFileList } from "../../utils/input_files/code_files/create_code_files_tree_by_file_list.js";

import styles from "./ai_prompt.module.scss";

export function AIPrompt() {
	const uploadCodeFilesRef = useRef(null);

	const startUploadCodeFiles = useCallback(() => {
		uploadCodeFilesRef.current.startUpload();
	}, []);

	const consoleAIPrompt = useCallback(() => {}, []);

	/**
	 * 组件内部已完成文件读取和代码树生成，直接使用返回结果即可
	 */
	const handleOnUploadCodeFilesOk = useCallback(async ({ files, rootCodeFolder }) => {}, []);

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
			<div className={styles.ai_prompt_content}></div>
		</div>
	);
}
