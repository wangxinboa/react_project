import ToFileVsCodeButton from "../../../node_operations/to_file_vs_code.js";
import { isNonEmptyArray } from "../../../../../../../utils/data_type/is_type.js";

import styles from "./file_struct_analysis.module.scss";

const ImportFileStructs = (props) => {
	const { importFileStructs } = props;

	return (
		<div className={styles.import_file_structs}>
			{isNonEmptyArray(importFileStructs) ? (
				importFileStructs.map((importFileStruct, index) => {
					const key = importFileStruct.getCodeFileKey();
					return (
						<div key={key} className={styles.import_file_struct}>
							{index + 1}. {key}
							<div className={styles.import_file_struct_operations}>
								<ToFileVsCodeButton codeStruct={importFileStruct} title="跳转文件 vscode" />
							</div>
						</div>
					);
				})
			) : (
				<div className={styles.import_file_structs_empty}>数据为空</div>
			)}
		</div>
	);
};

export default ImportFileStructs;
