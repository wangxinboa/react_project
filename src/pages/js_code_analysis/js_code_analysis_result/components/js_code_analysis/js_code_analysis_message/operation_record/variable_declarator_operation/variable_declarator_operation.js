import VariableStruct from "../../../../../js_code_struct/help_struct/variable_struct/variable_struct.js";
import {
	getBooleanLiteralValue,
	getIdentifierName,
	getNumericLiteralValue,
	getStringLiteralValue,
} from "../../../../../js_code_struct/js_code_struct_utils/get_ast_attribute_value.js";
import BaseOperationRecord from "../base_operation_record.js";
// import CallExpressionOperation from "../call_expression_operation/call_expression_operation.js";

export default class VariableDeclaratorOperation extends BaseOperationRecord {
	/**
	 * @param {import('../../../../../js_code_struct/ast_struct/declarations/variable_declaration_struct.js').default} variableDeclaratorStruct
	 */
	constructor(variableDeclaratorStruct) {
		super();
		this.isVariableDeclaratorOperation = true;

		/** @type {import('../../../../../js_code_struct/ast_struct/declarations/variable_declaration_struct.js').default} */
		this.variableDeclaratorStruct = variableDeclaratorStruct;

		this.kind = variableDeclaratorStruct.parentStruct.kind;
	}

	destroy() {
		this.isVariableDeclaratorOperation =
			this.variableDeclaratorStruct =
			this.kind =
			this.isIdentifierStruct =
			this.variableStruct =
			this.initTitle =
			this.initOperation =
			this.children =
				null;
	}

	addId() {
		const variableDeclaratorStructId = this.variableDeclaratorStruct.id;

		if (variableDeclaratorStructId.isIdentifierStruct) {
			// id 是 Identifier
			this.isIdentifierStruct = true;
			this.variableStruct = new VariableStruct(
				getIdentifierName(variableDeclaratorStructId),
				this.kind,
				this.variableDeclaratorStruct.environmentStruct
			);

			this.variableDeclaratorStruct.environmentStruct.addVariable(this.variableStruct);
		} else {
			console.warn("VariableDeclaratorOperation variableDeclaratorStructId 是其他类型，待完善");
		}
	}

	async addInit() {
		const variableDeclaratorStructId = this.variableDeclaratorStruct.id;
		const variableDeclaratorStructInit = this.variableDeclaratorStruct.init;

		if (variableDeclaratorStructInit) {
			if (variableDeclaratorStructInit.isStringLiteralStruct) {
				this.initTitle = `字符串 ${getStringLiteralValue(variableDeclaratorStructInit)}`;
			} else if (variableDeclaratorStructInit.isNumericLiteralStruct) {
				this.initTitle = `数字 ${getNumericLiteralValue(variableDeclaratorStructInit)}`;
			} else if (variableDeclaratorStructInit.isBooleanLiteralStruct) {
				this.initTitle = `布尔 ${getBooleanLiteralValue(variableDeclaratorStructInit)}`;
			} else if (variableDeclaratorStructInit.isNullLiteralStruct) {
				this.initTitle = `null`;
			} else {
				// console.warn(
				// 	"VariableDeclaratorOperation 实例执行 addInit 添加初始化信息时 variableDeclaratorStructInit",
				// 	variableDeclaratorStructInit,
				// 	"是其他类型，待完善"
				// );
			}

			if (variableDeclaratorStructId.isIdentifierStruct) {
				// id 是 Identifier
			} else {
				// console.warn("VariableDeclaratorOperation variableDeclaratorStructId 是其他类型，待完善");
			}
		}
	}

	static async createByVariableDeclaratorStruct(variableDeclaratorStruct) {
		const variableDeclaratorOperation = new VariableDeclaratorOperation(variableDeclaratorStruct);

		await variableDeclaratorOperation.addInit();
		variableDeclaratorOperation.addId();

		return variableDeclaratorOperation;
	}
}
