import { useCallback } from "react";
import NodeOperationButton from "./node_operation_button.jsx";

const ConsoleAstCodeButton = (props) => {
	const { codeStruct, title = "打印 ast 代码" } = props;

	const consoleAstCode = useCallback(
		(e) => {
			e.stopPropagation();
			const ast = codeStruct.ast;
			const codeString = codeStruct.fileStruct.getCodeString();

			console.info(codeString.slice(ast.start, ast.end));
		},
		[codeStruct]
	);

	return <NodeOperationButton title={title} onClick={consoleAstCode} />;
};

export default ConsoleAstCodeButton;
