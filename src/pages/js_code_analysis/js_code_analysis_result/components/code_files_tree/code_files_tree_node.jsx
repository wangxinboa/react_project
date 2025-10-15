import { useCallback, useContext } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

import styles from "./code_files_tree.module.scss";

const CodeFilesTreeNode = (props) => {
	const { toVsCodeFile } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeFile } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			toVsCodeFile(codeFile.key);
		},
		[codeFile, toVsCodeFile]
	);
	return (
		<div className={styles.code_files_tree_node}>
			<div className={styles.code_files_tree_node_title}>{codeFile.name}</div>
			<div className={styles.code_files_tree_node_operations}>
				{codeFile.isFile ? (
					<div className={styles.code_files_tree_node_operation} onClick={onClickToVsCodeFile}>
						跳转 vscode
					</div>
				) : null}
			</div>
		</div>
	);
};

export default CodeFilesTreeNode;
