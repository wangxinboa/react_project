import ConsoleMessageButton from "../node_operations/console_message.jsx";
import ExecuteCodeFileButton from "../node_operations/execute_code_file.jsx";
import ToFileVsCodeButton from "../node_operations/to_file_vs_code.jsx";

import styles from "./code_files_tree.module.scss";

const CodeFilesTreeNode = (props) => {
	const { codeFile } = props;

	return (
		<div className={styles.code_files_tree_node}>
			<div className={styles.code_files_tree_node_title}>{codeFile.name}</div>
			{codeFile.isFile ? (
				<div className={styles.code_files_tree_node_operations}>
					<ExecuteCodeFileButton title="设为入口执行文件" codeFile={codeFile} />
					<ConsoleMessageButton title="打印代码" message={codeFile.codeMessage.codeString} />
					<ToFileVsCodeButton title="跳转 vscode" codeFile={codeFile} />
				</div>
			) : null}
		</div>
	);
};

export default CodeFilesTreeNode;
