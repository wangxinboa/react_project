import { useMemo } from "react";
import { Popover } from "antd";

import FileStructPopoverContent from "../file_struct_popover_content.jsx";
import ImportVariablePopoverContent from "./Import_variable_popover_content.jsx";
import { isNonEmptyArray } from "../../../../../../../../utils/data_type/is_type.js";

import styles from "../operation_record.module.scss";

const ImportDeclarationOperationTreeNode = (props) => {
	const { operationRecord } = props;

	const importedFileStruct = useMemo(() => {
		return operationRecord.importedFileStruct;
	}, [operationRecord.importedFileStruct]);
	/** importVariableStructs 是否存在 importVariableStructs 元素 */
	const hasImportVariableStructs = useMemo(() => {
		return isNonEmptyArray(operationRecord.importVariableStructs);
	}, [operationRecord]);
	/** defaultImportVariableStruct 是否存在不为 null */
	const hasDefaultImportVariableStruct = useMemo(() => {
		return operationRecord.defaultImportVariableStruct !== null;
	}, [operationRecord]);
	/** operationRecord.defaultImportVariableStruct */
	const defaultImportVariableStruct = useMemo(() => {
		return operationRecord.defaultImportVariableStruct;
	}, [operationRecord]);
	/** namespaceImportVariableStruct 是否存在不为 null */
	const hasNamespaceImportVariableStruct = useMemo(() => {
		return operationRecord.namespaceImportVariableStruct !== null;
	}, [operationRecord]);
	/** operationRecord.importNamespaceSpecifierStruct */
	const namespaceImportVariableStruct = useMemo(() => {
		return operationRecord.namespaceImportVariableStruct;
	}, [operationRecord]);

	return (
		<div className={styles.operation_record_tree_node_container}>
			<div className={styles.operation_record_tree_node_title}>
				{operationRecord.isFirstImported ? "首次导入执行" : "导入"}
				<Popover trigger="click" content={<FileStructPopoverContent fileStruct={importedFileStruct} />}>
					<span className={styles.key_point_text} title={importedFileStruct.getCodeFileKey()}>
						{importedFileStruct.getCodeFileName()}
					</span>
				</Popover>

				{hasImportVariableStructs || hasDefaultImportVariableStruct || hasNamespaceImportVariableStruct
					? ", improt"
					: null}
				{hasDefaultImportVariableStruct ? (
					<Popover
						trigger="click"
						content={<ImportVariablePopoverContent importVariableStruct={defaultImportVariableStruct} />}
					>
						<span className={styles.key_point_text}>{defaultImportVariableStruct.local}</span>
					</Popover>
				) : null}
				{hasImportVariableStructs && hasDefaultImportVariableStruct ? "," : null}
				{hasImportVariableStructs ? " {" : null}
				{hasImportVariableStructs
					? operationRecord.importVariableStructs.map((importVariableStruct, index) => {
							return (
								<span key={importVariableStruct.local} className={styles.normal_text}>
									{index > 0 ? "," : null}
									<Popover
										trigger="click"
										content={<ImportVariablePopoverContent importVariableStruct={importVariableStruct} />}
									>
										<span className={styles.key_point_text}>
											{importVariableStruct.isSameNameLocalAndImported ? null : `${importVariableStruct.imported}`}
											{importVariableStruct.isSameNameLocalAndImported ? null : (
												<span className={styles.normal_text}> as </span>
											)}
											{importVariableStruct.local}
										</span>
									</Popover>
								</span>
							);
					  })
					: null}
				{hasImportVariableStructs ? "}" : null}

				{hasNamespaceImportVariableStruct ? (
					<Popover
						trigger="click"
						content={<ImportVariablePopoverContent importVariableStruct={namespaceImportVariableStruct} />}
					>
						<span className={styles.key_point_text}>* as {namespaceImportVariableStruct.local}</span>
					</Popover>
				) : null}
			</div>
		</div>
	);
};

export default ImportDeclarationOperationTreeNode;
