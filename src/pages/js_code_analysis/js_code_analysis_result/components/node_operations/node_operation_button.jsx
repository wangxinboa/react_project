import styles from "./node_operation.module.scss";

const NodeOperationButton = (props) => {
	const { title, onClick } = props;
	return (
		<div className={styles.node_operation} onClick={onClick}>
			{title}
		</div>
	);
};

export default NodeOperationButton;
