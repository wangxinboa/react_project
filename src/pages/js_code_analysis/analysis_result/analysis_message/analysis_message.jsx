import React, { useState, useCallback, useImperativeHandle, useRef } from "react";
import { Button } from "antd";

import AddJsCodeStructForm from "./add_js_code_struct_form.jsx";

import styles from "./analysis_message.module.scss";

export default React.forwardRef(function AnalysisMessage(_, ref) {
	const addJsCodeStructFormRef = useRef(null);

	const [codeFile, setCodeFile] = useState(null);

	const addJsCodeStruct = useCallback(() => {
		addJsCodeStructFormRef.current.setModalVisible(true);
		addJsCodeStructFormRef.current.setModalTitle(codeFile?.key);
	}, [codeFile]);

	useImperativeHandle(
		ref,
		() => {
			return {
				setCurrentCodeFile(_codeFile) {
					setCodeFile(_codeFile);
				},
			};
		},
		[]
	);

	return (
		<div className={styles.analysis_message}>
			<div className={styles.analysis_message_header}>
				<Button size="small" onClick={addJsCodeStruct}>
					新增代码文件节点
				</Button>
				<AddJsCodeStructForm ref={addJsCodeStructFormRef} />
			</div>
		</div>
	);
});
