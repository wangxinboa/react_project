import { useCallback } from "react";
import NodeOperationButton from "./node_operation_button.jsx";

const ConsoleMessageButton = (props) => {
	const { message, title = "打印信息" } = props;

	const consoleMessage = useCallback(
		(e) => {
			e.stopPropagation();
			console.info(message);
		},
		[message]
	);

	return <NodeOperationButton title={title} onClick={consoleMessage} />;
};

export default ConsoleMessageButton;
