import BaseOperationRecord from "../base_operation_record.js";
import ImportOperation from "../import_operation/import_operation.js";

export default class CallExpressionOperation extends BaseOperationRecord {
	constructor(callExpressionStruct) {
		super();

		this.callExpressionStruct = callExpressionStruct;
	}

	getTitle() {
		return "CallExpression 执行; 待完善";
	}

	/**
	 *
	 * @param {import('../../../../../js_code_struct/ast_struct/expressions/call_expression_struct.js').default} callExpressionStruct
	 * @returns
	 */
	static async createByCallExpressionStruct(callExpressionStruct) {
		if (callExpressionStruct.isImport()) {
			return await ImportOperation.createByCallExpressionStruct(callExpressionStruct);
		}
	}
}
