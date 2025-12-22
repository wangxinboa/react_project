import ConsoleAstCodeButton from "../../../../node_operations/console_ast_code.jsx";
import ConsoleMessageButton from "../../../../node_operations/console_message.jsx";

import styles from "../operation_record.module.scss";

const UnknowOperationTreeNode = (props) => {
	const { operationRecord } = props;

	return (
		<div className={styles.operation_record_tree_node_container}>
			<div className={styles.operation_record_tree_node_title}>
				<span className={styles.bold_text}>未知操作</span>: code struct 类型为{" "}
				<span className={styles.bold_text}>{operationRecord.codeStruct.type}</span>
			</div>

			<div className={styles.operation_record_tree_node_operations}>
				<ConsoleAstCodeButton title="打印 ast 代码" codeStruct={operationRecord.codeStruct} />
				<ConsoleMessageButton title="打印 code struct" message={operationRecord.codeStruct} />
			</div>
		</div>
	);
};

export default UnknowOperationTreeNode;
