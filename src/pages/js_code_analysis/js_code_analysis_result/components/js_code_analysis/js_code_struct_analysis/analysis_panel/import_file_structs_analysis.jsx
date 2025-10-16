import ToFileVsCodeButton from "../../../node_operations/to_file_vs_code.js";
import { isNonEmptyArray } from "../../../../../../../utils/data_type/is_type.js";

import styles from "./analysis_panel.module.scss";

const ImportFileStructsAnalysis = (props) => {
	const { importFileStructs } = props;

	return (
		<div className={styles.analysis_panel}>
			{isNonEmptyArray(importFileStructs) ? (
				importFileStructs.map((importFileStruct, index) => {
					const key = importFileStruct.getCodeFileKey();
					return (
						<div key={key} className={styles.analysis_panel_analysis_entry}>
							{index + 1}. {key}
							<div className={styles.analysis_panel_operations}>
								<ToFileVsCodeButton codeStruct={importFileStruct} title="跳转文件 vscode" />
							</div>
						</div>
					);
				})
			) : (
				<div className={styles.analysis_panel_empty}>数据为空</div>
			)}
		</div>
	);
};

export default ImportFileStructsAnalysis;
