import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { getStringLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class StringLiteralStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isStringLiteralStruct = true;
		this.value = getStringLiteralValue(ast);

		this.type = "StringLiteral";
		this.title = this.value;
	}
	destroy() {
		super.destroy();

		this.isStringLiteralStruct = this.value = null;
	}
}
