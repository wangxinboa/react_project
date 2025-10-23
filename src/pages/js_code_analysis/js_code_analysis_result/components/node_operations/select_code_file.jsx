import { useContext, useCallback } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";
import NodeOperationButton from "./node_operation_button.jsx";

const SelectCodeFileButton = (props) => {
	const { onSetCodeFilesTreeSelectedKeys, codeFilesMap } = useContext(JsCodeJsCodeAnalysisResultContext);

	const { codeFile, title } = props;

	const selectCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			onSetCodeFilesTreeSelectedKeys([codeFile.key], codeFilesMap);
		},
		[codeFile.key, codeFilesMap, onSetCodeFilesTreeSelectedKeys]
	);

	return <NodeOperationButton title={title} onClick={selectCodeFile} />;
};

export default SelectCodeFileButton;
