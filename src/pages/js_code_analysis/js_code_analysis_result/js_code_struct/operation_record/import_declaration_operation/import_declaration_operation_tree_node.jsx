import { useMemo } from "react";
import { Popover } from "antd";

import FileStructPopoverContent from "../file_struct_popover_content.jsx";
import ImportSpecifierPopoverContent from "./import_specifier_popover_content.jsx";
import { isNonEmptyArray } from "../../../../../../utils/data_type/is_type.js";

import styles from "../operation_record.module.scss";

const ImportDeclarationOperationTreeNode = (props) => {
	const { operationRecord } = props;

	const importedFileStruct = useMemo(() => {
		return operationRecord.importedFileStruct;
	}, [operationRecord.importedFileStruct]);
	/** importSpecifierStructs 是否存在 importSpecifierStruct 元素 */
	const hasImportSpecifierStruct = useMemo(() => {
		return isNonEmptyArray(operationRecord.importSpecifierStructs);
	}, [operationRecord]);
	/** importDefaultSpecifierStruct 是否存在不为 null */
	const hasImportDefaultSpecifierStruct = useMemo(() => {
		return operationRecord.importDefaultSpecifierStruct !== null;
	}, [operationRecord]);
	/** operationRecord.importDefaultSpecifierStruct */
	const importDefaultSpecifierStruct = useMemo(() => {
		return operationRecord.importDefaultSpecifierStruct;
	}, [operationRecord]);
	/** importSpecifierStructs 是否存在 importSpecifierStruct 元素 */
	const hasImportNamespaceSpecifierStruct = useMemo(() => {
		return operationRecord.importNamespaceSpecifierStruct !== null;
	}, [operationRecord]);
	/** operationRecord.importNamespaceSpecifierStruct */
	const importNamespaceSpecifierStruct = useMemo(() => {
		return operationRecord.importNamespaceSpecifierStruct;
	}, [operationRecord]);

	return (
		<div className={styles.operation_record_tree_node_container}>
			<div className={styles.operation_record_tree_node_title}>
				{operationRecord.isFirstImported ? "首次导入" : "导入"}
				<Popover content={<FileStructPopoverContent fileStruct={importedFileStruct} />}>
					<span className={styles.key_point_text} title={importedFileStruct.getCodeFileKey()}>
						{importedFileStruct.getCodeFileName()}
					</span>
				</Popover>

				{hasImportSpecifierStruct || hasImportDefaultSpecifierStruct || hasImportNamespaceSpecifierStruct
					? ", improt"
					: null}
				{hasImportDefaultSpecifierStruct ? (
					<Popover content={<ImportSpecifierPopoverContent importSpecifier={importDefaultSpecifierStruct} />}>
						<span className={styles.key_point_text}>{importDefaultSpecifierStruct.local}</span>
					</Popover>
				) : null}
				{hasImportSpecifierStruct && hasImportDefaultSpecifierStruct ? "," : null}
				{hasImportSpecifierStruct ? " {" : null}
				{hasImportSpecifierStruct
					? operationRecord.importSpecifierStructs.map((importSpecifierStruct, index) => {
							return (
								<span key={importSpecifierStruct.local} className={styles.normal_text}>
									{index > 0 ? "," : null}
									<Popover content={<ImportSpecifierPopoverContent importSpecifier={importSpecifierStruct} />}>
										<span className={styles.key_point_text}>
											{importSpecifierStruct.isSameNameLocalAndImported ? null : `${importSpecifierStruct.imported}`}
											{importSpecifierStruct.isSameNameLocalAndImported ? null : (
												<span className={styles.normal_text}> as </span>
											)}
											{importSpecifierStruct.local}
										</span>
									</Popover>
								</span>
							);
					  })
					: null}
				{hasImportSpecifierStruct ? "}" : null}

				{hasImportNamespaceSpecifierStruct ? (
					<Popover content={<ImportSpecifierPopoverContent importSpecifier={importNamespaceSpecifierStruct} />}>
						<span className={styles.key_point_text}>* as {importNamespaceSpecifierStruct.local}</span>
					</Popover>
				) : null}
			</div>
		</div>
	);
};

export default ImportDeclarationOperationTreeNode;
