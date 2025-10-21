import { useContext } from "react";
import { Segmented } from "antd";

import { JsCodeJsCodeAnalysisResultContext } from "../../js_code_analysis_result.jsx";
import useJsCodeAnalysisSegmented from "./use_js_code_analysis_segmented.jsx";
import JsCodeStructsTree from "./js_code_structs_tree/js_code_structs_tree.jsx";
import JsCodeFileStructAnalysis from "./js_code_analysis_message/js_code_file_struct_analysis.jsx";

import styles from "./js_code_analysis.module.scss";

const JsCodeAnalysis = () => {
	const { selectedCodeFile, selectedCodeFileStruct } = useContext(JsCodeJsCodeAnalysisResultContext);

	const {
		jsCodeAnalysisSegmentedOptions,
		jsCodeAnalysisSegmentedValue,
		handleOnChangeJsCodeAnalysisSegmented,
		isJsCodeStructsTree,
		isJsCodeFileStructAnalysis,
	} = useJsCodeAnalysisSegmented();

	if (selectedCodeFile === null || selectedCodeFileStruct == null) {
		return null;
	}

	return (
		<div className={styles.js_code_analysis_container}>
			<div className={styles.js_code_analysis_title}>文件代码结构: {selectedCodeFile.key}</div>
			<div className={styles.js_code_analysis_segmented_container}>
				<Segmented
					size="small"
					value={jsCodeAnalysisSegmentedValue}
					options={jsCodeAnalysisSegmentedOptions}
					onChange={handleOnChangeJsCodeAnalysisSegmented}
				/>
			</div>
			<div className={styles.js_code_analysis_content}>
				{isJsCodeStructsTree ? <JsCodeStructsTree /> : null}
				{isJsCodeFileStructAnalysis ? <JsCodeFileStructAnalysis fileStruct={selectedCodeFileStruct} /> : null}
			</div>
		</div>
	);
};

export default JsCodeAnalysis;
