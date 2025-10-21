import ConsoleMessageButton from "../../node_operations/console_message.jsx";
import styles from "./js_code_structs_tree.module.scss";

const JsCodeStructsTreeNode = (props) => {
	const { codeStruct } = props;

	return (
		<div className={styles.js_code_structs_tree_node}>
			<div className={styles.js_code_structs_tree_node_title}>
				{codeStruct.parentRelation ? `${codeStruct.parentRelation}-` : ""}
				{codeStruct.type ?? "类型未知"}: {codeStruct.title}
			</div>
			<div className={styles.js_code_structs_tree_node_operations}>
				<ConsoleMessageButton message={codeStruct} />
			</div>
		</div>
	);
};

export default JsCodeStructsTreeNode;
