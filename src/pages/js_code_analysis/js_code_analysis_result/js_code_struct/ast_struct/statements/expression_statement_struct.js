import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class ExpressionStatementStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ExpressionStatement";

		this.isExpressionStatementStruct = true;
	}
	destroy() {
		this.isExpressionStatementStruct = null;
	}
}
