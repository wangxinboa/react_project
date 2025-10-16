import ImportFileStructsAnalysis from "../analysis_panel/import_file_structs_analysis.jsx";
import VariableStructsAnalysis from "../analysis_panel/variable_structs_analysis/variable_structs_analysis.jsx";

import styles from "./file_struct_analysis.module.scss";

const FileStructAnalysis = (props) => {
	const { codeStruct } = props;

	return (
		<div className={styles.js_code_struct_analysis_container}>
			<div className={styles.file_struct_analysis_panel}>
				<div className={styles.file_struct_analysis_title}>导入相关代码文件</div>
				<div className={styles.file_struct_analysis_content}>
					<ImportFileStructsAnalysis importFileStructs={codeStruct.getImportFileStructs()} />
				</div>
			</div>
			<div className={styles.file_struct_analysis_panel}>
				<div className={styles.file_struct_analysis_title}>该代码文件被导入相关代码文件</div>
				<div className={styles.file_struct_analysis_content}>
					<ImportFileStructsAnalysis importFileStructs={codeStruct.getImportedFileStructs()} />
				</div>
			</div>
			<div className={styles.file_struct_analysis_panel}>
				<div className={styles.file_struct_analysis_title}>作用域内变量信息</div>
				<div className={styles.file_struct_analysis_content}>
					<VariableStructsAnalysis variableStructs={codeStruct.getVariables()} />
				</div>
			</div>
		</div>
	);
};

export default FileStructAnalysis;
