import ToFileVsCodeButton from "../node_operations/to_file_vs_code.js";
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
				{codeStruct.isFileStruct ? <ToFileVsCodeButton codeStruct={codeStruct} title="跳转文件 vscode" /> : null}
				{codeStruct.isImportDeclarationStruct ? (
					<ToFileVsCodeButton codeStruct={codeStruct.importedFileStruct} title="跳转导入文件 vscode" />
				) : null}
			</div>
		</div>
	);
};

export default JsCodeStructsTreeNode;
