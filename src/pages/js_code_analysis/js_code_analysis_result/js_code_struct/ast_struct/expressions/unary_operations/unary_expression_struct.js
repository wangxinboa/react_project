import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export default class UnaryExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.operator = ast.operator;
		this.prefix = ast.prefix;

		this.type = "UnaryExpression";
		this.title = this.operator;
	}

	destroy() {
		super.destroy();

		this.operator = this.prefix = null;
	}
}
