import ImportFileStructs from "./import_file_structs.jsx";

import styles from "./file_struct_analysis.module.scss";

const FileStructAnalysis = (props) => {
	const { codeStruct } = props;

	return (
		<div className={styles.js_code_struct_analysis_container}>
			<div className={styles.import_file_structs_container}>
				<div className={styles.import_file_structs_title}>导入相关代码文件</div>
				<div className={styles.import_file_structs_content}>
					<ImportFileStructs importFileStructs={codeStruct.getImportFileStructs()} />
				</div>
			</div>
			<div className={styles.import_file_structs_container}>
				<div className={styles.import_file_structs_title}>该代码文件被导入相关代码文件</div>
				<div className={styles.import_file_structs_content}>
					<ImportFileStructs importFileStructs={codeStruct.getImportedFileStructs()} />
				</div>
			</div>
		</div>
	);
};

export default FileStructAnalysis;
