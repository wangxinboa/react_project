import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export const LogicalOperatorTypesEnum = {
	AND: "&&",
	OR: "||",
};

export default class LogicalExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.operator = this.ast.operator;

		this.type = "LogicalExpression";
		this.title = this.operator;
	}

	destroy() {
		super.destroy();

		this.operator = null;
	}
}
