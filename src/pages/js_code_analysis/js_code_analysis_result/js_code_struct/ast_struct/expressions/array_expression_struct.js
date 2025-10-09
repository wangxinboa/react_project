import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class ArrayExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ArrayExpression";
	}
}
