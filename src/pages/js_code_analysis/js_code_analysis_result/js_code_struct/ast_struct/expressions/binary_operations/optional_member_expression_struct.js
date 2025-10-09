import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export default class OptionalMemberExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.computed = ast.computed;
		this.optional = ast.optional;

		this.type = " OptionalMemberExpression";
	}
	destroy() {
		super.destroy();

		this.computed = this.optional = null;
	}
}
