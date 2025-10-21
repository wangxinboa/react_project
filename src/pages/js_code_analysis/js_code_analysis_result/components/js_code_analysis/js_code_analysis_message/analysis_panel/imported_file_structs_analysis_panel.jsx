import { useMemo } from "react";
import { isNonEmptyArray } from "../../../../../../../utils/data_type/is_type.js";
import ToFileVsCodeButton from "../../../node_operations/to_file_vs_code.jsx";
import SelectCodeFileButton from "../../../node_operations/select_code_file.jsx";

import styles from "../js_code_analysis_message.module.scss";
import ConsoleMessageButton from "../../../node_operations/console_message.jsx";

const ImportedFileStructsAnalysisPanel = (props) => {
	const { fileStruct } = props;

	/** 该代码文件被导入到的相关代码文件 */
	const importedFileStructs = useMemo(() => {
		return fileStruct.getImportedFileStructs();
	}, [fileStruct]);

	return (
		<div className={styles.js_code_analysis_panel}>
			<div className={styles.js_code_analysis_panel_title}>
				该代码文件被导入相关代码文件({importedFileStructs.length})
			</div>
			{isNonEmptyArray(importedFileStructs) ? (
				<div className={styles.js_code_analysis_panel_content}>
					{importedFileStructs.map((importedFileStruct, index) => {
						const key = importedFileStruct.getCodeFileKey();
						return (
							<div key={key} className={styles.analysis_panel_analysis_entry_container}>
								<div className={styles.analysis_panel_analysis_entry_title}>
									{index + 1}. {importedFileStruct.getCodeFileKey()}
								</div>
								<div className={styles.analysis_panel_analysis_operations}>
									<ConsoleMessageButton message={importedFileStruct} title="打印信息" />
									<SelectCodeFileButton codeFile={importedFileStruct.codeFile} title="选择文件" />
									<ToFileVsCodeButton codeFile={importedFileStruct.codeFile} title="跳转 vscode" />
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default ImportedFileStructsAnalysisPanel;
