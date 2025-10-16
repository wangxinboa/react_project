import { useContext } from "react";
import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";

import styles from "./js_code_analysis.module.scss";
import FileStructAnalysis from "./js_code_struct_analysis/file_struct_analysis/file_struct_analysis.jsx";

const JsCodeAnalysis = () => {
	const { selectedCodeStruct } = useContext(JsCodeJsCodeAnalysisResultContext);

	if (selectedCodeStruct == null) {
		return null;
	}
	return (
		<div className={styles.js_code_analysis_container}>
			<div className={styles.js_code_analysis_title}>
				代码结构: {selectedCodeStruct.type}-{selectedCodeStruct.title}
			</div>
			<div className={styles.js_code_analysis_content}>
				{selectedCodeStruct.isFileStruct ? <FileStructAnalysis codeStruct={selectedCodeStruct} /> : null}
			</div>
		</div>
	);
};

export default JsCodeAnalysis;
