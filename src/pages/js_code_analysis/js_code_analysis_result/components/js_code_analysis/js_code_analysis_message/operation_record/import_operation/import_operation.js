import BaseOperationRecord from "../base_operation_record.js";

export default class ImportOperation extends BaseOperationRecord {
	constructor(importDeclarationStruct) {
		super();
		this.isImportOperation = true;

		console.info("importDeclarationStruct:", importDeclarationStruct);
	}

	static async createByCallExpressionStruct(importDeclarationStruct, source) {
		console.info("%cImportOperation createByImportStruct:", "font-size: 18px", importDeclarationStruct);
		const importOperation = new ImportOperation(importDeclarationStruct, source);
		// if (importDeclarationOperation.isFirstImported) {
		// 	await importDeclarationOperation.importedFileStruct.execute();
		// }
		// importDeclarationOperation.initAddImportedFileStruct();

		return importOperation;
	}
}
