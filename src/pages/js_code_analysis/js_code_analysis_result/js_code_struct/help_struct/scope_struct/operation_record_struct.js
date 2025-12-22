import BaseStruct from "../base_struct/base_struct.js";
import ImportDeclarationOperation from "../../../components/js_code_analysis/js_code_analysis_message/operation_record/import_declaration_operation/import_declaration_operation.js";
import UnknowOperation from "../../../components/js_code_analysis/js_code_analysis_message/operation_record/unknow_operation/unknow_operation.js";
import VariableDeclaratorOperation from "../../../components/js_code_analysis/js_code_analysis_message/operation_record/variable_declarator_operation/variable_declarator_operation.js";
import CallExpressionOperation from "../../../components/js_code_analysis/js_code_analysis_message/operation_record/call_expression_operation/call_expression_operation.js";

export default class OperationRecordStruct extends BaseStruct {
	constructor(codeStructsMessage) {
		super(codeStructsMessage);

		this.operationRecords = [];

		this.executed = false;
	}

	async execute() {
		if (!this.executed) {
			this.executed = true;

			for (let i = 0, len = this.importDeclarationStructs.length; i < len; i++) {
				const importDeclarationStruct = this.importDeclarationStructs[i];
				this.operationRecords.push(
					await ImportDeclarationOperation.createByImportDeclarationStruct(importDeclarationStruct)
				);
			}

			for (let i = 0, len = this.normalStructs.length; i < len; i++) {
				const normalStruct = this.normalStructs[i];

				if (normalStruct.isVariableDeclarationStruct) {
					for (let j = 0, len = normalStruct.children.length; j < len; j++) {
						this.operationRecords.push(
							await VariableDeclaratorOperation.createByVariableDeclaratorStruct(normalStruct.children[j])
						);
					}
				} else if (normalStruct.isExpressionStatementStruct) {
					if (normalStruct.children[0].isCallExpressionStruct) {
						// this.operationRecords.push(
						CallExpressionOperation.createByCallExpressionStruct(normalStruct.children[0]);
						// );
					} else {
						this.operationRecords.push(new UnknowOperation(normalStruct.children[0]));
					}
				} else {
					this.operationRecords.push(new UnknowOperation(normalStruct));
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
