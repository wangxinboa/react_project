import { useContext, useCallback } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

import styles from "./node_operation.module.scss";

const SelectCodeFileButton = (props) => {
	const { onSetCodeFilesTreeSelectedKeys, codeFilesMap } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeFile, title } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			onSetCodeFilesTreeSelectedKeys([codeFile.key], codeFilesMap);
		},
		[codeFile.key, codeFilesMap, onSetCodeFilesTreeSelectedKeys]
	);

	return (
		<div className={styles.node_operation} onClick={onClickToVsCodeFile}>
			{title}
		</div>
	);
};

export default SelectCodeFileButton;
