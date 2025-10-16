import ImportVariableStructEntry from "./import_variable_struct_entry.jsx";
import { isNonEmptyArray } from "../../../../../../../../utils/data_type/is_type.js";

import styles from "../analysis_panel.module.scss";

const VariableStructsAnalysis = (props) => {
	const { variableStructs } = props;

	return (
		<div className={styles.analysis_panel}>
			{isNonEmptyArray(variableStructs) ? (
				variableStructs.map((variableStruct) => {
					console.info("variableStruct:", variableStruct);
					return (
						<div key={variableStruct.name} className={styles.analysis_panel_analysis_entry}>
							{variableStruct.isImportVariableStruct ? (
								<ImportVariableStructEntry importVariableStruct={variableStruct} />
							) : null}
						</div>
					);
				})
			) : (
				<div className={styles.analysis_panel_empty}>无变量信息</div>
			)}
		</div>
	);
};

export default VariableStructsAnalysis;
