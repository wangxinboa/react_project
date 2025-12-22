import styles from "../operation_record.module.scss";

const ImportOperationTreeNode = (props) => {
	const { operationRecord } = props;

	return (
		<div className={styles.operation_record_tree_node_container}>
			<div className={styles.operation_record_tree_node_title}>
				{operationRecord.isFirstImported ? "首次导入执行" : "导入"}
				isImportOperation
			</div>
		</div>
	);
};

export default ImportOperationTreeNode;
