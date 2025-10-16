import ToFileVsCodeButton from "../../../../node_operations/to_file_vs_code.js";

import styles from "../analysis_panel.module.scss";

const ImportVariableStructEntry = (props) => {
	const { importVariableStruct } = props;
	return (
		<div className={`${styles.analysis_panel_analysis_entry} ${styles.import_variable_struct_entry}`}>
			{importVariableStruct.title}
			<div className={styles.analysis_panel_operations}>
				<ToFileVsCodeButton codeStruct={importVariableStruct.fileStruct} title="跳转文件 vscode" />
			</div>
		</div>
	);
};

export default ImportVariableStructEntry;
