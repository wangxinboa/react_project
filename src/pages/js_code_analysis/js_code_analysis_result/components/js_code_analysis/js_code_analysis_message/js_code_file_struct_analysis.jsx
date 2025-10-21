import ImportFileStructsAnalysisPanel from "./analysis_panel/import_file_structs_analysis_panel.jsx";
import ImportedFileStructsAnalysisPanel from "./analysis_panel/imported_file_structs_analysis_panel.jsx";
import OperationRecordAnalysisPanel from "./analysis_panel/operation_record_analysis_panel.jsx";

import styles from "./js_code_analysis_message.module.scss";

const JsCodeFileStructAnalysis = (props) => {
	const { fileStruct } = props;

	return (
		<div className={styles.js_code_file_struct_analysis_container}>
			<ImportFileStructsAnalysisPanel fileStruct={fileStruct} />
			<ImportedFileStructsAnalysisPanel fileStruct={fileStruct} />
			<OperationRecordAnalysisPanel operationRecordStruct={fileStruct} />
		</div>
	);
};

export default JsCodeFileStructAnalysis;
