import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { getBooleanLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class BooleanLiteralStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isBooleanLiteralStruct = true;
		this.value = getBooleanLiteralValue(ast);

		this.type = "BooleanLiteral";
		this.title = this.value;
	}
	destroy() {
		super.destroy();

		this.isBooleanLiteralStruct = this.value = null;
	}
}
