import ImportDeclarationOperation from "../../operation_record/import_declaration_operation/import_declaration_operation.js";
import BaseStruct from "../base_struct/base_struct.js";

export default class OperationRecordStruct extends BaseStruct {
	constructor(codeStructsMessage) {
		super(codeStructsMessage);

		this.operationRecords = [];
	}

	addImportDeclarationOperation(importDeclarationStruct) {
		this.operationRecords.push(ImportDeclarationOperation.createByImportDeclarationStruct(importDeclarationStruct));
	}

	destroy() {
		super.destroy();

		for (let i = 0, len = this.operationRecords.length; i < len; i++) {
			this.operationRecords[i].destroy();
		}

		this.operationRecords = null;
	}
}
