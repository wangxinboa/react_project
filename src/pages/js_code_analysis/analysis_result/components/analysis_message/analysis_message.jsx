import React, { useImperativeHandle } from "react";

import styles from "./analysis_message.module.scss";

export default React.forwardRef(function AnalysisMessage(props, ref) {
	// const { codeStructMap, codeFile } = props;

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
