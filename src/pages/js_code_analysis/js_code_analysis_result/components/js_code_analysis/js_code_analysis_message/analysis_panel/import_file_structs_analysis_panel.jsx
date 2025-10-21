import { useMemo } from "react";
import { isNonEmptyArray } from "../../../../../../../utils/data_type/is_type.js";
import ToFileVsCodeButton from "../../../node_operations/to_file_vs_code.jsx";
import SelectCodeFileButton from "../../../node_operations/select_code_file.jsx";

import styles from "../js_code_analysis_message.module.scss";
import ConsoleMessageButton from "../../../node_operations/console_message.jsx";

const ImportFileStructsAnalysisPanel = (props) => {
	const { fileStruct } = props;

	/** 导入的相关代码文件 */
	const importFileStructs = useMemo(() => {
		return fileStruct.getImportFileStructs();
	}, [fileStruct]);

	return (
		<div className={styles.js_code_analysis_panel}>
			<div className={styles.js_code_analysis_panel_title}>导入相关代码文件({importFileStructs.length})</div>

			{isNonEmptyArray(importFileStructs) ? (
				<div className={styles.js_code_analysis_panel_content}>
					{importFileStructs.map((importFileStruct, index) => {
						const key = importFileStruct.getCodeFileKey();
						return (
							<div key={key} className={styles.analysis_panel_analysis_entry_container}>
								<div className={styles.analysis_panel_analysis_entry_title}>
									{index + 1}. {importFileStruct.getCodeFileKey()}
								</div>
								<div className={styles.analysis_panel_analysis_operations}>
									<ConsoleMessageButton message={importFileStruct} title="打印信息" />
									<SelectCodeFileButton codeFile={importFileStruct.codeFile} title="选择文件" />
									<ToFileVsCodeButton codeFile={importFileStruct.codeFile} title="跳转 vscode" />
								</div>
							</div>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default ImportFileStructsAnalysisPanel;
