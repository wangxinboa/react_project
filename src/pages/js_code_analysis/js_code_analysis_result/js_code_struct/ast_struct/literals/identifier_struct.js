import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class IdentifierStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isIdentifierStruct = true;
		this.name = getIdentifierName(ast);

		this.type = "Identifier";
		this.title = this.name;
	}
	destroy() {
		super.destroy();

		this.isIdentifierStruct = this.name = null;
	}
}
