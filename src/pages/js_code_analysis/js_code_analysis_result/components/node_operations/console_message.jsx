import { useCallback } from "react";

import styles from "./node_operation.module.scss";

const ConsoleMessageButton = (props) => {
	const { message, title = "打印信息" } = props;

	const onClickToVsCodeFile = useCallback(
		(e) => {
			e.stopPropagation();
			console.info(message);
		},
		[message]
	);

	return (
		<div className={styles.node_operation} onClick={onClickToVsCodeFile}>
			{title}
		</div>
	);
};

export default ConsoleMessageButton;
