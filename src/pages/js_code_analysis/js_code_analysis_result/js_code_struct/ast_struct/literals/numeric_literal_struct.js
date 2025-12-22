import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { getNumericLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class NumericLiteralStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isNumericLiteralStruct = true;
		this.value = getNumericLiteralValue(ast);

		this.type = "NumericLiteral";
		this.title = this.value;
	}
	destroy() {
		super.destroy();

		this.isNumericLiteralStruct = this.value = null;
	}
}
