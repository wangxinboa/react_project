import { useCallback } from "react";

import styles from "./node_operation.module.scss";

const ConsoleAstCodeButton = (props) => {
	const { codeStruct, title = "打印 ast 代码" } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			const ast = codeStruct.ast;
			const codeString = codeStruct.fileStruct.getCodeString();

			console.info(codeString.slice(ast.start, ast.end));
		},
		[codeStruct]
	);

	return (
		<div className={styles.node_operation} onClick={onClickToVsCodeFile}>
			{title}
		</div>
	);
};

export default ConsoleAstCodeButton;
