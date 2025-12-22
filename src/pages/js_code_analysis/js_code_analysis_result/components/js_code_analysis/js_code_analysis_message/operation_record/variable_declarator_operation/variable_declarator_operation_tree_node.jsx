import { useMemo } from "react";
import styles from "../operation_record.module.scss";

const VariableDeclaratorOperationTreeNode = (props) => {
	const { operationRecord } = props;

	const variableStruct = useMemo(() => {
		return operationRecord.variableStruct;
	}, [operationRecord]);

	return (
		<div className={styles.operation_record_tree_node_container}>
			<div className={styles.operation_record_tree_node_title}>
				<span className={styles.bold_text}>{operationRecord.kind}</span> 声明变量
				{operationRecord.isIdentifierStruct ? (
					<span className={styles.key_point_text}>{variableStruct.name}</span>
				) : null}
				{operationRecord.initTitle ? (
					<span>
						初始化值为 <span className={styles.bold_text}>{`${operationRecord.initTitle}`}</span>
					</span>
				) : null}
			</div>
		</div>
	);
};

export default VariableDeclaratorOperationTreeNode;
