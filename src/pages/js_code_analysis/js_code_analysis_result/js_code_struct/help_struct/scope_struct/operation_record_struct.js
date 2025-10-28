import ImportDeclarationOperation from "../../../components/js_code_analysis/js_code_analysis_message/operation_record/import_declaration/import_declaration_operation.js";
import UnknowOperation from "../../../components/js_code_analysis/js_code_analysis_message/operation_record/unknow_operation/unknow_operation.js";
import BaseStruct from "../base_struct/base_struct.js";

export default class OperationRecordStruct extends BaseStruct {
	constructor(codeStructsMessage) {
		super(codeStructsMessage);

		this.operationRecords = [];

		this.executed = false;
	}

	addVariableDeclaratorOperation(variableDeclaratorStruct) {}

	async execute() {
		if (!this.executed) {
			this.executed = true;

			for (let i = 0, len = this.children.length; i < len; i++) {
				const childStruct = this.children[i];

				if (childStruct.isImportDeclarationStruct) {
					const importDeclarationOperation = ImportDeclarationOperation.createByImportDeclarationStruct(childStruct);
					await importDeclarationOperation.executeFirstImportedFileStruct();

					this.operationRecords.push(importDeclarationOperation);
				} else {
					this.operationRecords.push(new UnknowOperation(childStruct));
				}
			}
		}

		return this;
	}

	destroy() {
		super.destroy();

		for (let i = 0, len = this.operationRecords.length; i < len; i++) {
			this.operationRecords[i].destroy();
		}

		this.operationRecords = this.executed = null;
	}
}
