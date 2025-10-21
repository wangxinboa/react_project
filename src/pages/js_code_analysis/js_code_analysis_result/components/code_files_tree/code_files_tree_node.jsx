import ConsoleMessageButton from "../node_operations/console_message.jsx";
import ToFileVsCodeButton from "../node_operations/to_file_vs_code.jsx";

import styles from "./code_files_tree.module.scss";

const CodeFilesTreeNode = (props) => {
	const { codeFile } = props;

	return (
		<div className={styles.code_files_tree_node}>
			<div className={styles.code_files_tree_node_title}>{codeFile.name}</div>
			<div className={styles.code_files_tree_node_operations}>
				{codeFile.isFile ? <ConsoleMessageButton title="打印代码" message={codeFile.codeMessage.codeString} /> : null}
				{codeFile.isFile ? <ToFileVsCodeButton title="跳转 vscode" codeFile={codeFile} /> : null}
			</div>
		</div>
	);
};

export default CodeFilesTreeNode;
