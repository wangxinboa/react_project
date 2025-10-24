import { useState, useCallback, useMemo } from "react";
import ToFileVsCodeButton from "../../node_operations/to_file_vs_code.jsx";
import NodeOperationButton from "../../node_operations/node_operation_button.jsx";
import { copyToClipboard } from "../../../../../../utils/copy/copy_text.js";

import styles from "./ast_relations_drawer.module.scss";

const AstRelationsExample = (props) => {
	const { index, astRelationParentCase } = props;

	const codeString = useMemo(() => {
		return astRelationParentCase.getCodeString();
	}, [astRelationParentCase]);

	const copyCodeString = useCallback(() => {
		copyToClipboard(codeString);
	}, [codeString]);

	const [showCodeString, setShowCodeString] = useState(false);
	const handleClickCodeStringShow = useCallback(() => {
		setShowCodeString(!showCodeString);
	}, [showCodeString]);

	return (
		<div className={styles.ast_relations_example} key={astRelationParentCase.key}>
			<div className={styles.ast_relations_example_title}>
				{index + 1}.{astRelationParentCase.fileStruct.getCodeFileKey()}
				<div className={styles.ast_relations_example_operations}>
					<NodeOperationButton title="复制代码" onClick={copyCodeString} />
					<ToFileVsCodeButton title="跳转 vscode" codeFile={astRelationParentCase.getCodeFile()} />
					<NodeOperationButton title={showCodeString ? "隐藏代码" : "展示代码"} onClick={handleClickCodeStringShow} />
				</div>
			</div>
			{showCodeString ? <div className={styles.ast_relations_example_code_string}>{codeString}</div> : null}
		</div>
	);
};

export default AstRelationsExample;
