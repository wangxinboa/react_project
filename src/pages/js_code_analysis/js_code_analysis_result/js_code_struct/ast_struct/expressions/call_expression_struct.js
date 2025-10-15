import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class CallExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "CallExpression";

		this.isCallExpressionStruct = true;
	}
	destroy() {
		super.destroy();

		this.isCallExpressionStruct = null;
	}

	getAstArguments() {
		return this.ast.arguments;
	}
}
