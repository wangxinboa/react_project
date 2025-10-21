import { useContext, useCallback } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

import styles from "./node_operation.module.scss";

const ToFileVsCodeButton = (props) => {
	const { toVsCodeFile } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeFile, title } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			toVsCodeFile(codeFile.key);
		},
		[codeFile.key, toVsCodeFile]
	);

	return (
		<div className={styles.node_operation} onClick={onClickToVsCodeFile}>
			{title}
		</div>
	);
};

export default ToFileVsCodeButton;
