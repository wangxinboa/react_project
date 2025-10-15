import { useContext, useCallback } from "react";
import styles from "./node_operation.module.scss";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

const ToFileVsCodeButton = (props) => {
	const { toVsCodeFile } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeStruct, title } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			toVsCodeFile(codeStruct.codeFile.key);
		},
		[codeStruct.codeFile.key, toVsCodeFile]
	);

	return (
		<div className={styles.node_operation} onClick={onClickToVsCodeFile}>
			{title}
		</div>
	);
};

export default ToFileVsCodeButton;
