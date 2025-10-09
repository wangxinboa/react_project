import styles from "./js_code_structs_tree.module.scss";
import FileStructOperations from "./js_code_structs_tree_node_operations/file_struct_operations.jsx";
import ImportDeclarationStructOperations from "./js_code_structs_tree_node_operations/import_declaration_struct_operations.jsx";

const JsCodeStructsTreeNode = (props) => {
	const { codeStruct } = props;

	return (
		<div className={styles.js_code_structs_tree_node}>
			<div className={styles.js_code_structs_tree_node_title}>
				{codeStruct.parentRelation ? `${codeStruct.parentRelation}-` : ""}
				{codeStruct.type ?? "类型未知"}: {codeStruct.title}
			</div>
			{codeStruct.isFileStruct ? <FileStructOperations codeStruct={codeStruct} /> : null}
			{codeStruct.isImportDeclarationStruct ? <ImportDeclarationStructOperations codeStruct={codeStruct} /> : null}
		</div>
	);
};

export default JsCodeStructsTreeNode;
