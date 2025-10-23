import { useContext, useCallback } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";
import NodeOperationButton from "./node_operation_button.jsx";

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

	return <NodeOperationButton title={title} onClick={onClickToVsCodeFile} />;
};

export default ToFileVsCodeButton;
