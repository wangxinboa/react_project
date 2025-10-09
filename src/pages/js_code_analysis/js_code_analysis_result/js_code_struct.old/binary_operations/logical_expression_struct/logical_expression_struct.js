import getStructIndex from "../../js_code_struct_utils/get_struct_index.js";
import createCodeStructByAst from "../../js_code_struct_utils/create_code_struct_by_ast.js";
import BaseInEnvironmentStruct from "../../base_struct/base_in_environment_struct.js";

const LogicalOperatorTypes = {
	AND: "&&",
	OR: "||",
};

export default class LogicalExpressionStruct extends BaseInEnvironmentStruct {
	static type = "LogicalExpression";
	constructor(logicalExpressionAst, environmentStruct) {
		const _baseKey = `${LogicalExpressionStruct.type}_${getStructIndex()}:`;

		super(_baseKey, environmentStruct);
		this.type = LogicalExpressionStruct.type;

		this.ast = logicalExpressionAst;
		this.operator = this.ast.operator;

		this.leftStruct = this.leftStructValue = this.rightStruct = this.rightStructValue = null;

		this.initLeftStruct();
		this.initRightStruct();
	}

	destroy() {
		super.destroy();

		this.ast = this.operator = this.leftStruct = this.leftStructValue = this.rightStruct = this.rightStructValue = null;
	}

	initLeftStruct() {
		this.leftStruct = createCodeStructByAst(this.ast.left, this.environmentStruct);
		this.addChildStruct(this.leftStruct, "left");

		this.leftStructValue = this.leftStruct.getValue();
	}
	initRightStruct() {
		this.rightStruct = createCodeStructByAst(this.ast.right, this.environmentStruct);
		this.addChildStruct(this.rightStruct, "right");

		this.rightStructValue = this.rightStruct.getValue();
	}

	getValue() {
		switch (this.operator) {
			case LogicalOperatorTypes.OR:
				return this.leftStructValue || this.rightStructValue;
			case LogicalOperatorTypes.AND:
				return this.leftStructValue && this.rightStructValue;
			default:
				console.error(
					"logicalExpression struct 执行 execute, 根据 this.ast",
					this.ast,
					"环境结构 this.environmentStruct",
					this.environmentStruc,
					"获取 CodeStruct, 但是 this.operator",
					this.operator,
					"是未处理的 ast 类型, 待完善"
				);
				break;
		}
	}

	static createByLogicalExpressionAst(logicalExpressionAst, environmentStruct) {
		return new LogicalExpressionStruct(logicalExpressionAst, environmentStruct);
	}
}
