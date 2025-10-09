import BaseInEnvironmentStruct from "../../base_struct/base_in_environment_struct.js";
import { isStringLiteralValueAst } from "../../js_code_struct_utils/ast_types.js";
import createCodeStructByAst from "../../js_code_struct_utils/create_code_struct_by_ast.js";
import { getStringLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";
import getStructIndex from "../../js_code_struct_utils/get_struct_index.js";
import AssignmentOperatorTypes from "./assignment_operator_types.js";

export default class AssignmentExpressionStruct extends BaseInEnvironmentStruct {
	static type = "AssignmentExpression";

	constructor(assignmentExpressionAst, environmentStruct) {
		const _baseKey = `${AssignmentExpressionStruct.type}_${getStructIndex()}:`;

		super(_baseKey, environmentStruct);

		this.type = AssignmentExpressionStruct.type;

		this.ast = assignmentExpressionAst;
		this.leftStruct = this.rightStructValue = null;
		this.operator = this.ast.operator;

		this.initLeftStruct();
		this.initRightStruct();
	}

	destroy() {
		super.destroy();

		this.ast = this.leftStruct = this.rightStructValue = this.operator = null;
	}

	initLeftStruct() {
		this.leftStruct = createCodeStructByAst(this.ast.left, this.environmentStruct);
		this.addChildStruct(this.leftStruct, "left");
	}
	initRightStruct() {
		if (isStringLiteralValueAst(this.ast.right)) {
			this.rightStructValue = getStringLiteralValue(this.ast.right);
		} else {
			this.rightStructValue = createCodeStructByAst(this.ast.right, this.environmentStruct).getValue();
		}
	}

	execute() {
		switch (this.operator) {
			case AssignmentOperatorTypes.ASSIGN:
				this.leftStruct.assignValue(this.rightStruct);
				break;
			default:
				console.error(
					"assignmentExpression struct 执行 execute, 根据 this.operator",
					this.operator,
					"this.leftStruct",
					this.leftStruct,
					"this.rightStruct",
					this.rightStruct,
					"实现代码操作, 但是 this.operator 是未处理的类型, 待完善"
				);
				throw new Error(
					"assignmentExpression struct 执行 execute, 根据 this.operator, this.leftStruct, this.rightStruct 实现代码操作, 但是 this.operator 是未处理的类型, 待完善"
				);
		}
	}

	static createByAssignmentExpressionAst(assignmentExpressionAst, environmentStruct) {
		return new AssignmentExpressionStruct(assignmentExpressionAst, environmentStruct);
	}
}
