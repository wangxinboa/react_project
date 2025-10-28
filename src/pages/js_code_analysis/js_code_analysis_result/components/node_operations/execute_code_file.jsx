import { useContext, useCallback } from "react";
import { message } from "antd";

import NodeOperationButton from "./node_operation_button.jsx";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

const ExecuteCodeFileButton = (props) => {
	const { executeCodeFile, setEntryExecutionFileKey } = useContext(JsCodeJsCodeAnalysisResultContext);
	const { codeFile, title = "设为入口执行文件" } = props;

	const onClickToExecuteCodeFile = useCallback(
		async (e) => {
			e.stopPropagation();
			let isExecuted = await executeCodeFile(codeFile);
			let hasSet = setEntryExecutionFileKey(codeFile);

			if (!isExecuted && hasSet) {
				message.info("重新设置了入口执行文件, 请保存代码信息后, 刷新页面重新加载");
			}
		},
		[codeFile, executeCodeFile, setEntryExecutionFileKey]
	);

	return <NodeOperationButton title={title} onClick={onClickToExecuteCodeFile} />;
};

export default ExecuteCodeFileButton;
