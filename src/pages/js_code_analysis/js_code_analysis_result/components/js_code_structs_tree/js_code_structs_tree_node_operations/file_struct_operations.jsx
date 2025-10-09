import { useCallback, useContext } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../../js_code_analysis_result.jsx";
import styles from "../js_code_structs_tree.module.scss";

const FileStructOperations = (props) => {
	const { toVsCodeFile } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeStruct } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			toVsCodeFile(codeStruct.codeFile.key);
		},
		[codeStruct.codeFile.key, toVsCodeFile]
	);

	return (
		<div className={styles.js_code_structs_tree_node_operations}>
			<div className={styles.js_code_structs_tree_node_operation} onClick={onClickToVsCodeFile}>
				跳转 vscode
			</div>
		</div>
	);
};

export default FileStructOperations;
