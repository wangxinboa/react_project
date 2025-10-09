import { useCallback, useContext } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../../js_code_analysis_result.jsx";
import styles from "../js_code_structs_tree.module.scss";

const ImportDeclarationStructOperations = (props) => {
	const { toVsCodeFile } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeStruct } = props;

	const onClickToSourceVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			toVsCodeFile(codeStruct.getSourceFilePath());
		},
		[codeStruct, toVsCodeFile]
	);

	return (
		<div className={styles.js_code_structs_tree_node_operations}>
			<div className={styles.js_code_structs_tree_node_operation} onClick={onClickToSourceVsCodeFile}>
				跳转导入文件 vscode
			</div>
		</div>
	);
};

export default ImportDeclarationStructOperations;
