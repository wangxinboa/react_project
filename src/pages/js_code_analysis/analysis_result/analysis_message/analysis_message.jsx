import React, { useImperativeHandle } from "react";

import styles from "./analysis_message.module.scss";

export default React.forwardRef(function AnalysisMessage(props, ref) {
	const { codeStructMap, codeFile } = props;

	console.info("codeStructMap:", JSON.stringify(codeStructMap, null, 2));
	console.info("codeFile:", codeFile);

	useImperativeHandle(
		ref,
		() => {
			return {};
		},
		[]
	);

	return (
		<div className={styles.analysis_message}>
			<div className={styles.analysis_message_body}></div>
		</div>
	);
});
